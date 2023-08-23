const express = require('express');
const CategoryService = require('./../services/category.services');
const ValidatorHandler = require('../middlewares/validatorHandler');
const {getCategorySchema,creatCategorySchema,updateCategorySchema}  = require('./../schemas/category.schema');
const validatorHandler = require('../middlewares/validatorHandler');

const router = express.Router();
const service = new CategoryService();

/*
router.get('/categories/:categoryId/products/:productId',(req,res)=>{
  const {categoryId, productId} = req.params;
  res.json({
    categoryId,
    productId
  });
});*/

router.get('/',(req,res)=>{
  const categories = service.find();
  res.json(categories);
});

router.get('/:id',
  validatorHandler(getCategorySchema,'params'),
  (req,res)=>{
  const {id} = req.params;
  const category = service.findOne(id);
  res.json(category);
  }
);

router.post('/',
  ValidatorHandler(creatCategorySchema,'body'),
  (req,res)=>{
  const body = req.body;
  const newCategory = service.create(body);
  res.status(201).json(newCategory);
  }
);

router.patch('/:id',
  validatorHandler(getCategorySchema,'params'),
  ValidatorHandler(updateCategorySchema,'body'),
  (req,res)=>{
  const {id} = req.params;
  const body = req.body;
  const category = service.update(id,body);
  res.json(category);
  }
);

router.delete('/:id',(req,res)=>{
  const {id} = req.params;
  const rta = service.delete(id);
  res.json(rta);
});

module.exports = router;
