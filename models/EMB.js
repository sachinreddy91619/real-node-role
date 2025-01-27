
// // Importing the Express library for building web applications and APIs
// import express from 'express';

// // Importing the Mongoose library for interacting with MongoDB
// import mongoose from 'mongoose';


// // // Defining a Mongoose schema for the 'event' collection in the MongoDB database.
// const eventSchema = new mongoose.Schema({

//     // The budget range for the event (optional field)
//     amountrange: {
//         type: Number // Numeric value representing the amount range
//     },

//     // The name of the event (required field)
//     eventname: {
//         type: String, // A string representing the event name
//         required: true // This field is mandatory


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
//     eventManager: {
//         type: String,
//         required: true
//     },
//     eventManagerEmail: {
//         type: String,
//         required: true
//     },
//     eventStatus: {
//         type: String,
//         required: true
//     },
//     eventBookedBy: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     }
// });
// export default mongoose.model('EMB', eventSchema);
// Importing the Express library for building web applications and APIs
import express from 'express';

// Importing the Mongoose library for interacting with MongoDB
import mongoose from 'mongoose';

// Defining a Mongoose schema for the 'event' collection in the MongoDB database
const eventSchema = new mongoose.Schema({

    // The budget range for the event (optional field)
    amountrange: {
        type: Number // Numeric value representing the amount range
    },

    // The name of the event (required field)
    eventname: {
        type: String, // A string representing the event name
        required: true // This field is mandatory
    },

    // The date of the event (required field)
    eventdate: {
        type: Date, // A date object to store the event date
        required: true // This field is mandatory
    },

    // Details about the food catering for the event (optional field)
    foodcatering: {
        type: String // A string representing food catering details
    },

    // The number of people expected to attend the event (required field)
    peopleattendance: {
        type: Number, // Numeric value representing the number of attendees
        required: true // This field is mandatory
    },

    // The location where the event will take place (required field)
    eventlocation: {
        type: String, // A string representing the event location
        required: true // This field is mandatory
    },

    // The time of the event (required field)
    eventtime: {
        type: String, // A string representing the event time
        required: true // This field is mandatory
    },

    // The name of the manager responsible for organizing the event (required field)
    eventManager: {
        type: String, // A string representing the event manager's name
        required: true // This field is mandatory
    },

    // The email address of the event manager (required field)
    eventManagerEmail: {
        type: String, // A string representing the event manager's email
        required: true // This field is mandatory
    },

    // The current status of the event (e.g., scheduled, canceled, completed) (required field)
    eventStatus: {
        type: String, // A string representing the event status
        required: true // This field is mandatory
    },

    // The name of the person who booked the event (required field)
    eventBookedBy: {
        type: String, // A string representing the name of the person who booked the event
        required: true // This field is mandatory
    },

    // The email address of the person who booked the event (required field)
    email: {
        type: String, // A string representing the booker's email address
        required: true // This field is mandatory
    }
});

// Exporting the Mongoose model created using the schema above
// The model is named 'EMB' and will interact with a MongoDB collection
export default mongoose.model('EMB', eventSchema);
