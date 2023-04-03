const dataModel = require('../../model/suppliers/suppliersModel')
const createService = require('../../services/common/createService')
const updateService = require('../../services/common/updateService')
const listService = require('../../services/common/listService')
const dropDownService = require('../../services/common/dropDownService')
const checkAssociateService = require('../../services/common/checkAssociateService')
const purchasesModel = require('../../model/purchases/purchasesModel')
const deleteService = require('../../services/common/deleteService')
const { default: mongoose } = require('mongoose')
const detailsServiceById = require('../../services/common/detailsServiceById')

exports.createSuppliers = async (req, res) => {
    let result = await createService(req, dataModel)
    res.status(200).json(result)
}

exports.updateSuppliers = async (req, res) => {
    let result = await updateService(req, dataModel)
    res.status(200).json(result)
}

exports.listSuppliers = async (req, res) => {
    let searchRgx = { "$regex": req.params.searchKeyword, "$options": "i" }
    let searchArray = [{ name: searchRgx }, { phone: searchRgx }, { email: searchRgx }, { address: searchRgx }]
    let result = await listService(req, dataModel, searchArray)
    res.status(200).json(result)
}

exports.dropDownSuppliers = async (req, res) => {
    let result = await dropDownService(req, dataModel, { _id: 1, name: 1 })
    res.status(200).json(result)
}

exports.deleteSupplier = async (req, res) => {
    let deleteId = req.params.id;
    const objectId = mongoose.Types.ObjectId;
    let checkAssociate = await checkAssociateService({ supplierId: objectId(deleteId) }, purchasesModel);
    if (checkAssociate) {
        res.status(200).json({ status: 'associate', data: 'associate with products' })
    }
    else {
        let result = await deleteService(req, dataModel);
        res.status(200).json(result)
    }
}

exports.supplierDetailsById = async(req, res) => {
    let result = await detailsServiceById(req, dataModel)
    res.status(200).json(result)
}