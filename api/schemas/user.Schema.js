const Joi= require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(20);
const lastName = Joi.string().min(3).max(25);
const area = Joi.string().min(3).max(15);

const getUserSchema = Joi.object({
  id:id.required()
});

const creatUserSchema =Joi.object({
  name:name.required(),
  lastName:lastName.required(),
  area:area.required()
});

const updateUserSchema = Joi.object({
  name:name.required(),
  lastName:lastName.required(),
  area:area.required()
});

module.exports = {getUserSchema,creatUserSchema,updateUserSchema}
