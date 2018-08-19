const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    customerId: String,
    firstName: String,
    lastName: String,
    shipAddress: String,
    shipCity: String,
    shipCountry: String,
    shipPostalCode: String,
    requiredDate: String,
    details: Schema.Types.Mixed
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', Order);