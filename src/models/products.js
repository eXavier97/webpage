const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const Product = new Schema({
    name: {
        type: String,
        required: true
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    category: {
        type: String,
        required: true
    },
    quantityPerUnit: {
        type: Number,
        min: 0,
        required: true
    },
    unitPrice: {
        type: Currency,
        min: 0,
        required: true
    },
    unitsInStock: {
        type: Number,
        min: 0,
        required: true,
    },
    unitsOnOrder: {
        type: Number,
        default: 0
    },
    reorderLevel: Number,
    discontinued: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', Product);