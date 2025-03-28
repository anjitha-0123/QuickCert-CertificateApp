import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {User} from '../Model/signup.js';


const userauth1=Router();


userauth1.post('/signup',async(req,res)=>{
    try{
        const { name, email, password } = req.body;


        const existingUser = await User.findOne({ email });
        if(existingUser){
            res.status(400).send("UserName Alredy Exist")    //sending the response back to the client by using res and send is a method
            console.log("Username Alredy EXist");
        }
        else{
           const newPassword=await bcrypt.hash(password,10);
           console.log(newPassword);

           const newUser=new User({
            name:name,
            email:email,
            password:newPassword,
            

        });
        await newUser.save();
        res.status(201).send("Signup Successfull")
        console.log("signed Up")

        }
    }
    catch(error)
    {   console.log(error);
    
        res.status(500).send("Internal Server Error")
    }

})

userauth1.post('/login',async(req,res)=>{
    try{
        const{email,password}=req.body;
        console.log(email);
        
        
        const result=await User.findOne({email:email})
        console.log("hi");
        console.log(result);
        
        if(!result){
            res.status(200).send("Username Invalid");
        }
        else{
            console.log(result.password);
            const valid=await bcrypt.compare(password,result.password);
            console.log(valid);
            if(valid){
                console.log(email);
                
                const token=jwt.sign({Email:email},process.env.SECRET_KEY,{expiresIn:'1h'});
                console.log(token);

                res.cookie('TokenAuth',token,{
                    httpOnly:true
                });
                res.status(200).json({message:"Loggedin Successfully"})
            }
            else{
                res.status(401).send("Unautherised Access")
            }
        }
    }
    catch{
        res.status(500).send("Internal Server Error")
    }
    
});

userauth1.get('/logout',(req,res)=>{
    res.clearCookie('TokenAuth');
    res.status(200).json({msg:"Successfully Logged Out"})
})


export {userauth1}