const mongoose = require('mongoose');
const dataSchema = mongoose.Schema({
    userEmail: { type: String },
    name: { type: String, unique: true },
    createdDate: { type: Date, default: Date.now() }
}, { versionKey: false });
const brandsModel = mongoose.model('brands', dataSchema);
module.exports = brandsModel