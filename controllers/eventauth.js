

import LoginD from '../models/LoginD.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const registerMang=async(req,res)=>{

    const{username,password,email,role}=req.body;



    try{

        const existingUser=await LoginD.findOne({username});
        if(existingUser){
            return res.status(400).json({error:"username already exists.Try with another username'"});
        }
        const user=new LoginD({username,password,email,role});
        await user.save();
        res.status(200).json({message:"event manager registered successfullt"});

    }catch (err){
        console.log('Error creating the user',err)
        res.status(400).json({error:err.message});
    }
};

export const loginMang=async(req,res)=>{
    const {username,password}=req.body;
    console.log(req.body);

    try{
        const user=await LoginD.findOne({username});
        console.log(user);

        if(!user){
            return res.status(400).json({error:"event manager not found"});
        }

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({error:"invalid credentials!!"})
        }

        const payload={id:user._id,role:user.role};
        

        const token=jwt.sign(payload,process.env.JWT_SECRECT);
        res.json({token});
    } catch (err){
        res.status(400).json({error:'error while login in the user '});
    }
}