  const express = require('express');
  const routerApi = require('./routes/index');
  const cors = require('cors');
  const {checkApiKey} = require('./middlewares/auth.handler');

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

  require('./utils/auth');

  app.get('/',(req,res)=>{
    res.send('Home');
  });

  app.get('/nueva-ruta',checkApiKey,(req,res)=>{
    res.send('Home');
  });

  routerApi(app);

  app.use(logErrors);
  app.use(handlerSQLError);
  app.use(boomErrorHandler);
  app.use(errorHandler);



  app.listen(port,()=>{
    console.log(`Listen port:${port}`);
  });
