const express = require('express');
const router = express.Router();
const Supplier = require('../models/suppliers');
const logged = require('./logController');

router.get('/', logged.isLoggedIn, function (req, res) {
    Supplier.find({}, function (err, suppliers) {
        if (err)
            res.send(err);
        res.json(suppliers);
    });
});

router.get('/:id', logged.isLoggedIn, async (req, res) => {
    const supplier = await Supplier.findById(req.params.id);
    res.json(supplier);
});

router.post('/', logged.isLoggedIn, function (req, res) {
    var supplier = new Supplier(req.body);
    supplier.save(function (err, supplier) {
        if (err)
            res.send(err);
        res.json(supplier);
    });
});

router.put('/:id', logged.isLoggedIn, (req, res) => {
    Supplier.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, supplier) {
        if (err)
            res.send(err);
        res.json(supplier);
    });
});

router.delete('/:id', logged.isLoggedIn, (req, res) => {
    Supplier.remove({
        _id: req.params.id
    }, function (err, supplier) {
        if (err)
            res.send(err);
        res.json({ message: 'supplier Deleted' });
    });
});


module.exports = router;