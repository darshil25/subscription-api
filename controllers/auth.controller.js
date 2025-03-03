import mongoose from "mongoose"
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Create New user
    const { name, email, password } = req.body;

    // check if user exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error('User already Exist');
      error.statusCode = 409;
      throw error;
    }

    // Hash password for new User
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create([{ name, email, password: hashPassword }], { session });

    const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: 'User created Successfully',
      data: {
        token,
        user: newUser[0]
      }
    })

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
}


export const signIn = async (req, res, next) => {

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    const isPsswordValid = await bcrypt.compare(password, user.password); //this will first hash password that we get from body -> compare that hash with db's stored hash -> return true or false based on that
    if (!isPsswordValid) {
      const error = new Error('Incorrect Password');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(200).json({
      success: true,
      message: 'Signed In Successfully',
      data: {
        token,
        user: user
      }
    })
  } catch (error) {
    next(error);
  }
}


export const signOut = (req, res, next) => {

}