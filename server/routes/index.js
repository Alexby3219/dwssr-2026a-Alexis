// var express = require('express');
import express from 'express';
// var router = express.Router();
//import router from 'express';
const router = express.Router();
import logger from '../lib/winston.js';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Proyecto Asombroso precioso  ❤️❤️❤️❤️❤️❤️' });
});

router.get('/testt-logss',(req,res)=>{
  logger.info('Esto es un mensaje de información');
  logger.warn('Esto es un mensaje de advertencia');
  logger.error('Esto es un mensaje de error');
  logger.debug("prueba tipo debug");
  logger.http("prueba tipo http");

  //estructurando respuesta (Solo un res.json, sin el res.send anterior)
  res.json({
    message: "se crearon logs de prueba", 
    archivos: [
      "logs/app-YYYY-MM-DD.log",
      "logs/app-readble.log",
      "logs/error.log"
    ]
  });
});
// module.exports = router;
export default router;