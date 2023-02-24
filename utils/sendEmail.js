const APIKey =
  "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";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(APIKey);


module.exports  = async (email, otp, type) => {
  try {
    const message = `Hello!\n\nYour MemoriesAR ${type} code is: \n${otp}\n\nYour code will expire after 5 minutes —do not share this code with anyone.\nIf you did not ask for this code, please ignore this mail.`
    await sgMail.send({
      to: email,
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
