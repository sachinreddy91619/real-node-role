// // const mongoose=require('mongoose');

// // const bcrypt=require('bcrypt');
// // const express = require('express');

// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';
// import express from 'express';




// const Username=new mongoose.Schema({
//     username:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true
//     },
//     role:{
//         type:String,
//         enum:['user','admin'],
//         required:true
//     }
// });



// Username.pre('save',async function(next){
//     if(!this.isModified('password')){
//         return next();

//     }
//     this.password=await bcrypt.hash(this.password,10);
//     next();
// })

// //module.exports=mongoose.model('LoginD',Username);

// export default mongoose.model('LoginD',Username);

// Importing necessary libraries
import mongoose from 'mongoose'; // For interacting with MongoDB
import bcrypt from 'bcrypt'; // For hashing passwords
import express from 'express'; // For building APIs (not directly used in this schema)

// Defining the Mongoose schema for the 'LoginD' collection
const Username = new mongoose.Schema({
    // Field for the username (required field)
    username: {
        type: String, // Data type: String
        required: true // Ensures this field is mandatory
    },
    // Field for the user's password (required field)
    password: {
        type: String, // Data type: String
        required: true // Ensures this field is mandatory
    },
    // Field for the user's email (required field)
    email: {
        type: String, // Data type: String
        required: true // Ensures this field is mandatory
    },
    // Field for the user's role (e.g., 'user' or 'admin')
    role: {
        type: String, // Data type: String
        enum: ['user', 'admin'], // Restricts values to 'user' or 'admin'
        required: true // Ensures this field is mandatory
    }
});

// Adding a pre-save middleware to hash the password before saving the document
Username.pre('save', async function (next) {
    // Check if the password field is modified
    if (!this.isModified('password')) {
        return next(); // Skip hashing if the password hasn't been modified
    }
    // Hash the password using bcrypt with a salt factor of 10
    this.password = await bcrypt.hash(this.password, 10);
    next(); // Proceed to the next middleware or save operation
});

// Exporting the Mongoose model created from the schema
// The model is named 'LoginD' and will interact with the 'loginds' collection in MongoDB
export default mongoose.model('LoginD', Username);
