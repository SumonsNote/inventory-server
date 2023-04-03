const expensesModel = require("../../model/expenses/expenseModel");
const expenseReportService = async (request) => {
    try {
        let userEmail = request.headers['email'];
        let formDate = request.body['formDate']
        let toDate = request.body['toDate']

        let data = await expensesModel.aggregate([
            { $match: { userEmail: userEmail, createdDate: { $gte: new Date(formDate), $lte: new Date(toDate) } } },
            {
                $facet: {
                    total: [{
                        $group: {
                            _id: 0,
                            totalAmount: { $sum: "$amount" }
                        }
                    }],
                    rows: [
                        { $lookup: { from: "expensetypes", localField: "typeId", foreignField: "_id", as: "type" } }
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
module.exports = expenseReportService