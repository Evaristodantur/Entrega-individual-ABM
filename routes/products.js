var express = require('express');
var router = express.Router();

let productController = require("../Controllers/productController")


router.get('/registerProduct',productController.create);

router.post('/registerProduct',productController.store);

router.get('/modificarProduct/:id',productController.modificar);

router.post('/modificarProduct/:id',productController.modificarProduct);

router.get('/eliminarProduct/:id',productController.delete);

router.get('/listaCompleta',productController.listaCompleta);



module.exports = router;
