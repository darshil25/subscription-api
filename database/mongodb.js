import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if(!DB_URI){
  throw new Error('Please provide DB_URI in env file inside .env.<development / production>.local');
}

const connectToDb = async () => {
  try{
    await mongoose.connect(DB_URI);
    console.log(`'Connection was successfull' in  ${NODE_ENV} mode`)
  } catch (error) {
    console.error('Error connecting to DB', error)
    process.exit(1)
  }
}

export default connectToDb;