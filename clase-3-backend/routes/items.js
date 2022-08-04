var express = require('express');
var router = express.Router();
const {item, itemsList, consultaAxios} = require('../controllers/controller')



router.get('/', item);   // http://localhost:3000/items

router.get('/list', itemsList);   // http://localhost:3000/items/list

router.get('/pokemon/:name', consultaAxios)   // http://localhost:3000/items/pokemon


module.exports = router;