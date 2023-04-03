const express = require('express');
const authVerifyMiddleware = require('../middleware/authVerifyMiddleware');
const usersController = require('../controller/users/usersController')
const brandsController = require('../controller/brands/brandsController')
const categoriesController = require('../controller/categories/categoriesController')
const customersController = require('../controller/customers/customersController')
const suppliersController = require('../controller/suppliers/suppliersController')
const expenseTypesController = require('../controller/expense/expenseTypesController')
const expenseController = require('../controller/expense/expenseController')
const productsController = require('../controller/products/productsController')
const purchasesController = require('../controller/purchases/purchasesController')
const salesController = require('../controller/sales/salesController')
const returnsController = require('../controller/returns/returnsController');
const reportController = require('../controller/report/reportController')
const summaryController = require('../controller/summary/summaryController')

const router = express.Router();

// user profile
router.post('/registration', usersController.registration)
router.post('/login', usersController.login)
router.post('/profileUpdate',authVerifyMiddleware, usersController.profileUpdate)
router.get('/profileDetails',authVerifyMiddleware, usersController.profileDetails)
router.get('/recoverVerifyEmail/:email', usersController.recoverVerifyEmail)
router.get('/recoverVerifyOtp/:email/:otp', usersController.recoverVerifyOtp)
router.post('/recoverResetPassword', usersController.recoverResetPassword)

// brands
router.post('/createBrand', authVerifyMiddleware, brandsController.createBrand)
router.post('/updateBrand/:id', authVerifyMiddleware, brandsController.updateBrand)
router.get('/listBrand/:pageNo/:perPage/:searchKeyword', authVerifyMiddleware, brandsController.listBrand)
router.get('/dropDownBrand', authVerifyMiddleware, brandsController.dropDownBrand)
router.get('/deleteBrand/:id', authVerifyMiddleware, brandsController.deleteBrand)
router.get('/brandDetailsById/:id', authVerifyMiddleware, brandsController.brandDetailsById)

// categories
router.post('/createCategories', authVerifyMiddleware, categoriesController.createCategories)
router.post('/updateCategories/:id', authVerifyMiddleware, categoriesController.updateCategories)
router.get('/listCategories/:pageNo/:perPage/:searchKeyword', authVerifyMiddleware, categoriesController.listCategories)
router.get('/dropDownCategories', authVerifyMiddleware, categoriesController.dropDownCategories)
router.get('/deleteCategory/:id', authVerifyMiddleware, categoriesController.deleteCategory)
router.get('/categoryDetailsById/:id', authVerifyMiddleware, categoriesController.categoryDetailsById)

// customers
router.post('/createCustomers', authVerifyMiddleware, customersController.createCustomers)
router.post('/updateCustomers/:id', authVerifyMiddleware, customersController.updateCustomers)
router.get('/listCustomers/:pageNo/:perPage/:searchKeyword', authVerifyMiddleware, customersController.listCustomers)
router.get('/dropDownCustomers', authVerifyMiddleware, customersController.dropDownCustomers)
router.get('/deleteCustomer/:id', authVerifyMiddleware, customersController.deleteCustomer)
router.get('/customerDetailsById/:id', authVerifyMiddleware, customersController.customerDetailsById)

// suppliers
router.post('/createSuppliers', authVerifyMiddleware, suppliersController.createSuppliers)
router.post('/updateSuppliers/:id', authVerifyMiddleware, suppliersController.updateSuppliers)
router.get('/listSuppliers/:pageNo/:perPage/:searchKeyword', authVerifyMiddleware, suppliersController.listSuppliers)
router.get('/dropDownSuppliers', authVerifyMiddleware, suppliersController.dropDownSuppliers)
router.get('/deleteSupplier/:id', authVerifyMiddleware, suppliersController.deleteSupplier)
router.get('/supplierDetailsById/:id', authVerifyMiddleware, suppliersController.supplierDetailsById)

// expense types
router.post('/createExpenseTypes', authVerifyMiddleware, expenseTypesController.createExpenseTypes)
router.post('/updateExpenseTypes/:id', authVerifyMiddleware, expenseTypesController.updateExpenseTypes)
router.get('/listExpenseTypes/:pageNo/:perPage/:searchKeyword', authVerifyMiddleware, expenseTypesController.listExpenseTypes)
router.get('/dropDownExpenseTypes', authVerifyMiddleware, expenseTypesController.dropDownExpenseTypes)
router.get('/deleteExpenseTypes/:id', authVerifyMiddleware, expenseTypesController.deleteExpenseTypes)
router.get('/expenseTypesDetailsById/:id', authVerifyMiddleware, expenseTypesController.expenseTypesDetailsById)

// expense
router.post('/createExpense', authVerifyMiddleware, expenseController.createExpenses)
router.post('/updateExpense/:id', authVerifyMiddleware, expenseController.updateExpenses)
router.get('/listExpenses/:pageNo/:perPage/:searchKeyword', authVerifyMiddleware, expenseController.listExpenses)
router.get('/deleteExpense/:id', authVerifyMiddleware, expenseController.deleteExpense)
router.get('/expenseDetailsById/:id', authVerifyMiddleware, expenseController.expenseDetailsById)

// products
router.post("/createProducts",authVerifyMiddleware,productsController.createProducts);
router.post("/updateProducts/:id",authVerifyMiddleware,productsController.updateProducts);
router.get("/listProducts/:pageNo/:perPage/:searchKeyword",authVerifyMiddleware,productsController.listProducts);
router.get('/productsDetailsById/:id', authVerifyMiddleware, productsController.productsDetailsById)

//purchases
router.post("/CreatePurchases",authVerifyMiddleware,purchasesController.createPurchases);
router.get("/listPurchases/:pageNo/:perPage/:searchKeyword",authVerifyMiddleware,purchasesController.listPurchases);
router.get('/deletePurchases/:id', authVerifyMiddleware, purchasesController.deletePurchases)

//sales
router.post("/createSales",authVerifyMiddleware,salesController.createSales);
router.get("/listSales/:pageNo/:perPage/:searchKeyword",authVerifyMiddleware,salesController.listSales);
router.get('/deleteSales/:id', authVerifyMiddleware, salesController.deleteSales)

//returns
router.post("/createReturns",authVerifyMiddleware,returnsController.createReturns);
router.get("/listReturns/:pageNo/:perPage/:searchKeyword",authVerifyMiddleware,returnsController.listReturns);
router.get('/deleteReturns/:id', authVerifyMiddleware, returnsController.deleteReturns)

// reports
router.post('/expensesByDate', authVerifyMiddleware, reportController.expensesByDate)
router.post('/purchaseByDate', authVerifyMiddleware, reportController.purchaseByDate)
router.post('/returnByDate', authVerifyMiddleware, reportController.returnByDate)
router.post('/saleByDate', authVerifyMiddleware, reportController.saleByDate)

// summary
router.get('/expensesSummary', authVerifyMiddleware, summaryController.expensesSummary)
router.get('/returnSummary', authVerifyMiddleware, summaryController.returnSummary)
router.get('/purchaseSummary', authVerifyMiddleware, summaryController.purchaseSummary)
router.get('/salesSummary', authVerifyMiddleware, summaryController.salesSummary)

module.exports = router;