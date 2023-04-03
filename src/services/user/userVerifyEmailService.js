const otpsModel = require('../../model/users/otpsModel')
const sendEmailUtility = require('../../utility/sendEmailUtility')

const userVerifyEmailService = async (request, dataModel) => {
    try {
        let email = request.params.email;
        let otpCode = Math.floor(100000 + Math.random() * 900000)

        let userCount = (await dataModel.aggregate([{ $match: { email: email } }, { $count: "total" }]))

        if (userCount.length > 0) {
            await otpsModel.create({ email: email, otp: otpCode })
            let sendEmail = await sendEmailUtility(email, 'Your Pin Code is = ' + otpCode, 'Inventory Pin Verification Code')
            return { status: 'success', data: sendEmail }
        }
        else {
            return { status: 'fail', data: 'No user found' }
        }
    } catch (error) {
        return { status: 'fail', data: error.toString() }
    }
}

module.exports = userVerifyEmailService;