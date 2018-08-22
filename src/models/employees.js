const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Employee = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    title: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    region: {
        type: String,
    },
    postalCode: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    birthdate: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', Employee);