const joi = require('joi');

const id= joi.number().integer();
const name = joi.string().min(3).max(30);
const lastName = joi.string();
const phone = joi.string();
const userId = joi.number().integer();
const email = joi.string().email();
const password = joi.string().min(5);

const getCustomerSchema = joi.object({
  id:id.required()
});

const createCustomerSchema = joi.object({
  name:name.required(),
  lastName:lastName.required(),
  phone:phone.required(),
  user:joi.object({
    email:email.required(),
    password: password.required()
  })
});

const updateCustomerSchema = joi.object({
  name,
  lastName,
  phone,
  userId
});

module.exports = {getCustomerSchema,createCustomerSchema,updateCustomerSchema};
