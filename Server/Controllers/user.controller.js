import { catchAsyncError } from "../Middlewares/catchAsyncError.js";
import ErrorHandler from "../Middlewares/error.js";
import { User } from "../Models/user.model.js";
import {OTP} from "../Models/otp.model.js";
import {sendToken} from "../Utils/jwt.token.js";
import nodemailer from 'nodemailer';
import bcryptjs from "bcryptjs";

export const Signup = catchAsyncError(async (req, res, next) => {
    const { username, email, password, otp, mobile }= req.body;
    if( !username || !email || !password || !otp || !mobile ){
        return next(new ErrorHandler("Please fill full registration form"));
    }
    const isEmail = await User.findOne({email});
    if(isEmail) {
        return next(new ErrorHandler("Email already Exists"));
    }
    const otpDoc = await OTP.findOne({ email });

    if (!otpDoc) {
        return next(new ErrorHandler("OTP not found"));
    }
    // Verify OTP value
    if (otp !== otpDoc.otpValue) {
        return next(new ErrorHandler("Invalid OTP"));
    }
    // Verify OTP expiry time (optional, depending on your requirements)
    if (otpDoc.expiryTime < Date.now()) {
        return next(new ErrorHandler("OTP expired"));
    }
    const user = await User.create({
        username,email,password,mobile
    });
    res.status(200).json({
        success: true,
        message: "User Registered Successfully",
        user
    });
    
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Welcome to Our Expense Tracker!',
        html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
        
            .welcome-container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            }
        
            h1 {
              color: #333;
              font-size: 1.5rem;
              margin-bottom: 10px;
            }
        
            p {
              color: #555;
              line-height: 1.6;
              margin-bottom: 15px;
            }
        
            .thank-you {
              color: #333;
              font-weight: bold;
            }
        
            .signature {
              color: #777;
            }
          </style>
        </head>
        
        <body>
          <div class="welcome-container">
            <h1>Welcome to Expense Tracker!, ${username}!</h1>
            <p>Welcome to Expense Tracker! We are thrilled to have you join our community. Your registration marks the beginning of an exciting journey towards better productivity and organization.</p>
            <p>With Expense Tracker, you can manage your tasks efficiently, set reminders, and stay on top of your priorities. Whether it's personal goals or professional projects, Expense Tracker is here to help you stay organized and focused.</p>
            <p class="thank-you">Thank you for choosing Expense Tracker. We're committed to providing you with the best tools and support to help you achieve your goals and make the most out of every day.</p>
            <p>If you have any questions or need assistance, don't hesitate to reach out to our support team. We're here to help you every step of the way.</p>
            <p class="signature">Best regards,<br>Expense Tracker</p>
          </div>
        </body>
        
        </html>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return next(new ErrorHandler('Failed to send mail'));
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

});

export const Signin = catchAsyncError(async(req, res, next)=>{
    const { email, password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please Provide Email and Password",400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Email and Password",400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if( !isPasswordMatched ) {
        return next(new ErrorHandler("Invalid Email and Password",400))
    }
    sendToken(user, 200, res,"Logged In Successfully")
});

export const google = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});
    if (user) {
        sendToken(user, 200, res,"Logged In Successfully")
    } 
    else {
        const generatedPassword =
            Math.random().toString(36).slice(-8);
        const newUser = new User({
            username:
                req.body.username.split(' ').join('').toLowerCase() +
                Math.random().toString(10).slice(-3),
            email: req.body.email,
            password: generatedPassword,
            avatar: req.body.avatar,
        });
        await newUser.save();
        sendToken(newUser, 200, res,"Logged In Successfully")
    }
});

export const Signout = catchAsyncError(async(req, res, next)=>{
    res.status(201).cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "User Logged Out Successfully"
    })
});

export const updateAvatar = catchAsyncError(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user.id, { avatar: `/uploads/${req.file.filename}` }, { new: true });
  
    res.status(200).json({
      success: true,
      message: "Avatar updated successfully",
      user
    });
});

export const updateProfile = catchAsyncError(async (req, res, next) => {
    const { username } = req.body;
  
    const user = await User.findByIdAndUpdate(req.user.id, { username }, {
      new: true,
      runValidators: true,
    });
  
    res.status(200).json({
      success: true,
      message: 'Profile Details Updated Successfully',
      user,
    });
});

export const protectedMode = catchAsyncError(async(req,res,next)=>{
    res.status(200).json({
        success: true,
        message: 'This is a protected route',
    });
})