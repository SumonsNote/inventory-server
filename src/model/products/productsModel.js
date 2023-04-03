const mongoose = require('mongoose');
const dataSchema = mongoose.Schema({
    userEmail: { type: String },
    categoryId: { type: mongoose.Schema.Types.ObjectId },
    brandId: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String },
    unit: { type: String },
    details: { type: String },
    createdDate: { type: Date, default: Date.now() }
}, { versionKey: false });
const productsModel = mongoose.model('products', dataSchema);
module.exports = productsModel