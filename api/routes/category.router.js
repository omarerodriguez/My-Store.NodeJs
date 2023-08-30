const express = require('express');
const passport = require('passport');

const {getCategorySchema,creatCategorySchema,updateCategorySchema}  = require('./../schemas/category.schema');
const CategoryService = require('./../services/category.services');
const ValidatorHandler = require('../middlewares/validatorHandler');
const validatorHandler = require('../middlewares/validatorHandler');
const {checkRoles} = require('../middlewares/auth.handler');



const router = express.Router();
const service = new CategoryService();


router.get('/',async(req,res)=>{
  const categories = await service.find();
  res.json(categories);
});

router.get('/:id',
  validatorHandler(getCategorySchema,'params'),
  async(req,res)=>{
  const {id} = req.params;
  const category = await service.findOne(id);
  res.json(category);
  }
);

router.post('/',
  passport.authenticate('jwt',{session:false}),
  checkRoles('admin'),
  ValidatorHandler(creatCategorySchema,'body'),
  async(req,res)=>{
  const body = req.body;
  const newCategory = await service.create(body);
  res.status(201).json(newCategory);
  }
);

router.patch('/:id',
  passport.authenticate('jwt',{session:false}),
  checkRoles('admin'),
  validatorHandler(getCategorySchema,'params'),
  ValidatorHandler(updateCategorySchema,'body'),
  async(req,res)=>{
  const {id} = req.params;
  const body = req.body;
  const category = await service.update(id,body);
  res.json(category);
  }
);

router.delete('/:id',
  passport.authenticate('jwt',{session:false}),
  checkRoles('admin'),
  async (req,res)=>{
  const {id} = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = router;
