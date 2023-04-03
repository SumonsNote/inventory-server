const mongoose = require('mongoose');
const dataSchema = mongoose.Schema({
    userEmail: { type: String },
    customerId: { type: mongoose.Schema.Types.ObjectId },
    vatTax: { type: Number },
    discount: { type: Number },
    otherCost: { type: Number },
    shippingCost: { type: Number },
    grandTotal: { type: Number },
    note: { type: String },
    createdDate: { type: Date, default: Date.now() }
}, { versionKey: false });
const salesModel = mongoose.model('sales', dataSchema);
module.exports = salesModel