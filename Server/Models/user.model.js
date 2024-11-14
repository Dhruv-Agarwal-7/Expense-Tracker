import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        default: "user",
        enum: ["admin", "user"]
    },
    username: {
        type: String,
        required : [true, "Please Provide Your Username"],
        unique: [true,"Username already Exists"],
    },
    email: {
        type: String,
        unique: [true,"Email already Exists"],
        required : [true, "Please Provide Your Email"],
        validate: [validator.isEmail, "Please Provide a Valid Email"]
    },    
    mobile: {
        type: String,
        // unique: [true,"Mobile already Exists"],
        // required : [true, "Please Provide Your Mobile"]
    },
    password: { 
        type: String,
        required: [true, 'Password is Required'],
        minLength: [8, "Password must contain at least 3 characters"],
        maxLength: [32, "Password cannot exceed 32 characters"],
        select : false
    },
    avatar:{
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
},{timestamps: true});

//hashing the pasword
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//comparing passswrod
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

//generating a jwt token for authorization
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });
};

export const User = mongoose.model("User", userSchema);
