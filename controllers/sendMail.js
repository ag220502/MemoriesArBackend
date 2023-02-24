const nodemailer = require("nodemailer")
const sendMail= async ()=>
{
    // console.log("Sending Mail2");
    // let transporter = nodemailer.createTransport({
    //     host: "smtp.ethereal.email",
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //         user: 'tyrese61@ethereal.email',
    //         pass: 'mTB2Qf4Mbfj2Mz7b8w'
    //     },
    // });
    // let info = await transporter.sendMail({
    //     from: '"MemoriesAr" <no-reply@memoriesAr.com>',
    //     to: "akshaygarg6578@gmail.com", // list of receivers
    //     subject: "OTP", // Subject line
    //     text: "Hello world?", // plain text body
    //     html: "verification", // html body
    // });
    // console.log("Message sent: %s", info);
}

module.exports = {sendMail}