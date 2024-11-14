import { catchAsyncError } from "../Middlewares/catchAsyncError.js";
import ErrorHandler from "../Middlewares/error.js";
import { User } from "../Models/user.model.js";
import { OTP } from "../Models/otp.model.js";
import nodemailer from 'nodemailer';
import speakeasy from 'speakeasy';

export const getOtp = catchAsyncError(async(req, res, next) => {
    const {email} = req.body;
    if(!email){
        return new ErrorHandler("Email is required", 400);
    }
    const isEmail = await User.findOne({email});
    if(isEmail) {
        return next(new ErrorHandler("Email already Exists"));
    }
    // Generate OTP
    const otpSecret = speakeasy.generateSecret().base32;
    const otp = speakeasy.totp({
        secret: otpSecret,
        step: 600 // OTP is valid for 1 second
    });

    // Calculate OTP expiry time
    const expiryTime = new Date();
    expiryTime.setTime(expiryTime.getTime() + 600000); // 10 min from now

    // Save OTP in the database
    const otpDoc = await OTP.create({ email, otpValue: otp, expiryTime, otpSecret });
    // Send OTP to user's email
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
        subject: 'OTP Verification',
        text: `Your OTP is: ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return next(new ErrorHandler('Failed to send OTP'));
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.status(200).json({
        success: true,
        message: "Otp Sent Successfully",
        otpDoc
    });
});
