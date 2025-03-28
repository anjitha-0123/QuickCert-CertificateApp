import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import image from '../assets/images/online-course.png';
import Navbar from '../components/Navbar';

function CertificatePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const certificateData = location.state?.certificateData;

  if (!certificateData) {
    return (
      <div>
        <Navbar />
        <div className="text-center mt-10">
          <p className="text-red-500 text-xl">No certificate data found.</p>
          <button className="mt-4 bg-blue-500 text-white p-2 rounded-md" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className="w-3/4 h-[800px] bg-white ml-24 p-6 text-center border-2 border-gray-300 ">
        <h2 className="text-2xl font-bold">Kerala Blockchain Academy</h2>
        <img src={image} alt="Certificate Logo" className="size-32 mx-auto mt-3" />
        <p className="mt-4">This is to certify that <b>{certificateData.candidatename}</b></p>
        <p className="mt-2">has successfully completed <b>{certificateData.coursename}</b></p>
        <p className="mt-2">with <b>{certificateData.grade}</b> on <b>{new Date(certificateData.date).toDateString()}</b></p>
      </div>
    </div>
  );
}

export default CertificatePage;
