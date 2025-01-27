import express from 'express'
// model which is used to store the registration details
import LoginD from '../models/LoginD.js';

// jsonwebtoken 
// jsonwebtoken is a Node.js library that provides methods to create, sign, and verify JWTs.
// It is often used with the Express framework for handling user authentication and securing APIs.
import jwt from 'jsonwebtoken';

// bcrypt

// The bcrypt library is used in Node.js for hashing passwords and verifying them securely. It is especially useful for implementing user authentication systems, ensuring passwords are stored in a hashed form instead of plaintext.
import bcrypt from 'bcrypt';


// registration of the user by taking username, password, email , role  from the user:
export const registerMang = async (req, res) => {


    // user need to give these details while registration from the request-body
    const { username, password, email, role } = req.body;



    try {
        // find user in the data-base , to Avoid the registration of the same username again ;
        const existingUser = await LoginD.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "username already exists.Try with another username'" });
        }
        // If he is new user then create a new registration with these fields
        const user = new LoginD({ username, password, email, role });
        // and save
        await user.save();
        res.status(200).json({ message: "event manager registered successfullt" });

    }

    catch (err) {
        // if any internal errors occurs the those events are handled by catch block.
        console.log('Error creating the user', err)
        res.status(400).json({ error: err.message });
    }
};

// login of the user by taking username, password,  from the user:
export const loginMang = async (req, res) => {

    // user need to give these details while registration from the request-body
    const { username, password } = req.body;
    console.log(req.body);

    try {
        // to check wheather user is registered or not
        const user = await LoginD.findOne({ username });
        console.log(user);

        // If user not registered then send error message
        if (!user) {
            return res.status(400).json({ error: "event manager not found" });
        }

        // comapring the passwords user.password{ which is given while registartion} password {password which is given while login}
        const isMatch = await bcrypt.compare(password, user.password);

        // if passwords are not matched then return the error 
        if (!isMatch) {
            return res.status(400).json({ error: "invalid credentials!!" })
        }

        //for identification the individual user create the payload by {user:id} and by what role they are logged in
        const payload = { id: user._id, role: user.role };

        // after successfull login generate the token
        const token = jwt.sign(payload, process.env.JWT_SECRECT);
        res.json({ token });
    }

    catch (err) {
        // if any internal errors occurs the those events are handled by catch block.
        res.status(400).json({ error: 'error while login in the user ' });
    }
}