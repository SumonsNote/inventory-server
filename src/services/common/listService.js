const listService = async (request, dataModel, searchArray) => {
    try {
        let pageNo = Number(request.params.pageNo);
        let perPage = Number(request.params.perPage);
        let searchValue = request.params.searchKeyword;
        let userEmail = request.headers['email']
        let skipRow = (pageNo - 1) * perPage;
        let data;

        if (searchValue !== '0') {
            let searchQuery = { $or: searchArray }
            data = await dataModel.aggregate([
                { $match: { userEmail: userEmail } },
                { $match: searchQuery },
                {
                    $facet: {
                        total: [{ $count: "count" }],
                        rows: [{ $skip: skipRow }, { $limit: perPage }]
                    }
                }
            ])
        }
        else {
            data = await dataModel.aggregate([
                { $match: { userEmail: userEmail } },
                {
                    $facet: {
                        total: [{ $count: "count" }],
                        rows: [{ $skip: skipRow }, { $limit: perPage }]
                    }
                }
            ])
        }
        return { status: 'success', data: data }
    } catch (error) {
        return { status: 'fail', data:error.toString() }
    }
}

module.exports = listService;