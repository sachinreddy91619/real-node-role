// import express from 'express';


// import mongoose from 'mongoose';

// const EventLocSchema = new mongoose.Schema(

//     {

//         eventneedlocation: {
//             type: String,
//             required: true
//         }
//     }
// )

// export default mongoose.model('EventLoc', EventLocSchema)

// Importing the Express library, commonly used for building APIs and web applications
import express from 'express';

// Importing Mongoose, a library for working with MongoDB in Node.js
import mongoose from 'mongoose';

// Defining a Mongoose schema for the 'EventLoc' collection in MongoDB
const EventLocSchema = new mongoose.Schema(
    {
        // Field to store the location required for an event (required field)
        eventneedlocation: {
            type: String, // A string to represent the event's location
            required: true // Ensures that this field must have a value
        }
    }
);

// Exporting the Mongoose model created from the schema
// The model is named 'EventLoc' and will interact with the 'eventlocs' collection in MongoDB
export default mongoose.model('EventLoc', EventLocSchema);
