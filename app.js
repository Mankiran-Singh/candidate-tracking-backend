const express=require('express');
const cors=require('cors');
const authRouter=require('./Routes/authRouter');
const interviewRouter=require('./Routes/interviewRouter')
const CustomError = require('./utils/customError');
const globalErrorHandler=require('./Controllers/errorController')

let app=express();

app.use(express.json());

app.use(cors());

app.use('/auth',authRouter)
app.use('/interview',interviewRouter)

app.all('*',(req,res,next)=>{
        const err=new CustomError(`can't find ${req.originalUrl} on the server!`,404)
        next(err); //express will forget about other middlewares and put this middleware in middleware stack(global error handling) 
    });
    
app.use(globalErrorHandler)  

 module.exports=app;