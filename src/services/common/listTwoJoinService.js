const listTwoJoinService = async (request, dataModel, searchArray, joinStage1, joinStage2) => {
    try {
        let pageNo = Number(request.params.pageNo);
        let perPage = Number(request.params.perPage);
        let searchValue = request.params.searchKeyword;
        let userEmail = request.headers['email'];
        let skipRow = (pageNo - 1) * perPage;
        let data;
        if (searchValue !== "0") {
            data = await dataModel.aggregate([
                { $match: { userEmail: userEmail } },
                joinStage1, joinStage2,
                { $match: { $or: searchArray } },
                {
                    $facet: {
                        total: [{ $count: "count" }],
                        rows: [{ $skip: skipRow }, { $limit: perPage }],
                    }
                }
            ])

        }
        else {

            data = await dataModel.aggregate([
                { $match: { userEmail: userEmail } },
                joinStage1, joinStage2,
                {
                    $facet: {
                        total: [{ $count: "count" }],
                        rows: [{ $skip: skipRow }, { $limit: perPage }],
                    }
                }
            ])

        }
        return { status: "success", data: data }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}
module.exports = listTwoJoinService