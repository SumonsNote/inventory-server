const dropDownService = async (request, dataModel, projection) => {
    try {
        let userEmail = request.headers['email']
        let data = await dataModel.aggregate([
            { $match: { userEmail: userEmail } },
            { $project: projection }
        ])

        return { status: "success", data: data }
    } catch (error) {
        return { status: 'fail', data: error }
    }
}

module.exports = dropDownService;