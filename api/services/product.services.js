const {models} = require('./../libs/sequelize');
const boom = require('@hapi/boom');

class ProductService {
 constructor(){}

 async find(){
  return await models.Product.findAll();
 }

async findOne(id){
  const product = await models.Product.findByPk(id,{
    include:['category']
  });
  if(!product){throw boom.notFound(`Product Id:${id} not found`);}
  return product;
 }
 async create(data){
  const newProduct = await models.Product.create(data);
  return newProduct;
  }

 async update(id,changes){
  const product = await this.findOne(id);
  const res = await product.update(changes);
  return res;
  }

 async delete(id){
  const product = this.findOne(id);
  await product.destroy();
  return {res:`Deleted product with Id:${id}`};
  }
}

module.exports = ProductService;
