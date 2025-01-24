//const Event=require('../models/Event');

import Event from '../models/Event.js';

// creation of the event  for the POST feature:
export const createEvent=async(req,res)=>{
    const {eventname,amountrange,eventdate,foodcatering,
        peopleattendance,eventlocation,eventtime}=req.body;

            const eventDate= new Date(eventdate);
            const currentDate=new Date();
            if(eventDate<currentDate){
                return res.status(400).json({error:"event date should be greater than current date"});
            }


        try{
            const event=new Event({
                amountrange,
                eventname,
                foodcatering,
                peopleattendance,
                eventlocation,
                userId: req.user.id,
                eventdate,
                eventtime
            });
            await event.save();
            res.status(200).json({event});

            console.log(event);
            console.log(req.user.id);
            console.log(req.user.role);
        }catch (err){
            res.status(400).json({error:err.message});

        }


};


// get the all events:

export const gettheevent=async(req,res)=>{
    try{

        const isadmin=req.user.role==='admin';

        if(isadmin){
            const event=await Event.find({userId: req.user.id,});
            res.json(event);
        }
        else{
            const event=await Event.find({});
            res.json(event);
        }

    }catch(err){
        res.status(400).json({error:err.message});
    }
};



// to get the event by id :

export const gettheeventbyid=async(req,res)=>{


    try{

        const event=await Event.findById(req.params.id);

        // if(!event ||event.userId.toString()!==req.user.id){
        //     return res.status(400).json({error:"event not found"});
        // }
        res.json(event);


    }catch(err){
        res.status(400).json({error:err.message});
    }
}







// update a particular event :
export const updateevent=async(req,res)=>{

    const {eventname,eventdate,foodcatering,
        peopleattendance,eventlocation,eventtime}=req.body;

        const eventDate= new Date(eventdate);
        const currentDate=new Date();
        if(eventDate<currentDate){
            return res.status(400).json({error:"event date should be greater than current date"});
        }





        try{

            const event=await Event.findByIdAndUpdate(req.params.id)


            if(!event||event.userId.toString()!==req.user.id){
                return res.status(404).json({error:"Event Not found"});}

                if(eventname){
                    event.eventname=eventname;
                }

                if(eventdate){                
                    event.eventdate=eventdate;
                }               

                if(peopleattendance){                
                    event.peopleattendance=peopleattendance;
            }

            if(eventlocation){                
                event.eventlocation=eventlocation;
            }            

            if(foodcatering){                
                event.foodcatering=foodcatering;
            }

            if(eventtime){                
                event.eventtime=eventtime;
            }

            const updatedevent=await event.save();
            res.json(updatedevent); 

        } catch(err){
            res.status(400).json({error:err.message});

        }



}



// delete the event by id:
export const deleteevent=async(req,res)=>{
    try{
        const event=await Event.findById(req.params.id);
        if(!event ||event.userId.toString()!==req.user.id){
            return res.status(404).json({error:'event not found'});

            }
        await event.deleteOne();

        res.json({message:'event deleted'});

    }catch(err){
        res.status(400).json({error:err.message});

    }
}