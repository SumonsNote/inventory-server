const dataModel = require('../../model/users/usersModel')
const otpsModel = require('../../model/users/otpsModel')
const userCreateService = require('../../services/user/userCreateService')
const userLoginService = require('../../services/user/userLoginService')
const userUpdateService = require('../../services/user/userUpdateService')
const userDetailsService = require('../../services/user/userDetailsService')
const userResetPasswordService = require('../../services/user/userResetPasswordService')
const userVerifyOtpService = require('../../services/user/userVerifyOtpService')
const userVerifyEmailService = require('../../services/user/userVerifyEmailService')

exports.registration = async(req, res) => {
    let result = await userCreateService(req, dataModel)
    res.status(200).json(result)
}
exports.login = async(req, res) => {
    let result = await userLoginService(req, dataModel)
    res.status(200).json(result)
}
exports.profileUpdate = async(req, res) => {
    let result = await userUpdateService(req, dataModel)
    res.status(200).json(result)
}
exports.profileDetails = async(req, res) => {
    let result = await userDetailsService(req, dataModel)
    res.status(200).json(result)
}
exports.recoverVerifyEmail = async(req, res) => {
    let result = await userVerifyEmailService(req, dataModel)
    res.status(200).json(result)
}
exports.recoverVerifyOtp = async(req, res) => {
    let result = await userVerifyOtpService(req, otpsModel)
    res.status(200).json(result)
}
exports.recoverResetPassword = async(req, res) => {
    let result = await userResetPasswordService(req, dataModel)
    res.status(200).json(result)
}