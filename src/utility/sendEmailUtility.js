let nodemailer = require('nodemailer');

const sendEmailUtility = async(emailTo, emailText, emailSubject) => {
    let transporter = nodemailer.createTransport({
        host: 'mail.teamrabbil.com',
        port: 25,
        secure: false,
        auth:{
            user: 'info@teamrabbil.com',
            pass: '~sR4[bhaC[Qs'
        }, tls:{
            rejectUnauthorized: false
        },
    });

    let mailOptions = {
        from: 'Inventory Management System <info@teamrabbil.com>',
        to: emailTo,
        subject: emailSubject,
        text: emailText
    };

    return await transporter.sendMail(mailOptions)
}

module.exports = sendEmailUtility;