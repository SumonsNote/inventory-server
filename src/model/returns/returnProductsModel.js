const mongoose = require('mongoose');
const dataSchema = mongoose.Schema({
    userEmail: { type: String },
    returnId: { type: mongoose.Schema.Types.ObjectId },
    productId: { type: mongoose.Schema.Types.ObjectId },
    qty: { type: Number },
    unitCost: { type: Number },
    total: { type: Number },
    createdDate: { type: Date, default: Date.now() }
}, { versionKey: false });
const returnProductsModel = mongoose.model('returnproducts', dataSchema);
module.exports = returnProductsModel