const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const {models} = require('../libs/sequelize');

class customerService{
  constructor(){}

  async find(){
    const rta = await models.customer.findAll({
      include:['user']
    });
    return rta;
  }

  async findOne(id){
    const customer = await models.customer.findByPk(id);
    if(!customer){throw boom.notFound('customer not found');}
    return customer;
  }

  async create(data){
    const hash= await bcrypt.hash(data.user.password,10);
    const newData = {
      ...data,
      user:{
        ...data.user,
        password:hash
      }
    }
    const newcustomer = await models.customer.create(newData,{
    include:['user']
    });
    delete newcustomer.user.dataValues.password;
    return newcustomer;
  }

  async update(id,changes){
    const customer = await this.findOne(id);
    const rta = await customer.update(changes);
    return rta;
  }

  async delete(id){
    const customer = await this.findOne(id);
    await customer.destroy();
    return {rta:true};
  }
}

module.exports = customerService;
