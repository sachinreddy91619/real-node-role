//const mongoose=require('mongoose');
import  mongoose from 'mongoose';
const eventschema=new mongoose.Schema({

    amountrange:{
        type:Number
    },

    eventname:{

   type:String,required:true
    },
    eventdate:{
        type:String , // This will set today's date as the default value

        required:true
    },

    foodcatering:{
        type:String
    },
    peopleattendance:{
        type:Number,
        required:true
    },
    eventlocation:{
        type:String,
        required:true
    },
    eventtime:{
        type:String,
        required:true
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'LoginD', required: true },


});



//module.exports=mongoose.model('Event',eventschema);
export default mongoose.model('Event',eventschema);
