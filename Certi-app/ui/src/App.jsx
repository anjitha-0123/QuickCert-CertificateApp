import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Issuecertificate from './pages/Issuecertificate';
import ViewCertificate from './pages/Viewcertificate'
import CertificatePage from './pages/Certificate';


function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/issuecertificate' element={<Issuecertificate/>}/>
        <Route path="/viewcertificate" element={<ViewCertificate />} />
        <Route path="/certificate/:id" element={<CertificatePage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App