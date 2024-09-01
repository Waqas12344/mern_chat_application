import { compare } from "bcrypt";
import User from "../models/userModel.js";
import { sendToken } from "../utils/features.js";
import { tryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility.js";


export const newUser = async(req,res)=>{
    const {name,username,password,bio} = req.body;
    console.log(req.body)
    const avatar ={
        public_id:"public_id",
        url:"flwaei"
    };

  const user=  await User.create({
        name,
        username,
        bio,
        password,
        avatar,
    });

     sendToken(res,user,201,"user created")
}

export const login = tryCatch( async(req,res,next)=>{
     
        const{ username,password}= req.body;

    const user = await User.findOne({username}).select("+password");

    if(!user) return  next(new ErrorHandler("Invalid Username and password",404))

    const isMatch = await compare(password,user.password);

    if(!isMatch) return next(new ErrorHandler("Invalid Username and password",404))
    sendToken(res,user,200,"login success")
   
}
)

export const getMyProfile = async(req,res)=>{


}