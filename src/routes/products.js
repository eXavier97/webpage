const express = require('express');
const router = express.Router();
const producto = require('../models/products');
const Car = require('../models/shoppingCart');
const logged = require('./logController');
var carrito = {};
//Carrito
router.get('/AgregarAlCarrito/:id', function (req, res, next) {
    var productId = req.params.id;
    var car = new Car(req.session.car ? req.session.car : {});
    producto.findById(productId, function (err, producto) {
        if (err) { res.json(err) }
        car.agregar(producto, producto._id);
        req.session.car = car;
        res.send("Producto agregado al carrito exitosamente");
    })
});

router.get('/shoppingCar', function (req, res, next) {
    if (!req.session.car) {
        res.json({ productos: null });
    }
    var car = new Car(req.session.car);
    res.json({ productos: car.arregloProductos(), CantidadTotal: car.CantidadTotal, Total: car.TotalAPagar });

});

router.get('/eliminarUno/:id', function (req, res, next) {
    var productId = req.params.id;
    var car = new Car(req.session.car ? req.session.car : {});
    car.eliminarUno(productId);
    req.session.car = car;
    res.send('Uno eliminado');
});

//eliminar productos del carrito
router.get('/eliminar/:id', function (req, res, next) {
    var productId = req.params.id;
    var car = new Car(req.session.car ? req.session.car : {});
    car.eliminarProducto(productId);
    req.session.car = car;
    res.send('Producto Eliminado');
});


//Paginacion
router.get('/:page', (req, res, next) => {
    let perPage = 3;
    let page = req.params.page || 1;
    producto
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, products) => {
            producto.count((err, count) => {
                if (err) { res.json(err); }
                let redondeo = Math.ceil(count / perPage)
                res.json({ data: products, current: page, pages: redondeo })
            })
        })
});



module.exports = router;
