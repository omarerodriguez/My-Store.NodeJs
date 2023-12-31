  const express = require('express');
const passport = require('passport');

  const validatorHandler = require('../middlewares/validatorHandler');
  const OrderService = require('./../services/order.service');
  const {createOrderSchema,getOrderSchema,addItemSchema} = require('./../schemas/order.schema');

  const service = new OrderService();
  const router = express.Router();

  router.get('/',async (req,res)=>{
    const orders = await service.find();
    res.json(orders);return await service.find();
  });

  router.get('/:id',
    validatorHandler(getOrderSchema,'params'),
    async (req,res,next)=>{
    try {
      const {id} = req.params;
      const orders = await service.findOne(id);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

  router.post('/',
  passport.authenticate('jwt',{session:false}),
  validatorHandler(createOrderSchema,'body'),
    async(req,res,next)=>{
    try {
      const body = {userId:req.user.sub}
      const newOrder =await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

  router.post('/add-item',
  validatorHandler(addItemSchema,'body'),
    async(req,res)=>{
    const body = req.body;
    const newItem =await service.addItem(body);
    res.status(201).json(newItem);
    }
  );

  module.exports = router;
