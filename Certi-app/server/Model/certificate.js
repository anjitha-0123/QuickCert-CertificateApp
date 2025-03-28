import { Schema } from "mongoose";
import{ model} from 'mongoose'
const Demo1 = new Schema({  
    coursename: { type: String, required: true },
    certificateid: { type: String, required: true, unique: true },
    candidatename: { type: String, required: true },
    grade: { type: String, required: true },
    date: { type: Date, required: true }
});

const Issue=model('certificate',Demo1) 
export {Issue}