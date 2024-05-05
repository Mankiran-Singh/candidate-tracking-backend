const Interview=require('./../models/InterviewModel')
const asyncErrorHandler=require('./../utils/asyncErrorHandler')
// const jwt=require('jsonwebtoken');
// const CustomError = require('./../utils/customError');
// const sendEmail=require('./../utils/email');
// const crypto=require('crypto');
// const util=require('util');


exports.addCandidate=asyncErrorHandler(async (req,res,next)=>{
   const newCandidate=await Interview.create(req.body);

   res.status(201).json({
      status:'success',
      data:{
        candidate:newCandidate
      }
   });
})

exports.getCandidates=asyncErrorHandler(async (req,res,next)=>{
   const candidates = await Interview.find();

   // Send the response with the candidate data
   res.status(200).json({
     status: 'success',
     data: {
       candidates: candidates
     }
   });
})

exports.deleteCandidate = asyncErrorHandler(async (req, res, next) => {
   const candidateId = req.params.id;
   const deletedCandidate = await Interview.findByIdAndDelete(candidateId);
  console.log(candidateId)
   if (!deletedCandidate) {
     return res.status(404).json({
       status: 'fail',
       message: 'Candidate not found'
     });
   }
 
   res.status(200).json({
     status: 'success',
     message: 'Candidate deleted successfully'
   });
 });

