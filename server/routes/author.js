// var express = require('express');
import express from 'express';
// var router = express.Router();
// import router from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('author', { 
    Name: 'Alexis Gabriel',
lastname: 'Mora Hernandez',
mail:'alexis@getMaxListeners.com',
});
});
//Rutas para prueba de exception y rejection
if(process.env.NODE_ENV === 'production'){
  router.get('/test-exception', (req, res) => {
    res.json({ message: "Esto lanzará una excepción no capturada" });
  })
  setTimeout(() => {
    throw new Error("Excepción no capturada después de 5 segundos");
  }, 5000);

}
//ruta para rejectiones
router.get('/test-rejection', (req, res) => {
  res.json({ message: "Esto lanzará una promesa rechazada no manejada" });
  Promise.reject(new Error("Rechazo no manejado después de la respuesta"));
});

//module.exports = router;
export default router;

