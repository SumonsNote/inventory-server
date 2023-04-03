const parentModel = require('../../model/purchases/purchasesModel')
const childsModel = require('../../model/purchases/purchaseProductsModel')
const createparentchildsService = require('../../services/common/createParentChildService')
const listOneJoinService = require('../../services/common/listOneJoinService')
const deleteParentChildsService = require('../../services/common/deleteParentChildsService')

exports.createPurchases = async (req, res) => {
    let result = await createparentchildsService(req, parentModel, childsModel, 'purchaseId')
    res.status(200).json(result)
}

exports.listPurchases = async (req, res) => {
    let searchRgx = { "$regex": req.params.searchKeyword, "$options": "i" }
    let joinStage = { $lookup: { from: "suppliers", localField: "supplierId", foreignField: "_id", as: "suppliers" } };
    let searchArray = [{ note: searchRgx }, { 'suppliers.name': searchRgx }, { 'suppliers.address': searchRgx }, { 'suppliers.phone': searchRgx }, { 'suppliers.email': searchRgx }]
    let result = await listOneJoinService(req, parentModel, searchArray, joinStage);
    res.status(200).json(result)
}

exports.deletePurchases=async (req, res) => {
    let result=await  deleteParentChildsService(req,parentModel,childsModel,'purchaseId')
    res.status(200).json(result)
}