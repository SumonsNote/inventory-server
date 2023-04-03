const mongoose = require('mongoose');
const detailsServiceById = async (request, dataModel) => {
    try {
        let detailsId = request.params.id;
        let userEmail = request.headers['email']

        const objectId = mongoose.Types.ObjectId;
        let queryObject = {};
        queryObject['_id'] = objectId(detailsId)
        queryObject['userEmail'] = userEmail;

        let data = await dataModel.aggregate([
            { $match: queryObject }
        ])

        return { status: 'success', data: data }
    } catch (error) {
        return { status: 'fail', data: error }
    }
}

module.exports = detailsServiceById;