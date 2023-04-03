const mongoose = require("mongoose");

const deleteParentChildsService = async (request, parentModel, childsModel, joinPropertyName) => {

    const session = await mongoose.startSession();
    // Parent Creation
    let deleteId = request.params.id;
    let userEmail = request.headers['email'];

    try {

        // Begin Transaction
        await session.startTransaction();

        let childQueryObject = {};
        childQueryObject[joinPropertyName] = deleteId;
        childQueryObject['userEmail'] = userEmail;

        let parentQueryObject = {};
        parentQueryObject['_id'] = deleteId;
        parentQueryObject['userEmail'] = userEmail;


        // First Process
        let childsDelete = await childsModel.deleteMany(childQueryObject, {session});

        // Second Process
        let parentDelete = await parentModel.deleteOne(parentQueryObject, {session});


        // Commit Transaction
        await session.commitTransaction();
        session.endSession();


        return { status: "success", parent: parentDelete, childs: childsDelete }

    }
    catch (error) {
        // Roll Back Transaction
        await session.abortTransaction();
        session.endSession();
        return { status: "fail", data: error }
    }
}
module.exports = deleteParentChildsService