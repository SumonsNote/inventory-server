const createService = async (request, dataModel) => {
    try {

        let postBody = request.body;
        postBody.userEmail = request.headers['email']

        let data = await dataModel.create(postBody)
        return { status: "success", data: data }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}
module.exports = createService