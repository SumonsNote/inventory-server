const mongoose = require("mongoose");

const createparentchildsService = async (request, parentModel, childsModel, joinPropertyName) => {

    // Create Transaction Session
    const session = await mongoose.startSession();

    try {

        // Begin Transaction
        await session.startTransaction();

        // First Database Process
        let parent = request.body['parent'];
        parent.userEmail = request.headers['email'];
        let parentCreation = await parentModel.create([parent], { session });


        // Second Database Process
        let childs = request.body['childs'];
        await childs.forEach((element) => {
            element[joinPropertyName] = parentCreation[0]['_id'];
            element['userEmail'] = request.headers['email'];
        });

        let childsCreation = await childsModel.insertMany(childs, { session });



        // Transaction Success
        await session.commitTransaction();
        session.endSession();

        return { status: "success", parent: parentCreation, childs: childsCreation }


    }
    catch (error) {
        // Roll Back Transaction if Fail
        await session.abortTransaction();
        session.endSession();
        return { status: "fail", data: error }
    }
}
module.exports = createparentchildsService