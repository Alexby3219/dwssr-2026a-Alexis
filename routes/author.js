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

//module.exports = router;
export default router;