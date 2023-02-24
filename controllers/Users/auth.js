const queries = require("../../crudOperations/Users/users")
const bcrypt = require("bcrypt-nodejs")
const jwt = require("jsonwebtoken")
const mailer = require("../sendMail.js")

//importing sendgrid mailer
const sendEmail = require("../../utils/sendEmail.js")

// call this function to send email
/**
  await sendEmail(user.name, otp, "verification"); // for verificatrion
  await sendEmail(user.name, otp, "password reset"); // for password reset
 * */ 

//Functin to login to the account
const loginFunc = async (req,res)=>{
    const email = req.body.email
    const checkpassword = req.body.password
    if(!email || !checkpassword)
    {
        return res.status(400).json("Please Enter All Details.")
    }
    try{
        if(!await queries.checkUserByEmail(email))
        {
            return res.status(404).json("User Does Not Exists!")
        }
    }
    catch(error)
    {
        return res.status(500).json(error)
    }

    const data = await queries.getUserByEmail(email)

    const checkPass = bcrypt.compareSync(checkpassword,data[0].password)
    if(!checkPass)
    {
        return res.status(400).json("Wrong Credentials!")
    }
    const token = jwt.sign({id:data[0].id},"secretkey")
    const {password, ...others} = data[0]
    res.cookie("accessToken", token).status(200).json(others)
}

//Functin to regiter the user
const registerFunc = async (req,res)=>{
    console.log("In reg func");
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    if(!email || !name || !password)
    {
        return res.status(400).json("Please Enter All Details.")
    }
    try{
        if(await queries.checkUserByEmail(email))
        {
            console.log("Hello")
            return res.status(409).json("User Already Exists!")
        }
    }
    catch(error)
    {
        return res.status(500).json(error)
    }
    console.log("Salt Gen")
    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(req.body.password,salt);
    try {
        console.log("Sending Mail")
        subject = "OTP Verification"
        html = "<b>OTP is 123456</b>"
        const sendMail = await mailer.sendMail()
        if(sendMail)
        {
            console.log("Mail Sent");
        }
        
        const user = await queries.insertUser(name,email,hashedPass)
        if(user)
        {
            return res.status(200).json("User Registered Successfully.")
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

//Function to logout user
const logoutFunc = (req,res)=>{
    res.clearCookie("accessToken",{
        secure:true,
        sameSite:"none"
    }).status(200).json("User Logged Out Successfully.")
}

//Function to very whether user is logged in or not
async function verifyUser(req,res,next){
    const token = req.cookies.token
    if(token === undefined)
    {
        return res.status(404).json("Access Denied! User Not Logged In")
    }
    else
    {
        jwt.verify(token,"secretkey",(err,authData)=>{
            if(err)
            {
                return res.status(404).json("Access Denied! User Not Logged In")
            }
            else
            {
                next();
            }
        } )
    }
}
// function to update user password when logged in
const updatePassword = async (req,res)=>{
    const id = req.body.id
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword
    const confirmPassword = req.body.confirmPassword
    if(!id){
        return res.status(400).json("ID is required!")
    }
    if(!oldPassword || !newPassword || !confirmPassword){
        return res.status(400).json("Please Enter All Details.")
    }
    if(newPassword !== confirmPassword){
        return res.status(400).json("Passwords do not match!")
    }
    if(newPassword === oldPassword){
        return res.status(400).json("New Password cannot be same as old password!")
    }
    try{
        if(!await queries.checkUserById(id))
        {
            return res.status(404).json("User Does Not Exist!")
        }
    }
    catch(error)
    {
        return res.status(500).json(error)
    }
    const data = await queries.getUserById(id)
    const checkPass = bcrypt.compareSync(oldPassword,data[0].password)
    if(!checkPass)
    {
        return res.status(400).json("Wrong Credentials!")
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(newPassword,salt);
    try {
        const user = await queries.updatePassword(id,hashedPass)
        if(user)
        {
            return res.status(200).json("Password Updated Successfully.")
        }
    } catch (error) {
        return res.status(500).json(error)
    }

}


//Function for forget password
const forgotFunc = async (req,res)=>{

}

//Function for forget password
const resetPassFunc = async (req,res)=>{

}

// router.use("",verifyUser,)
module.exports = {loginFunc,registerFunc,logoutFunc,forgotFunc, updatePassword}