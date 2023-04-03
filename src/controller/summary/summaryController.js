const expenseSummaryService = require("../../services/summary/expenseSummaryService");
const returnSummaryService = require("../../services/summary/returnSummaryService");
const purchaseSummaryService = require("../../services/summary/purchaseSummaryService");
const salesSummaryService = require("../../services/summary/saleSummaryService");

exports.expensesSummary = async (req, res) => {
    let result = await expenseSummaryService(req)
    res.status(200).json(result)
}

exports.returnSummary = async (req, res) => {
    let result = await returnSummaryService(req)
    res.status(200).json(result)
}

exports.purchaseSummary = async (req, res) => {
    let result = await purchaseSummaryService(req)
    res.status(200).json(result)
}

exports.salesSummary = async (req, res) => {
    let result = await salesSummaryService(req)
    res.status(200).json(result)
}