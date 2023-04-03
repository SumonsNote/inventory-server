const dataModel = require('../../model/products/productsModel')
const createService = require('../../services/common/createService')
const updateService = require('../../services/common/updateService')
const listTwoJoinService = require('../../services/common/listTwoJoinService')
const returnProductsModel = require('../../model/returns/returnProductsModel')
const purchaseProductsModel = require('../../model/purchases/purchaseProductsModel')
const saleProductsModel = require('../../model/sales/saleProductsModel')
const deleteService = require('../../services/common/deleteService')
const { default: mongoose } = require('mongoose')
const detailsServiceById = require('../../services/common/detailsServiceById')

exports.createProducts = async (req, res) => {
    let result = await createService(req, dataModel);
    res.status(200).json(result)
}

exports.updateProducts = async (req, res) => {
    let result = await updateService(req, dataModel)
    res.status(200).json(result)
}

exports.listProducts = async (req, res) => {
    let searchRgx = { "$regex": req.params.searchKeyword, "$options": "i" }
    let joinStage1 = { $lookup: { from: "brands", localField: "brandId", foreignField: "_id", as: "brands" } };
    let joinStage2 = { $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "categories" } };
    let searchArray = [{ name: searchRgx }, { unit: searchRgx }, { details: searchRgx }, { 'brands.name': searchRgx }, { 'categories.name': searchRgx }]
    let result = await listTwoJoinService(req, dataModel, searchArray, joinStage1, joinStage2);
    res.status(200).json(result)
}

exports.deleteProduct = async (req, res) => {

    let deleteId = req.params.id;
    const objectId = mongoose.Types.ObjectId;

    let checkReturnAssociate = await checkAssociateService({ productId: objectId(deleteId) }, returnProductsModel);
    let checkSaleAssociate = await checkAssociateService({ productId: objectId(deleteId) }, purchaseProductsModel);
    let checkPurchaseAssociate = await checkAssociateService({ productId: objectId(deleteId) }, saleProductsModel);

    if (checkReturnAssociate) {
        res.status(200).json({ status: 'associate', data: 'associate with products' })
    }
    else if (checkSaleAssociate) {
        res.status(200).json({ status: 'associate', data: 'associate with products' })
    }
    else if (checkPurchaseAssociate) {
        res.status(200).json({ status: 'associate', data: 'associate with products' })
    }
    else {
        let result = await deleteService(req, dataModel);
        res.status(200).json(result)
    }
}

exports.productsDetailsById = async(req, res) => {
    let result = await detailsServiceById(req, dataModel)
    res.status(200).json(result)
}