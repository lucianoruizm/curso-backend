var express = require('express');
var router = express.Router();
const {item,itemsList,consultaAxios} = require('../controllers/controller')

/* GET users listing. */
router.get('/',item);
router.post('/list',itemsList);
router.get('/pokemon/:name',consultaAxios)
  


module.exports = router;