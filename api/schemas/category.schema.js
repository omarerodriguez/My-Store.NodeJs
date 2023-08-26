const Joi= require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(20);
const image = Joi.string();

const getCategorySchema = Joi.object({
  id:id.required()
});

const creatCategorySchema =Joi.object({
  name:name.required(),
  image:image.required()
});

const updateCategorySchema = Joi.object({
  name: name,
  image:image
});

module.exports ={getCategorySchema,creatCategorySchema,updateCategorySchema}
