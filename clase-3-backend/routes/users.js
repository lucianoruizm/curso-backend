// Se llama a express y al ruteador de express
var express = require('express');
var router = express.Router();

/* GET users listing. */
// http://localhost:3000/users
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Rutas compuestas
// http://localhost:3000/users/list
router.get('/list', function(req, res, next){
  res.json({
    user1: "Sarah",
    user2: "Julian"
  })
})

// Se debe exportar
module.exports = router;