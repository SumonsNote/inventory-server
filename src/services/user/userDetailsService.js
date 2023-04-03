const userDetailsService = async(request, dataModel) => {
    try {
        let data = await dataModel.aggregate([{$match: {email:request.headers['email']}}])
        return {status: 'success', data:data}
    } catch (error) {
        return {status: 'fail', data:error.toString()}
    }
}

module.exports = userDetailsService;