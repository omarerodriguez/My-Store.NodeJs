const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {config} = require('./../config/config');
const nodemailer = require('nodemailer');




const UserService = require('./user.service');
const service = new UserService();

class AuthService {

  async getUser(email,password){
    const user = await service.findByEmail(email);
    if(!user){throw(boom.unauthorized());}
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){throw(boom.unauthorized());}
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;
  }

  signToken(user){
    const payload ={
      sub:user.id,
      role:user.role
    }
    const token = jwt.sign(payload,config.jwtSecret);
    return{
      user,
      token
    };
  }

  async SendRecovery(email){
    const user = await service.findByEmail(email);
      if(!user){throw boom.unauthorized();}
      const payload = {sub: user.id};
      const token = jwt.sign(payload,config.jwtSecret,{expiresIn:'15min'});
      const link = `http://myfrontend.com/recovery?token=${token}`;
      await service.update(user.id,{recoveryToken:token});
      const mail = {
        from: 'omarmr7214@gmail.com', // sender address
        to: `${user.email}`, // list of receivers
        subject: "Mail to recovery password", // Subject line
        html: `<b>Enter to this link:${link} </b>`, // html body
      }
      const rta = await this.sendMail(mail);
      return rta;
  }

    async ChangePassword(token,newPassword){
      try {
        const payload = jwt.verify(token,config.jwtSecret);
        const user = await service.findOne(payload.sub);
        if(user.recoveryToken !== token){
          throw boom.unauthorized();
        }
        const hash = await bcrypt.hash(newPassword,10);
        await service.update(user.id,{recoveryToken:null,password:hash});
        return {message: 'Password changed'}
      } catch (error) {
        throw boom.unauthorized();
      }
    }

    async sendMail(infoMail){
      const transporter = nodemailer.createTransport({
      host:config.emailHost,
      port: 465,
      secure: true,
      auth: {
        user: config.userEmail,
        pass: config.passwordEmail
    }
    });
      await transporter.sendMail(infoMail);
      return {message:'mail sent'};
    }
  }


module.exports = AuthService;
