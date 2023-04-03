const dataModel = require('../../model/expenses/expenseModel')
const createService = require('../../services/common/createService')
const updateService = require('../../services/common/updateService')
const listOneJoinService = require('../../services/common/listOneJoinService')
const deleteService = require('../../services/common/deleteService')
const detailsServiceById = require('../../services/common/detailsServiceById')

exports.createExpenses = async (req, res) => {
    let result = await createService(req, dataModel);
    res.status(200).json(result)
}

exports.updateExpenses = async (req, res) => {
    let result = await updateService(req, dataModel)
    res.status(200).json(result)
}

exports.listExpenses = async (req, res) => {
    let searchRgx = { "$regex": req.params.searchKeyword, "$options": "i" }
    let searchArray = [{ note: searchRgx }, { 'type.name': searchRgx }]
    let joinStage = { $lookup: { from: "expensetypes", localField: "typeId", foreignField: "_id", as: "type" } }
    let result = await listOneJoinService(req, dataModel, searchArray, joinStage);
    res.status(200).json(result)
}

exports.deleteExpense = async (req, res) => {
    let result = await deleteService(req, dataModel);
    res.status(200).json(result)
}

exports.expenseDetailsById = async(req, res) => {
    let result = await detailsServiceById(req, dataModel)
    res.status(200).json(result)
}