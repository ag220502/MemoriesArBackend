const queries = require("../../crudOperations/Users/users");
const verificationQueries = require("../../crudOperations/Users/otpVerification");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
// const mailer = require("../sendMail.js")

//importing sendgrid mailer
const sendEmail = require("../../utils/sendEmail.js");

// call this function to send email
/**
  await sendEmail(user.name, otp, "verification"); // for verificatrion
  await sendEmail(user.name, otp, "password reset"); // for password reset
 * */

const getId = (req, res) => {
  const token = req.body.token;
  jwt.verify(token, "secretkey", async (err, paylod) => {
    if (err) {
      return res.status(404).json(err);
    } else {
      const userId = paylod;
      return res.status(200).json(userId);
    }
  });
};

//Functin to login to the account
const loginFunc = async (req, res) => {
  const email = req.body.email;
  const checkpassword = req.body.password;
  // check if all details are entered
  if (!email || !checkpassword) {
    return res.status(400).json("Please Enter All Details.");
  }

  // check if user exists
  try {
    if (!(await queries.checkUserByEmail(email))) {
      return res.status(404).json("User Does Not Exists!");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
  // check if password is correct
  const data = await queries.getUserByEmail(email);

  const checkPass = bcrypt.compareSync(checkpassword, data[0].password);
  if (!checkPass) {
    return res.status(400).json("Wrong Credentials!");
  }
  const id = data[0].id;
  // check if the user is verified
  if (!(await verificationQueries.checkUserVerified(id))) {
    const OTP = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    await verificationQueries.createToken(email, OTP, "verify");
    await sendEmail(email, OTP, "verification"); // for verificatrion
    return res.status(400).json("Please Verify Your Account First!");
  }
  // create a token for creating a session
  const token = jwt.sign({ id: data[0].id }, "secretkey");
  res
    .cookie("accessToken", token)
    .status(200)
    .json({ token: token, userId: data[0].id });
};

//Functin to regiter the user
const registerFunc = async (req, res) => {
  console.log("In reg func");
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !name || !password) {
    return res.status(400).json("Please Enter All Details.");
  }
  try {
    if (await queries.checkUserByEmail(email)) {
      return res.status(409).json("User Already Exists!");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
  console.log("Salt Gen");
  const salt = bcrypt.genSaltSync(10);
  const hashedPass = bcrypt.hashSync(password, salt);
  console.log("Salt Gen Done");
  // console.log("Sending Mail")
  // subject = "OTP Verification"
  // html = "<b>OTP is 123456</b>"
  // const sendMail = await mailer.sendMail()
  // if(sendMail)
  // {
  //     console.log("Mail Sent");
  // }

  try {
    const user = await queries.insertUser(name, email, hashedPass);
    if (user) {
      const OTP = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      // create verification token      
      const result = await verificationQueries.createToken(email, OTP, "verify");
      
      await sendEmail(email, OTP, "verification"); // for verificatrion
      return res
        .status(200)
        .json("User Registered Successfully, kindly verify your account");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

//Function to logout user
const logoutFunc = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json(true);
};

//Function to very whether user is logged in or not
async function verifyUser(req, res, next) {
  const token = req.cookies.token;
  if (token === undefined) {
    return res.status(404).json("Access Denied! User Not Logged In");
  } else {
    jwt.verify(token, "secretkey", (err, authData) => {
      if (err) {
        return res.status(404).json("Access Denied! User Not Logged In");
      } else {
        next();
      }
    });
  }
}
// function to update user password when logged in
// function to update user password when logged in
const updatePassword = async (req,res)=>{
    const id = req.body.id
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword
    const confirmPassword = req.body.confirmPassword
    if(!id){
        return res.status(400).json("ID is required!")
    }
    // if(!oldPassword || !newPassword || !confirmPassword){
    //     return res.status(400).json("Please Enter All Details.")
    // }
    // if(newPassword !== confirmPassword){
    //     return res.status(400).json("Passwords do not match!")
    // }
    if(newPassword === oldPassword){
        return res.status(400).json("New Password cannot be same as old password!")
    }
    // try{
    //     if(!await queries.checkUserById(id))
    //     {
    //         return res.status(404).json("User Does Not Exist!")
    //     }
    // }
    // catch(error)
    // {
    //     return res.status(500).json(error)
    // }
    const data = await queries.getUserById(id)
    const checkPass = bcrypt.compareSync(oldPassword,data[0].password)
    if(!checkPass)
    {
        return res.status(400).json({error:"Wrong Credentials!"})
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(newPassword,salt);
    try {
        const user = await queries.updatePassword(id,hashedPass)
        if(user)
        {
            return res.status(200).json("Password Updated")
        }
    } catch (error) {
        return res.status(500).json("Server Error!")
    }

}


//Function for forget password
const forgotFunc = async (req, res) => {};

//Function for forget password
const resetPassFunc = async (req, res) => {};

// router.use("",verifyUser,)
module.exports = {
  loginFunc,
  registerFunc,
  logoutFunc,
  forgotFunc,
  updatePassword,
  getId,
};
