// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();
// const app=express();

// //t acts as a middleware that takes the incoming JSON data in the request body and parses it into a JavaScript object, so you can easily access and work with it in your routes. Without this, the server wouldn't know how to handle JSON data.
// app.use(express.json());









// // conections to the databse
// mongoose.connect(process.env.MONGO_URL,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true

// }).then(()=>{
//     console.log("Connected to the database");


// }).catch( (err)=>{
//     console.log('Mongodb error connection ',err);
// })





// // const curdRout=require('./routes/eventroutes');
// // const authRout=require('./routes/authroutes');

// import curdRout from './routes/eventroutes.js';
// import authRout from './routes/authroutes.js';



// app.use('/auth',authRout);  
// app.use('/events',curdRout);


// // Error handling middleware
// app.use((err,req,res)=>{
//     console.log(err.stack);
//     res.status(500).send({error:"INternal server error"});
// })

// //listening to the server
// const PORT=process.env.PORT || 3000;
// app.listen(PORT,()=>{
//     console.log(`SERVER IS RUNNING ON THE PORT ${PORT}`);

// })

// Importing required libraries
import express from 'express'; // For creating the Express server and handling routes
import mongoose from 'mongoose'; // For interacting with MongoDB
import dotenv from 'dotenv'; // For loading environment variables from a .env file

// Configuring dotenv to load environment variables from a .env file
dotenv.config();

// Creating an instance of an Express application
const app = express();

// Middleware to parse incoming JSON data in the request body into a JavaScript object
// This allows easy access to the request body in your routes
app.use(express.json());

// Connecting to MongoDB using mongoose
// The database URL is stored in the environment variable MONGO_URL
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, // Ensures that the new URL parser is used (helps avoid deprecation warnings)
    useUnifiedTopology: true // Helps prevent warnings related to MongoDB's topology engine
}).then(() => {
    console.log("Connected to the database"); // Log success message when connected
}).catch((err) => {
    console.log('Mongodb error connection', err); // Log error message if connection fails
});

// Importing the routes for events and authentication
import curdRout from './routes/eventroutes.js'; // Routes for event-related operations
import authRout from './routes/authroutes.js'; // Routes for authentication-related operations

// Registering the routes with specific base paths
app.use('/auth', authRout);  // All auth-related routes will be prefixed with '/auth'
app.use('/events', curdRout); // All event-related routes will be prefixed with '/events'

// Error handling middleware to catch any errors not handled by other routes
app.use((err, req, res) => {
    console.log(err.stack); // Log the error stack trace for debugging
    res.status(500).send({ error: "Internal server error" }); // Respond with a 500 error message
});

// Listening for incoming requests on a specified port
// The port is either taken from the environment variable PORT or defaults to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON THE PORT ${PORT}`); // Log the server start message
});
