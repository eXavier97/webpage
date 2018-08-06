const express = require('express');
const router = express.Router();
const Shipper = require('../models/shippers');
const logged = require('./logController');

router.get('/', logged.isLoggedIn, function (req, res) {
    Shipper.find({}, function (err, shippers) {
        if (err)
            res.send(err);
        res.json(shippers);
    });
});

router.get('/:id', logged.isLoggedIn, async (req, res) => {
    const shipper = await Shipper.findById(req.params.id);
    res.json(shipper);
});

router.post('/', logged.isLoggedIn, function (req, res) {
    var shipper = new Shipper(req.body);
    shipper.save(function (err, shipper) {
        if (err)
            res.send(err);
        res.json(shipper);
    });
});

router.put('/:id', logged.isLoggedIn, (req, res) => {
    Shipper.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, shipper) {
        if (err)
            res.send(err);
        res.json(shipper);
    });
});

router.delete('/:id', logged.isLoggedIn, (req, res) => {
    Shipper.remove({
        _id: req.params.id
    }, function (err, shipper) {
        if (err)
            res.send(err);
        res.json({ message: 'shipper Deleted' });
    });
});


module.exports = router;