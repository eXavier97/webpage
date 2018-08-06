const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Shipper = new Schema({
    companyName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Shipper', Shipper);