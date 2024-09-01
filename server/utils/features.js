import jwt from "jsonwebtoken";
import mongoose from "mongoose"



export const connectDB =(uri)=>{
    mongoose.connect(uri,{dbName:"chatapp"}).
    then((data)=>{
        console.log(`Mongodb connected with server: ${data.connection.host}`)
    })
    .catch((err)=>{
        throw err
});
};


const cookiesOptions = {
    maxAge:15 * 24 * 60 * 60 * 1000,
    sameSite:"none",
    httpOnly:true,
    secure:true
}

export const sendToken = (res,user,code,message)=>{
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET );

    return res.status(code).cookie("chat-app",token, cookiesOptions).json({
        success:true,
        message,
        })
}