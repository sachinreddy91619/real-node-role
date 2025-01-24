// const express = require('express');
// const { registerMang, loginMang } = require('../controllers/eventauth');

import express from 'express';
import { registerMang, loginMang } from '../controllers/eventauth.js';

// This file likely contains the logic for handling user registration and login, 
// and inside this file, we expect the functions registerMang and loginmang


const router = express.Router();
//  express.Router() → This is a method provided by Express that creates a router object. 
// A router is used to handle different HTTP requests for specific routes (URLs) in the application.


router.post('/register', registerMang);

//  '/register' The route or path that is being handled.

// registerMang → This is the callback function that will be executed when a POST request is made to /register. 

// It is imported from the authenCon. This function will contain the logic for handling user registration, such as creating a new user in the database.




router.post('/login', loginMang);

//module.exports = router;
export default router;