const returnProductsModel = require("../../model/returns/returnProductsModel");
const returnReportService = async (request) => {
    try {
        let userEmail = request.headers['email'];
        let formDate = request.body['formDate']
        let toDate = request.body['toDate']

        let data = await returnProductsModel.aggregate([
            { $match: { userEmail: userEmail, createdDate: { $gte: new Date(formDate), $lte: new Date(toDate) } } },
            {
                $facet: {
                    total: [{
                        $group: {
                            _id: 0,
                            totalAmount: { $sum: "$total" }
                        }
                    }],
                    rows: [
                        { $lookup: { from: "products", localField: "productId", foreignField: "_id", as: "products" } },
                        { $unwind: "$products" },
                        { $lookup: { from: "brands", localField: "products.brandId", foreignField: "_id", as: "brands" } },
                        { $lookup: { from: "categories", localField: "products.categoryId", foreignField: "_id", as: "categories" } }
                    ],
                }
            }


        ])
        return { status: "success", data: data }

    }

    catch (error) {
        return { status: "fail", data: error.toString() }
    }
}
module.exports = returnReportService