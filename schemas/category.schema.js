const Joi= require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(20);

const getCategorySchema = Joi.object({
  id:id.required()
});

const creatCategorySchema =Joi.object({
  name:name.required()
});

const updateCategorySchema = Joi.object({
  name: name.required()
});

module.exports ={getCategorySchema,creatCategorySchema,updateCategorySchema}
