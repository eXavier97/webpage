const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.json({
        id: req.user._id,
        firstName: req.user.firstName, 
        lastName: req.user.lastName,
        cart: req.session.car
    })
})

module.exports = router;