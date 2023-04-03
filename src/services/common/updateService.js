const updateService = async (request, dataModel) => {
    try {
        let userEmail = request.headers['email'];
        let id = request.params.id;
        let postBody = request.body;
        let data = await dataModel.updateOne({ _id: id, userEmail: userEmail }, postBody);
        return { status: "success", data: data }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}
module.exports = updateService
