import bcrypt from "bcrypt"
import { User } from "../models/user.js";

import { sendcookie } from "../utils/features.js";
import ErrHandler from "../middlewares/error.js";
// import cookieParser from "cookie-parser";


export const login = async(req,res,next)=>{

   try {
    const {email, password} = req.body

    const user = await User.findOne({email}).select("+password");

    if(!user) return next(new ErrHandler("Invalid email or password",400))

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) return next(new ErrHandler("Invalid email or password",400))

    sendcookie(user,res,`welcome back ${user.name}`,200)
   } catch (error) {
    next(error)
   }
}

export const registers = async(req,res)=>{

    try {
        const {name , email, password} = req.body

    let user = await User.findOne({email})

    if(user) return next(new ErrHandler("User Allready exsist",400))

    
    const hashPassword = await bcrypt.hash(password,10)

     user = await User.create({name,email,password:hashPassword});

     sendcookie(user,res,"Registerd succefully",201)
    } catch (error) {
        next(error)
    }
}

export const getMyprofile = async(req,res)=>{
     
     res.status(200).json({
         success:true,
        user:req.user, 

    })

    
}

export const logout = (req,res)=>{
    res.status(200).cookie("token","",{
        expires: new Date(Date.now()),
        sameSite:process.env.NODE_ENV === "Devlopment" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Devlopment" ?  false : ture
    }).json({
        success:true,
       user:req.user, 

   })

}


