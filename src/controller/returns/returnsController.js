const parentModel = require('../../model/returns/returnsModel')
const childsModel = require('../../model/returns/returnProductsModel')
const createParentChildsService = require('../../services/common/createParentChildService')
const listOneJoinService = require('../../services/common/listOneJoinService')
const deleteParentChildsService = require('../../services/common/deleteParentChildsService')

exports.createReturns = async (req, res) => {
    let result = await createParentChildsService(req, parentModel, childsModel, 'returnId');
    res.status(200).json(result)
}

exports.listReturns = async (req, res) => {
    let searchRgx = { "$regex": req.params.searchKeyword, "$options": "i" }
    let joinStage = { $lookup: { from: "customers", localField: "customerId", foreignField: "_id", as: "customers" } };
    let searchArray = [{ Note: searchRgx }, { 'customers.customerName': searchRgx }, { 'customers.address': searchRgx }, { 'customers.phone': searchRgx }, { 'customers.email': searchRgx }]
    let result = await listOneJoinService(req, parentModel, searchArray, joinStage);
    res.status(200).json(result)
}

exports.deleteReturns=async (req, res) => {
    let result=await  deleteParentChildsService(req,parentModel,childsModel,'returnId')
    res.status(200).json(result)
}