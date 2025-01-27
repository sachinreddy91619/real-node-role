//const Event=require('../models/Event');

import express from 'express';

// model which is used to store the event details
import Event from '../models/Event.js';

// model which is used to store the eventneededlocation details
import EventLoc from '../models/EventLoc.js';

// model which is used to store the complete event booked details
import EMB from '../models/EMB.js';

// model which is used to store the registration details
import LoginD from '../models/LoginD.js';



// creation of the event  for the POST feature:
// creating of the new user event details 
export const createEvent = async (req, res) => {

    // user need to give these details while posting the data from the request-body
    const { eventname, amountrange, eventdate, foodcatering,
        peopleattendance, eventlocation, eventtime } = req.body;


    // logic to check wheather given date is in the future or not
    const eventDate = new Date(eventdate);
    const currentDate = new Date();
    // if not then give error
    if (eventDate < currentDate) {
        return res.status(400).json({ error: "event date should be greater than current date" });
    }


    try {

        eventlocation = eventlocation.toLowerCase();
        // Creation of the new user with the event deatils 
        const event = new Event({
            amountrange,
            eventname,
            foodcatering,
            peopleattendance,
            eventlocation,
            userId: req.user.id,
            eventdate,
            eventtime
        });

        // save them in the Event collection
        await event.save();

        console.log(event);
        console.log(req.user.id);
        console.log(req.user.role);

        res.status(200).json({ event });

    }

    // if any internal errors occurs the those events are handled by catch block.
    catch (err) {
        res.status(400).json({ error: err.message });

    }


};





// creation of the new evennneedlocation for the user 
// A route handler function to deal with storing of the event location which wanted by the user

export const loc = async (req, res) => {

    // user need to give these details while post request has  a user not admi from the request-body
    const { eventneedlocation } = request.body;

    try {

        // after user given the location under his name create the new Event location
        const event = new EventLoc({
            eventneedlocation,
            userId: req.user.id
        });

        console.log(req.user.id);

        // and save
        await event.save();
        res.send(event);

    }

    // if any internal errors occurs the those events are handled by catch block.
    catch (err) {
        res.status(400).send({ message: "getting the error while giving the event location" })
    }

}







// get the all events , which was created by the eventManager if he logged in has the admin
// If his logged in has the user then get all the location matched event details
export const gettheevent = async (req, res) => {

    try {

        const isadmin = req.user.role === 'admin';

        if (isadmin) {
            const event = await Event.find({ userId: req.user.id, });
            res.json(event);
        }
        else {
            // here else part if for the user

            // to search for the event where user wanted the event to be done
            const loc = await EventLoc.find({});

            // if location not found give error
            if (!loc) {
                return res.status(404).send({ message: "please give the location name where you want the event to be done" })
            }

            console.log(req.user.id);
            console.log(loc);

            let t = loc[loc.length - 1].eventneedlocation;
            console.log(t)


            const loc1 = t.toLowerCase();
            // if location found then get all the location matched event details
            const event1 = await Event.find({ eventlocation: loc1 })

            // give error if location not found
            if (!event1) {
                return res.status(404).send({ message: "location not matched" })
            }

            res.send(event1);



            console.log(res.user.id);
            console.log(loc)
            res.json(event);
        }

    }

    // if any internal errors occurs the those events are handled by catch block.
    catch (err) {
        res.status(400).json({ error: err.message });
    }

};







// Handler Function for the event book 
// A post feature for the booking of the event by the user only
export const eventbook = async (req, res) => {


    // user need to give these details while booking the event  from the request-body
    const { eventStatus } = req.body;

    try {

        // to get the all event details of the event-id which user given in the URL 
        const event = await Event.findById(req.params.id);

        console.log(event);

        req.send(event);


        const e = event.userId;

        console.log(e)
        // By the userId , quey the database to find the Event Manganer details
        const user = await LoginD.findById(e);

        console.log(user);

        const eventname = event.eventname;

        const eventdate = event.eventdate;

        const eventlocation = event.eventlocation;

        const amountrange = event.amountrange;

        const eventtime = event.eventtime;

        const foodcatering = event.foodcatering;

        const peopleattendance = event.peopleattendance;


        const eventManager = user.username;

        const eventManagerEmail = user.email;

        console.log(req.user.id);

        // by using the user id to find which user was booked the event
        const n = await LoginD.findById(req.user.id);

        console.log(n);

        const eventBookedBy = n.username;
        const email = n.email;

        console.log({
            eventManager, eventManagerEmail, eventname, eventdate, eventlocation, amountrange, eventtime, foodcatering, peopleattendance, eventBookedBy, email

        })

        // By using all the event details and eventManger details and event booking status and user details  create a new user 
        const com = new EMB({

            eventManager,
            eventManagerEmail,
            eventname,
            eventdate,
            eventlocation,
            amountrange,
            eventtime,
            foodcatering,
            peopleattendance,
            eventStatus,
            eventBookedBy,
            email

        })


        // save the newly created event in the EMB Collection
        await com.save();
        console.log(com);
        res.send(com);



    }

    // if any internal errors occurs the those events are handled by catch block.

    catch (err) {
        res.status(400).send({ error: err.message });
    }

};









// to get the event by id :

// getting all the event details Which was created by the Event-Manager has an admin role

export const gettheeventbyid = async (req, res) => {


    try {

        // user need to send the event id in URL and by using it , querying the Event collection.
        const event = await Event.findById(req.params.id);

        // if event not found then give error
        if (!event || event.userId.toString() !== req.user.id) {
            return res.status(400).json({ error: "event not found" });
        }
        res.json(event);


    }

    // if any internal errors occurs the those events are handled by catch block.
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}







// update a particular event posted by the event Manager:

export const updateevent = async (req, res) => {


    // user need to give these details which he want to update from the request-body
    const { eventname, eventdate, foodcatering,
        peopleattendance, eventlocation, eventtime, amountrange }
        = req.body;


    // logic to check wheather given updated date is in the future or not
    const eventDate = new Date(eventdate);
    const currentDate = new Date();

    // If not then give the error
    if (eventDate <= currentDate) {
        return res.status(400).json({ error: "event date should be greater than current date" });
    }





    try {

        // finding  the event details which from Event Collections by the id which was given by the user in the URL
        const event = await Event.findByIdAndUpdate(req.params.id)

        // if event not found then give the error
        if (!event || event.userId.toString() !== req.user.id) {
            return res.status(404).json({ error: "Event Not found" });
        }

        // find wheather the event  details are present or not , if present then update it 
        if (eventname) {
            event.eventname = eventname;
        }

        if (eventdate) {
            event.eventdate = eventdate;
        }

        if (peopleattendance) {
            event.peopleattendance = peopleattendance;
        }

        if (eventlocation) {
            event.eventlocation = eventlocation;
        }

        if (foodcatering) {
            event.foodcatering = foodcatering;
        }

        if (eventtime) {
            event.eventtime = eventtime;
        }

        if (amountrange) {
            event.amountrange = amountrange;
        }

        // after updating the save the details 
        const updatedevent = await event.save();
        res.json(updatedevent);

    }

    // if any internal errors occurs the those events are handled by catch block.
    catch (err) {
        res.status(400).json({ error: err.message });

    }

};








// delete the event by id:
// Delete the Event  whose event id was given by the admin, in the URL 
export const deleteevent = async (req, res) => {

    try {

        // To check wheather the given event-id is present in the Event Collection or not
        const event = await Event.findById(req.params.id);

        // if the id was not present then return the Error 
        if (!event || event.userId.toString() !== req.user.id) {
            return res.status(404).json({ error: 'event not found' });

        }

        //  If the user event is found
        await event.deleteOne();

        res.json({ message: 'event deleted' });

    }

    // if any internal errors occurs the those events are handled by catch block.
    catch (err) {
        res.status(400).json({ error: err.message });
    }

};

