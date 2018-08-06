const express = require('express');
const router = express.Router();
const Employee = require('../models/employees');
const logged = require('./logController');

router.get('/', logged.isLoggedIn, function (req, res) {
    Employee.find({}, function (err, employees) {
        if (err)
            res.send(err);
        res.json(employees);
    });
});

router.get('/:id', logged.isLoggedIn, async (req, res) => {
    Employee.findById(req.params.id, function (err, employee) {
        if(err)
            res.send(err);
        res.json(employee);
    });
});

router.post('/', logged.isLoggedIn, function (req, res) {
    var employee = new Employee(req.body);
    employee.save(function (err, employee) {
        if (err)
            res.send(err);
        res.json(employee);
    });
});

router.put('/:id', logged.isLoggedIn, (req, res) => {
    Employee.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, employee) {
        if (err)
            res.send(err);
        res.json(employee);
    });
});

router.delete('/:id', logged.isLoggedIn, (req, res) => {
    Employee.remove({
        _id: req.params.id
    }, function (err, employee) {
        if (err)
            res.send(err);
        res.json({ message: 'employee Deleted' });
    });
});


module.exports = router;