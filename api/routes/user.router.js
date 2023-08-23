const express = require('express');
const UserService = require('./../services/userservice');
const validatorHandler = require('../middlewares/validatorHandler');
const {getUserSchema,creatUserSchema,updateUserSchema} = require('./../schemas/user.Schema');

const router = express.Router();
const service = new UserService();

router.get('/',(req,res)=>{
  const users = service.find();
  res.json(users);
});

router.get('/:id',
  validatorHandler(getUserSchema,'params'),
  (req,res)=>{
  const {id} = req.params;
  const user = service.findOne(id);
  res.json(user);
  }
);

router.post('/',
  validatorHandler(creatUserSchema,'body'),
  (req,res)=>{
  const body = req.body;
  const newUser = service.create(body);
  res.status(201).json(newUser);
  }
);
///Patch
router.patch('/:id',
  validatorHandler(getUserSchema,'params'),
  validatorHandler(updateUserSchema,'body'),
  (req,res)=>{
  const {id} = req.params;
  const body = req.body;
  const user = service.update(id,body);
  res.json(user);
  }
);

///Delete
router.delete('/:id',(req,res)=>{
  const {id} = req.params;
  const rta = service.delete(id);
  res.json(rta);
});

module.exports = router;
