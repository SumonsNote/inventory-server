const otpsModel = require('../../model/users/otpsModel')

const userResetPasswordService = async (request, dataModel) => {
    let email = request.body['email']
    let otpCode = request.body['otp']
    let newPassword = request.body['password']
    let statusUpdate = 1

    try {
        let otpUsedCount = await otpsModel.aggregate([{ $match: { email: email, otp: otpCode, status: statusUpdate } }, { $count: 'total' }])

        if (otpUsedCount.length > 0) {
            let passUpdate = await dataModel.updateOne({ email: email }, { password: newPassword })
            return { status: 'success', data: passUpdate }
        }
        else {

            return { status: 'fail', data: 'Invalid request' }
        }
    } catch (error) {
        return {status: 'fail', data: error.toString()}
    }
}

module.exports = userResetPasswordService;