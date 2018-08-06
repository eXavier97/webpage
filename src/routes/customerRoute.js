const express = require('express');
const router = express.Router();
const Customer = require('../models/customers');
const logged = require('./logController');

router.get('/', logged.isLoggedIn, function (req, res) {
    Customer.find({}, function (err, customers) {
        if (err)
            res.send(err);
        res.json(customers);
    });
});

router.get('/:id', logged.isLoggedIn, async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    res.json(customer);
});

router.post('/', logged.isLoggedIn, function (req, res) {
    var customer = new Customer(req.body);
    customer.save(function (err, customer) {
        if (err)
            res.send(err);
        res.json(customer);
    });
});

router.put('/:id', logged.isLoggedIn, (req, res) => {
    Customer.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, customer) {
        if (err)
            res.send(err);
        res.json(customer);
    });
});

router.delete('/:id', logged.isLoggedIn, (req, res) => {
    Customer.remove({
        _id: req.params.id
    }, function (err, customer) {
        if (err)
            res.send(err);
        res.json({ message: 'Customer Deleted' });
    });
});


module.exports = router;