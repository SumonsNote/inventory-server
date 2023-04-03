const userCreateService = async(request, dataModel) => {
    try {
        let psotBody = request.body;
        let data = await dataModel.create(psotBody)
        return {status: 'sucess', data:data}
    } catch (error) {
        return {status: 'fail', data:error.toString()}
    }
}

module.exports = userCreateService;