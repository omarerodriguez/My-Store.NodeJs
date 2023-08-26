const express = require('express');
const UserService = require('../services/user.service');
const validatorHandler = require('../middlewares/validatorHandler');
//const handlerSQLError = require('./../middlewares/error.handler/')
const {getUserSchema,creatUserSchema,updateUserSchema} = require('./../schemas/user.Schema');

const router = express.Router();
const service = new UserService();

router.get('/',async (req,res,next)=>{
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getUserSchema,'params'),
  async (req,res,next)=>{
    try {
      const {id} = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(creatUserSchema,'body'),
  async (req,res,next)=>{
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);
///Patch
router.patch('/:id',
  validatorHandler(getUserSchema,'params'),
  validatorHandler(updateUserSchema,'body'),
  async (req,res,next)=>{
    try {
      const {id} = req.params;
  const body = req.body;
  const user = await service.update(id,body);
  res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

///Delete
router.delete('/:id',async (req,res,next)=>{
  try {
    const {id} = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
