import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

function Navbar() {
const navigate=useNavigate()
    const handleLogout = async () => {
        try {
          const response = await fetch("/logout", {
            method: "GET",
            credentials: "include",
          });
    
          if (response.ok) {
            navigate("/");
          } else {
            console.error("Logout failed");
          }
        } catch (error) {
          console.error("Error logging out:", error);
        }
      };
  return (
    <nav className="flex justify-between">
        <div><h1 className="text-3xl">QuickCert : A Certificate Dapp</h1></div> 
     <div className="flex"> 
         <p className="mr-6 text-xl"><Link to='/viewcertificate'>Home</Link></p>
         <button className="mr-3 text-xl bg-sky-400 w-50 h-8"><Link to="/issuecertificate">Issuecertificate</Link></button>
         <button className="mr-3 text-xl bg-sky-400 w-50 h-8" onClick={handleLogout}>Logout</button>

     </div>
 </nav>
  )
}

export default Navbar