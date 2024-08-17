import jwt from "jsonwebtoken"

export const sendcookie = (user,res,message,statusCode=200)=>{
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
    
    console.log(process.env.NODE_ENV)
    console.log(process.env.NODE_ENV === "Devlopment")
    res.status(201).cookie("token",token,{
         httpOnly:true,
         maxAge: 15 * 60 * 1000,
         sameSite:process.env.NODE_ENV === "Devlopment" ? "lax" : "none",
         secure: process.env.NODE_ENV === "Devlopment" ?  false : ture
    }).json({
        success:true,
        message
    })
}