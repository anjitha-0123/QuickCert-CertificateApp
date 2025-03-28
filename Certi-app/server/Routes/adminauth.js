import { Router } from "express";
import { authenticate } from "../Middleware/auth1.js";
import { Issue } from "../Model/certificate.js";



const adminauth=Router();



adminauth.post('/issueCertificate',authenticate,async(req,res)=>{
    try{
        const {CourseName,CertificateId,CandidateName,Grade,Date}=req.body;
        console.log(CertificateId);

        const existingCertificate = await Issue.findOne({ certificateid: CertificateId });
        
        if(existingCertificate)
            {
            res.status(400).send("Bad request");
            }
        else{
            
            const newCertificate= new Issue({
                coursename:CourseName,
                certificateid:CertificateId,
                candidatename:CandidateName,
                grade:Grade,
                date:Date
            });
            await newCertificate.save();
            res.status(201).send("Certificate Issued")
            console.log("Certificate Issued");
            
        }
        
    }
    catch(error)
    {   
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
});

adminauth.get('/viewCertificate',authenticate,async(req,res)=>{
    const name=req.query.CertificateId;
    console.log(name);

    const Details=await Issue.findOne({certificateid:name})
    console.log(Details);
    
    try{
        if(Details){
            res.status(200).json({data:Details});
        }
        else
        {
            res.status(404).json({msg:'No such Certificate'})
        }
    
    }
    catch{
        res.status(500).send("Internal Server Error")
    }
   
});


export {adminauth}