import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'

function Login() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');
    const navigate=useNavigate();

    const handleLogin=async (event)=>{
        event.preventDefault();
        try
        {
          const response=await fetch('/api/login',{
            method:'POST',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({ email, password }) 

          });
          const data=await response.json();

          if (!response.ok) {
            throw new Error(data.msg || 'Login failed');
          }
          else{
            navigate('/issuecertificate')
          }
      
        }
        catch (error) {
            setError(error.message || 'Invalid Credentials: Please try again!');
          }
    }

  return (
    <div className="flex justify-center">
        <form className="pt-7 pl-8 px-8 size-96 bg-sky-200 mt-9 rounded-lg shadow-md shadow-black " onSubmit={handleLogin}>
            <h2 className="text-center font-sans text-2xl font-semibold text-cyan-800 mt-9">Log In</h2>
            {error && <p className='text-red-500 mb-4'>{error}</p>}


            <label className="mt-5 ml-5">Email :</label><br></br>
            <input type="email"
                   id='email'
                   name='email'
                   value={email}
                   onChange={(event)=>setEmail(event.target.value)}
                   placeholder='Enter Email'
                   className=" bg-white mt-2 ml-5"
                   required /><br></br>

            <label className="mt-5 ml-5">Password :</label><br></br>
            <input type="password"
                   id='password'
                   name='password'
                   value={password}
                   onChange={(event)=>setPassword(event.target.value)}
                   placeholder='Enter Password'
                   className="bg-white mt-2 ml-5"  
                   required /><br></br>
            <button className="bg-black text-white w-20 rounded-md mt-6 ml-4 w-68 h-10">Login</button><br></br>
            <p className="mt-2 ml-5">Don't have an account ?<Link to="/signup" className="text-cyan-800 ">  Sign Up</Link></p>
 
        </form>
        
    </div>
  )
}

export default Login