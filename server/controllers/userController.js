import { compare } from "bcrypt";
import User from "../models/userModel.js";
import { sendToken } from "../utils/features.js";


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

export const login =async(req,res)=>{
    const{ username,password}= req.body;

    const user = await User.findOne({username}).select("+password");

    if(!user) return res.status(400).json({message:"Invalid credentials"});

    const isMatch = await compare(password,user.password);

    if(!isMatch) return res.status(400).json({message:"Invalid credentials"});
    sendToken(res,user,200,"login success")
}

