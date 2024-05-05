const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');
const crypto=require('crypto');

const interviewSchema=new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Please enter name"]
  },
  interviewStatus:{
     type:String,
     required:[true,"Please enter interview status"],
  },
  interviewFeedback:{
    type:String,
    required:[true,"Please enter a interview feedback"], 
  },
  rating:{
    type:Number,
    required:[true,"Please rate the interview"],
  }
})


const Interview=mongoose.model('interviews',interviewSchema)
module.exports=Interview;