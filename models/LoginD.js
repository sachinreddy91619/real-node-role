// const mongoose=require('mongoose');

// const bcrypt=require('bcrypt');
// const express = require('express');

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import express from 'express';




const Username=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        required:true
    }
});



Username.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();

    }
    this.password=await bcrypt.hash(this.password,10);
    next();
})

//module.exports=mongoose.model('LoginD',Username);

export default mongoose.model('LoginD',Username);