import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import image from '../assets/images/online-course.png'

function ViewCertificate() {
  const [certificateId, setCertificateId] = useState('');
  const [error, setError] = useState('');
  const navigate=useNavigate();

  const fetchCertificate = async () => {
    try {
      const res = await fetch(`/api/viewCertificate?CertificateId=${certificateId}`);
      const data = await res.json();
      if (res.ok) {
        navigate(`/certificate/${certificateId}`, { state: { certificateData: data.data } });
      } else {
        setError(data.msg);
      }
    } catch (err) {
      console.error('Error fetching certificate:', err);
      setError('Something went wrong!');
    }
  };
  

  return (
    <div>
     <Navbar></Navbar>
      <div className="w-3/4 h-[800px] bg-white ml-24 p-6">
        <h1 className="text-2xl font-bold text-center">View Certificate</h1>
        <img src={image} alt="Certificate Logo" className="size-32 mx-auto mt-3" />
        <div className="flex justify-center mt-6">
          <input
            type="text"
            placeholder="Enter Certificate ID"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-md"
          />
          <button
            onClick={fetchCertificate}
            className="ml-2 bg-blue-500 text-white p-2 rounded-md"
          >
            View
          </button>
        </div>
        
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      </div>
    </div>
  );
}

export default ViewCertificate;
