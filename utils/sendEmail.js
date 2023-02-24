require('dotenv').config()
const APIKey = process.env.SENDGRID_API_KEY;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(APIKey);


module.exports  = async (user, otp, type) => {
  try {
    const name = user.name;
    const message = `Hello ${name}!\n\nYour MemoriesAR ${type} code is: \n${otp}\n\nYour code will expire after 5 minutes —do not share this code with anyone.\nIf you did not ask for this code, please ignore this mail.`
    await sgMail.send({
      to: user.email,
      from: "MemoriesARemail@gmail.com",
      subject: "Verify you Email for MemoriesAR",
      text: message,
    });
    console.log('Email has been sent to the user.')
    // console.log({ message: `${text} email sent` });
  } catch (error) {
    console.log('Email has not been sent to the user.')
    // console.log({ message: `${text} email not sent` });
    console.log(error);
    return error;
  }
};  
