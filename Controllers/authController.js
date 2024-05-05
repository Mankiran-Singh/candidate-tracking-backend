const User=require('./../models/AuthModel');
const asyncErrorHandler=require('./../utils/asyncErrorHandler')
const jwt=require('jsonwebtoken');


const signToken=id=>{
   return jwt.sign({id},process.env.SECRET_STR,{
      expiresIn:process.env.LOGIN_EXPIRES
  })
}

exports.signup=asyncErrorHandler(async (req,res,next)=>{
   const newUser=await User.create(req.body);
   const token=signToken(newUser._id)
 
   res.status(201).json({
      status:'success',
      data:{
        token,
        user:newUser
      }
   });
})

exports.login=asyncErrorHandler(async(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    
    if(!email || !password){
       const error=new CustomError("Please provide email and password for logging in",400);
       return next(error);
    }
   
    const user=await User.findOne({ email }).select('+password');

    if(!user || !(await user.comparePasswordInDB(password,user.password))){
       const error=new CustomError("Correct email or password",404)
       return  next(error);
    }
    
    const token=signToken(user._id);
    res.status(200).json({
       status:'success',
       data:{
          token,
          name:user.name,
          role:user.role
        
       }
    })
})

