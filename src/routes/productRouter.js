const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const logged = require('./logController');

router.get('/', logged.isLoggedIn, function (req, res) {
    Product.find({}, function (err, products) {
        if (err)
            res.send(err);
        res.json(products);
    });
});

router.get('/:id', logged.isLoggedIn, async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
});

router.post('/', logged.isLoggedIn, function (req, res) {
    var product = new Product(req.body);
    product.save(function (err, product) {
        if (err)
            res.send(err);
        res.json(product);
    });
});

router.put('/:id', logged.isLoggedIn, (req, res) => {
    Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, product) {
        if (err)
            res.send(err);
        res.json(product);
    });
});

router.delete('/:id', logged.isLoggedIn, (req, res) => {
    Product.remove({
        _id: req.params.id
    }, function (err, product) {
        if (err)
            res.send(err);
        res.json({ message: 'Product Deleted' });
    });
});


module.exports = router;