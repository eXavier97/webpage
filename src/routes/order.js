const express = require('express');
const router = express.Router();
const Order = require('../models/orders');
const factura = require('./factura');

router.post('/', function (req, res) {
    var order = new Order(req.body);
    req.session.car = {}
    order.save(function (err, order) {
        if (err)
            res.send(err);
        res.json({ redirect: '/customer#/1' });
    })

})

router.get('/', function (req, res) {
    Order.find({ requiredDate: null }, (err, orders) => {
        if (err)
            res.send(err);
        res.json(orders);
    })
});

router.get('/curr', function (req, res) {
    var year = new Date();
    year = String(year.getFullYear());
    Order.find({ requiredDate: { $regex: year } }, (err, orders) => {
        if (err)
            res.send(err);
        res.json(orders);
    })
});

router.post('/pdf', function (req, res) {
    console.log(req.body);
    factura.generar(req.body, 'factura.pdf', () => {
        console.log('Factura guardada');
    }, (err) => {
        console.error(err);
    });
    res.send('solicitud de pdf enviada');
})

router.get('/:id', function (req, res) {
    Order.findOne({ _id: req.params.id }, (err, order) => {
        if (err)
            res.send(err);
        res.json(order);
    })
});

router.put('/:id', function (req, res) {
    Order.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, order) => {
        if (err)
            res.send(err);
        res.json(order);
    })
});




module.exports = router;