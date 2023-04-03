const expenseReportService = require("../../services/report/expenseReportSerice")
const purchaseReportService = require("../../services/report/purchaseReportService")
const returnReportService = require("../../services/report/returnReportService")
const saleReportService = require("../../services/report/saleReportService")

exports.expensesByDate = async (req, res) => {
    let result = await expenseReportService(req)
    res.status(200).json(result)
}
exports.purchaseByDate = async (req, res) => {
    let result = await purchaseReportService(req)
    res.status(200).json(result)
}
exports.returnByDate = async (req, res) => {
    let result = await returnReportService(req)
    res.status(200).json(result)
}
exports.saleByDate = async (req, res) => {
    let result = await saleReportService(req)
    res.status(200).json(result)
}