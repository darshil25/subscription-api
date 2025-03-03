import mongoose from "mongoose";

const userSchema = new mongoose.Schema({ //creating schema
  name: {
    type: String, 
    required: [true, 'User Name is required'],
    trim: true,
    minLength: 2,
    maxLength: 50
  },
  email: {
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'] // {'\' -> start , S -> String , + -> adding }
  },
  password: {
    type: String, 
    required: [true, 'Email is required'],
    minLength: 8, //since we are encrypting via hashing we do not need this min and max for password this thing can be done for input handling instead of db verification
  }
}, {timestamps: true})

const User = mongoose.model('User', userSchema); //creating model with userSchema

export default User;