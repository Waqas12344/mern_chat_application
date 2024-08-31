import User from "../models/userModel.js";


export const newUser = async(req,res)=>{
    const avatar ={
        public_id:"public_id",
        url:"flwaei"
    };

    await User.create({
        name:"ali",
        username:"ali",
        password:"12345",
        avatar,
    });

    res.status(201).json({message:"user created"});
}

export const login =(req,res)=>{
    res.send("hello world")
}

