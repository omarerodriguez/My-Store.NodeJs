const {faker} = require('@faker-js/faker');

class UserService{
  constructor(){
    this.users=[];
    this.userGenerate();
  }

  userGenerate(){
    const limit = 10;
    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: faker.string.uuid(),
        name: faker.person.firstName(),
        lastName: faker.person.lastName(),
        area: faker.person.jobArea()
      });
  }
}

create(data){
  const newUser ={
    id:faker.string.uuid(),
    ...data
  }
  this.users.push(newUser);
  return newUser;
}

find(){
  return this.users;
}

findOne(id){
  return this.users.find(item=>item.id===id);
}

update(id,changes){
    const i =  this.users.findIndex(item=> item.id===id);
    if(i ===-1){
      throw new Error('User not found');
    }
    const user = this.users[i];
    this.users[i]={
      ...user,
      ...changes
    };
    return this.users[i];
}

delete(id){
    const i =  this.users.findIndex(item=> item.id===id);
    if(i ===-1){
      throw new Error('User not found');
    }
    this.users.splice(i,1);
    return {id};
  }
}

module.exports = UserService;
