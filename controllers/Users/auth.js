const quries = require("../../crudOperations/Users/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mailer = require("nodemailer")

//Functin to login to the account
const loginFunc = async (req,res)=>{
    const email = req.body.email
    const checkpassword = req.body.password
    if(!email || !checkpassword)
    {
        return res.status(400).json("Please Enter All Details.")
    }
    try{
        if(!await quries.checkUserByEmail(email))
        {
            return res.status(404).json("User Does Not Exists!")
        }
    }
    catch(error)
    {
        return res.status(500).json(error)
    }

    const data = await quries.getUserByEmail(email)

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
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    if(!email || !name || !password)
    {
        return res.status(400).json("Please Enter All Details.")
    }
    try{
        if(await quries.checkUserByEmail(email))
        {
            console.log("Hello")
            return res.status(409).json("User Already Exists!")
        }
    }
    catch(error)
    {
        return res.status(500).json(error)
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(req.body.password,salt);
    try {
        const user = await quries.insertUser(name,email,hashedPass)
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

async function sendMail({to,subject,html}){
    const transporter = mailer.createTransport(
    )

}

//Function for forget password
const forgotFunc = async (req,res)=>{

}

//Function for forget password
const resetPassFunc = async (req,res)=>{

}

// router.use("",verifyUser,)
module.exports = {loginFunc,registerFunc,logoutFunc,forgotFunc}