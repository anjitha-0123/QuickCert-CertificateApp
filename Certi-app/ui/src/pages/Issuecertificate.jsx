import React, { useState } from 'react'
import Navbar from '../components/Navbar'

function Issuecertificate() {
  const [coursename,setCoursename]=useState('');
  const [certificateid,setCertificateid]=useState('');
  const [candidatename,setCandidatename]=useState('');
  const [grade,setGrade]=useState('');
  const [date,setDate]=useState('');

  const handleIssue=async(event)=>{
    event.preventDefault();
    try
    {
      const res=await fetch("/api/issueCertificate",{
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          CourseName: coursename,
          CertificateId: certificateid,
          CandidateName: candidatename,
          Grade: grade,
          Date:date }),
    });
    if(res.ok){
        alert("Certificate Added Successfully");
    }
    else {
      const errorData = await res.text();
      alert("Error: " + errorData);
      
    }   

    }
    catch (error) {
      console.error("Error:", error);
      alert("Something went wrong: " + error.message);
  }
  }
  
  return (
    <div>
      <Navbar></Navbar>
    <form className="bg-white border-2 border-inherit w-2/3 h-3/4 mt-8 ml-8" onSubmit={handleIssue} >
     <p className="text-2xl mt-7 ml-9">Issue New Certificate</p><br></br>

     <label  className="pl-7">Select Course *</label><br></br>
     <select required 
             id="coursename" 
             name="coursename" 
             value={coursename} 
             onChange={(e) => setCoursename(e.target.value)}
             className="mt-3 ml-7 w-96 h-12 border-2 border-black">
    <option value="" disabled>Select a Course</option>
    <option value="Certified Blockchain Associate">Certified Blockchain Associate</option>
</select>
<br></br><br></br>

     <label  className="pl-7">Certificate ID *</label><br></br>
     <input type="number" 
             id='certificateid'
             name='certificateid'
             value={certificateid}
             onChange={(event)=>setCertificateid(event.target.value)}
             placeholder="Certificate ID" 
             className="mt-3 ml-7 w-96 h-12 border-2 border-black"
             required/><br></br><br></br>

     <label  className="pl-7">Candidate name *</label><br></br>
     <input  type="text"
             id='candidatename'
             name='candidatename'
             value={candidatename}
             onChange={(event)=>setCandidatename(event.target.value)} 
             placeholder="candidatename" 
             className="mt-3 ml-7 w-96 h-12 border-2 border-black" 
             required/><br></br><br></br>

     <label  className="pl-7">Select Grade *</label><br></br>
     <select required 
            id="grade"
           name="grade"
           value={grade}
          onChange={(event) => setGrade(event.target.value)}
          className="mt-3 ml-7 w-96 h-12 border-2 border-black">
  <option value="" disabled>Select a Grade</option>
  <option value="OS">OS</option>
  <option value="A">A</option>
  <option value="B">B</option>
</select>
<br></br><br></br>

     <label  className="pl-7">Issue Date *</label><br></br>
     <input type="date" 
            id='date'
            name='date'
            value={date}
            onChange={(event)=>setDate(event.target.value)}
            className="mt-3 ml-7 w-96 h-12 border-2 border-black"
            required/><br></br><br></br><br></br>
 
 
     <button className=" w-52 h-12 bg-sky-400  rounded-md mb-12 ml-5">Issue Certificate</button>
 
 </form>
 </div>
  )
}

export default Issuecertificate