  const express = require('express');
  const routerApi = require('./routes/index');
  const cors = require('cors');

  const {logErrors,errorHandler,boomErrorHandler, handlerSQLError} = require('./middlewares/error.handler');

  const app = express();
  const port = process.env.port || 3000;

  app.use(express.json());

  const whileList= ['http://localhost:8080'];
  const options ={
    origin:(origin,callback)=>{
      if(whileList.includes(origin) || !origin){
        callback(null,true);
      }else{
        callback(new Error('No Permitido'));
      }
    }
  }
  app.use(cors(options));

  app.get('/api',(req,res)=>{
    res.send('Home');
  });

  routerApi(app);

  app.use(logErrors);
  app.use(handlerSQLError);
  app.use(boomErrorHandler);
  app.use(errorHandler);



  app.listen(port,()=>{
    console.log(`Mi port ${port}`);
  });
