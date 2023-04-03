const dataModel = require('../../model/brands/brandsModel')
const createService = require('../../services/common/createService')
const updateService = require('../../services/common/updateService')
const listService = require('../../services/common/listService')
const dropDownService = require('../../services/common/dropDownService')
const productsModel = require('../../model/products/productsModel')
const deleteService = require('../../services/common/deleteService')
const checkAssociateService = require('../../services/common/checkAssociateService')
const { default: mongoose } = require('mongoose')
const detailsServiceById = require('../../services/common/detailsServiceById')

exports.createBrand = async (req, res) => {
    let result = await createService(req, dataModel)
    res.status(200).json(result)
}
exports.updateBrand = async (req, res) => {
    let result = await updateService(req, dataModel)
    res.status(200).json(result)
}

exports.listBrand = async (req, res) => {
    let searchRgx = { '$regex': req.params.searchKeyword, '$options': "i" }
    let searchArray = [{ name: searchRgx }]
    let result = await listService(req, dataModel, searchArray)
    res.status(200).json(result)
}

exports.dropDownBrand = async (req, res) => {
    let result = await dropDownService(req, dataModel, { _id: 1, name: 1 })
    res.status(200).json(result)
}

exports.deleteBrand = async (req, res) => {
    let deleteId = req.params.id;
    const objectId = mongoose.Types.ObjectId;
    let checkAssociate = await checkAssociateService({ brandId: objectId(deleteId) }, productsModel);
    if (checkAssociate) {
        res.status(200).json({ status: 'associate', data: 'associate with products' })
    }
    else {
        let result = await deleteService(req, dataModel);
        res.status(200).json(result)
    }
}

exports.brandDetailsById = async(req, res) => {
    let result = await detailsServiceById(req, dataModel)
    res.status(200).json(result)
}