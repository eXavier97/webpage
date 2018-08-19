const express = require('express');
const router = express.Router();
const Order = require('../models/orders');

router.post('/', function (req, res) {
    var order = new Order(req.body);
    req.session.car = {}
    order.save(function (err, order) {
        if (err)
            res.send(err);
        res.json({redirect: '/customer#/1'});
    })

})

module.exports = router;