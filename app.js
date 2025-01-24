import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app=express();

//t acts as a middleware that takes the incoming JSON data in the request body and parses it into a JavaScript object, so you can easily access and work with it in your routes. Without this, the server wouldn't know how to handle JSON data.
app.use(express.json());









// conections to the databse
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true

}).then(()=>{
    console.log("Connected to the database");


}).catch( (err)=>{
    console.log('Mongodb error connection ',err);
})





// const curdRout=require('./routes/eventroutes');
// const authRout=require('./routes/authroutes');

import curdRout from './routes/eventroutes.js';
import authRout from './routes/authroutes.js';



app.use('/auth',authRout);  
app.use('/events',curdRout);


// Error handling middleware
app.use((err,req,res)=>{
    console.log(err.stack);
    res.status(500).send({error:"INternal server error"});
})

//listening to the server
const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ON THE PORT ${PORT}`);

})

