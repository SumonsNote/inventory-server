const dataModel = require('../../model/customers/customersModel')
const createService = require('../../services/common/createService')
const updateService = require('../../services/common/updateService')
const listService = require('../../services/common/listService')
const dropDownService = require('../../services/common/dropDownService')
const productsModel = require('../../model/products/productsModel')
const checkAssociateService = require('../../services/common/checkAssociateService')
const deleteService = require('../../services/common/deleteService')
const { default: mongoose } = require('mongoose')
const detailsServiceById = require('../../services/common/detailsServiceById')

exports.createCustomers=async (req, res) => {
    let result= await createService(req,dataModel)
    res.status(200).json(result)
}

exports.updateCustomers=async (req, res) => {
    let result=await updateService(req,dataModel)
    res.status(200).json(result)
}

exports.listCustomers=async (req, res) => {
    let searchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
    let searchArray=[{customerName: searchRgx},{phone: searchRgx},{email: searchRgx},{address: searchRgx}]
    let result= await listService(req,dataModel,searchArray)
    res.status(200).json(result)
}

exports.dropDownCustomers=async (req, res) => {
    let result= await dropDownService(req,dataModel,{_id:1,customerName:1})
    res.status(200).json(result)
}

exports.deleteCustomer = async (req, res) => {
    let deleteId = req.params.id;
    const objectId = mongoose.Types.ObjectId;
    let checkAssociate = await checkAssociateService({ customerId: objectId(deleteId) }, productsModel);
    if (checkAssociate) {
        res.status(200).json({ status: 'associate', data: 'associate with products' })
    }
    else {
        let result = await deleteService(req, dataModel);
        res.status(200).json(result)
    }
}

exports.customerDetailsById = async(req, res) => {
    let result = await detailsServiceById(req, dataModel)
    res.status(200).json(result)
}