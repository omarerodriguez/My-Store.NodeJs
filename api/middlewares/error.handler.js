const boom = require('@hapi/boom');
const {ValidationError} = require('sequelize');

function logErrors(err,req,res,next){
  console.log('LogErrors');
  console.error(err);
  next(err);
}

function errorHandler(err,req,res,next){
  console.log('ErrorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
  //next(err);
}

function boomErrorHandler(err,req,res,next){
  if(err.isBoom){
    const {output} = err;
    res.status(output.statusCode).json(output.payload);
  }else{  next(err);}
}

function handlerSQLError (err,req,res,next){
  if(err instanceof ValidationError){
    res.status(409).json({
      statusCode:409,
      message: err.name,
      errors:err.errors
    });
  }
  next(err);
}
module.exports = {logErrors,errorHandler,boomErrorHandler,handlerSQLError}
