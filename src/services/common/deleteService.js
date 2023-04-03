const deleteService = async (request, model) => {
    try {
        let deleteId = request.params.id;
        let userEmail = request.headers['email'];

        let queryObject = {};
        queryObject['_id'] = deleteId;
        queryObject['userEmail'] = userEmail;

        let Delete = await model.deleteOne(queryObject)

        return { status: "success", Delete: Delete }

    }
    catch (error) {
        return { status: "fail", data: error }
    }
}
module.exports = deleteService