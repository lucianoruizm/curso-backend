var express = require('express');
var router = express.Router();
const {listarProductos, agregarProducto, productoUnitario, editarProducto, borrarProducto, borrarTodo} = require('../controllers/controllerProduct')

/* GET users listing. */
/*
CRUD
-create
-read
-update
-delete
----------------
metodos http
POST - create
GET - read
PUT - update
DELETE - delete
*/
router.get('/list', listarProductos);
router.get('/list/:id', productoUnitario);
router.put('/edit/:id', editarProducto);
router.post('/add/product', agregarProducto)
router.delete('/delete/product/:id', borrarProducto)
router.delete('/delete/products/all', borrarTodo)


module.exports = router;