import express,{json} from "express";
import dotenv from "dotenv";
import {userauth1} from "./Routes/userauth1.js";
import { adminauth } from "./Routes/adminauth.js";
import mongoose from "mongoose";

import cors from 'cors';
dotenv.config();
const app=express();

app.use(cors({
    origin:'*',
    credentials:true
}))

app.use(json())

app.use("/",userauth1)
app.use('/',adminauth)

app.listen(process.env.PORT,function(){
    console.log(`Server is listening at ${process.env.PORT}`)
});

mongoose.connect("mongodb://mongodb:27017/Certiapp").then(()=>{
    console.log("MongoDB connected successfully to Certiapp");})
    .catch((error)=>{
      console.error("MongoDB connection failed",error); 
    });



