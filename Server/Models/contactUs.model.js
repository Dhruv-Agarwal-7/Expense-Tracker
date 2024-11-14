import mongoose from 'mongoose';
import validator from 'validator';

const contactUsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, "Please Provide Your Email"],
        validate: [validator.isEmail, "Please Provide a Valid Email"]
    },
    message: {
        type: String,
        required: [true, "Please Provide Your Query"],
    }
}, { timestamps: true });

export const ContactUs = new mongoose.model('contactUs', contactUsSchema);