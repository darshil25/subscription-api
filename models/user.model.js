import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    minLength: 8,
    maxLength: 15
  }
}, {timestamps: true})

const User = mongoose.model('User', userSchema);

export default User;