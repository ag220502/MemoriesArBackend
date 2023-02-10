import { db } from "../connect.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const checkUser = (req,res)=>
{
    const registerQuery = "SELECT * FROM users WHERE email=?";
    db.query(registerQuery,[req.body.email],(err,data)=>{
        if(err){
            return "ServerError"
            return res.status(500).json(err)
        }
        if(data.length){
            return "UserExist"
            return res.status(409).json("User Already Exists!")
        }
    })
}

export const registerFunc = (req,res)=>{
    const result = checkUser(req)
    if(result==="ServerError"){
        return res.status(500).json(err)
    }
    if(result==="UserExist"){
        return res.status(409).json("User Already Exists!")
    }
    else{
        const salt = bcrypt.genSaltSync(10);
        const hashedPass = bcrypt.hashSync(req.body.password,salt)
        const regQuery = "INSERT INTO `users`(`firstName`,`email`, `password`) VALUES (?,?,?)";
        db.query(regQuery,[req.body.name,req.body.email,hashedPass],(err,data)=>{
            if(err){
                return res.status(500).json(err)
            }
            else{
                return res.status(200).json("User Registered Successfully.")
            }
        })
    }
}


export const loginFunc = (req,res)=>{
    const loginQuery = "SELECT * FROM users WHERE email=?";
    db.query(loginQuery,[req.body.email],(err,data)=>{
        if(err){
            return res.status(500).json(err)
        }
        if(data.length===0)
        {
            return res.status(404).json("User Does Not Exists!")
        }
        
        const checkPass = bcrypt.compareSync(req.body.password,data[0].password)

        if(!checkPass)
        {
            return res.status(400).json("Wrong Credentials!")
        }
        
        const token = jwt.sign({id:data[0].id},"secretkey")
        const {password, ...others} = data[0]
        res.cookie("accessToken", token).status(200).json(others)

    })
}

export const logoutFunc = (req,res)=>{
    res.clearCookie("accessToken",{
        secure:true,
        sameSite:"none"
    }).status(200).json("User Logged Out Successfully.")
}

export const forgotPass = (req,res)=>{
    const result = checkUser(req)
    if(result==="ServerError"){
        return res.status(500).json(err)
    }
    if(result==="UserExist"){
        //Mail the verification code
    }
}