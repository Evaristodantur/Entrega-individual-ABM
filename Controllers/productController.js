const fs = require('fs');
const path = require("path")

let productosJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json'), 'utf-8'));

let productController = {
    create : (req, res, next) => {
        res.render("registrar-producto")
    },
    store : (req, res, next) => {
        let idMax = 0;

        for(let i = 0 ; i < productosJson.length ; i++){
            if(productosJson[i].id > idMax){
                idMax = productosJson [i].id
            }
        }

        idMax = idMax + 1

        let productoNuevo = {
            id : idMax,
            nombre : req.body.nombre,
            descripcion : req.body.descripcion,
            stock : req.body.stock,
            marca : req.body.marca,
            precio : req.body.precio
        }
        productosJson.push(productoNuevo);

        fs.writeFileSync(__dirname + "/../database/productos.json", JSON.stringify(productosJson))

        res.send("Producto creado con exito")
    },
    modificar : (req, res, next) =>{
        let idUrl = req.params.id;
        let buscarProducto = productosJson.find(producto => producto.id == idUrl);
        buscarProducto ? (res.render("modificar-producto",{producto : buscarProducto})) : res.send("El producto que quieres modificar no existe");
        
    },
    modificarProduct : (req, res, next) =>{
        let idUrl = req.params.id;

        let buscarProducto = productosJson.map(function(producto){
        if(producto.id == idUrl){
            producto = {
            id : idUrl,
            nombre : req.body.nombre,
            descripcion : req.body.descripcion,
            stock : req.body.stock,
            marca : req.body.marca,
            precio : req.body.precio
            }
        }
        return producto;
        });
        fs.writeFileSync(__dirname + "/../database/productos.json", JSON.stringify(buscarProducto));
        res.render("modificar-producto", {producto : req.body})
    },
    delete : (req, res, next) =>{
        let idUrl = req.params.id;
        let buscarProducto = productosJson.find(producto => producto.id == idUrl);
        if (!buscarProducto){
            return res.send("El producto que estas buscando no existe");
        }
        let eliminarProducto = productosJson.filter(function(producto){
            return producto.id != idUrl;
        });
        fs.writeFileSync(__dirname + "/../database/productos.json", JSON.stringify(eliminarProducto));
        res.send("El producto fue eliminado con exito!")
    },
    listaCompleta : (req, res, next) =>{
        res.render("lista-completa", {productos : productosJson})
    }
}

module.exports = productController;