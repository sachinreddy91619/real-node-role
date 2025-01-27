// //const mongoose=require('mongoose');
// import mongoose from 'mongoose';
// const eventschema = new mongoose.Schema({

//     amountrange: {
//         type: Number
//     },

//     eventname: {

//         type: String, required: true
//     },
//     eventdate: {
//         type: Date, // This will set today's date as the default value

//         required: true
//     },

//     foodcatering: {
//         type: String
//     },
//     peopleattendance: {
//         type: Number,
//         required: true
//     },
//     eventlocation: {
//         type: String,
//         required: true
//     },
//     eventtime: {
//         type: String,
//         required: true
//     },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'LoginD', required: true },


// });



// //module.exports=mongoose.model('Event',eventschema);
// export default mongoose.model('Event', eventschema);
// Importing Mongoose, a library for MongoDB object modeling
import mongoose from 'mongoose';

// Defining a Mongoose schema for the 'Event' collection
const eventschema = new mongoose.Schema({

    // The budget range for the event (optional field)
    amountrange: {
        type: Number // Numeric value for the amount range
    },

    // The name of the event (required field)
    eventname: {
        type: String, // A string representing the event name
        required: true // Ensures that this field is mandatory
    },

    // The date of the event (required field)
    eventdate: {
        type: Date, // Stores the event date as a Date object
        required: true // Ensures that this field is mandatory
    },

    // Details about food catering for the event (optional field)
    foodcatering: {
        type: String // A string representing the food catering details
    },

    // The number of people expected to attend the event (required field)
    peopleattendance: {
        type: Number, // Numeric value for the number of attendees
        required: true // Ensures that this field is mandatory
    },

    // The location where the event will take place (required field)
    eventlocation: {
        type: String, // A string representing the event location
        required: true // Ensures that this field is mandatory
    },

    // The time of the event (required field)
    eventtime: {
        type: String, // A string representing the time of the event
        required: true // Ensures that this field is mandatory
    },

    // Reference to the user who created the event (required field)
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Refers to the ObjectId of another document in the MongoDB collection
        ref: 'LoginD', // Refers to the 'LoginD' model to establish a relationship
        required: true // Ensures that this field is mandatory
    }

});

// Exporting the model created using the 'eventschema' schema
// The model is named 'Event' and will interact with the 'events' collection in MongoDB
export default mongoose.model('Event', eventschema);
