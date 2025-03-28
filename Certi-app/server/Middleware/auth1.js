import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

//authenticate is a middleware function
const authenticate=(req,res,next)=>{

    const cookie=req.headers.cookie;
    console.log(cookie);
    const cookies=cookie.split(';');
    let count=0;
    for(let cookie of cookies){
        const [name,token]=cookie.trim().split('=');

        if(name=='TokenAuth'){
            console.log(name);
            console.log(token);
            const verified = jwt.verify(token, process.env.SECRET_KEY);

           console.log(verified);
        //    const decoded=jwt.decode(token);
        //    console.log(decoded);
           
           //after verification these varified data have to used in another function so using req  stored in another names
           req.Email=verified.Email;
          
           count=1;
           next ();
           break;
    }
     //after authentication it will go into addCourse
    }
    if(count==0)
        {   
            res.status(401).json({ msg: "Unauthorized Access" });

       }
}
export{authenticate}






// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

// const authenticate = (req, res, next) => {
//   try {
//     if (!req.headers.cookie) {
//       return res.status(401).json({ error: "Unauthorized Access: No token provided" });
//     }

//     const cookies = req.headers.cookie.split(";").map((cookie) => cookie.trim());
//     let token = null;

//     for (const cookie of cookies) {
//       const [name, value] = cookie.split("=");
//       if (name === "TokenAuth") {
//         token = value;
//         break;
//       }
//     }

//     if (!token) {
//       return res.status(401).json({ error: "Unauthorized Access: No valid token found" });
//     }

//     try {
//       const verified = jwt.verify(token, process.env.SECRET_KEY);
//       req.Username = verified.UserName;
//       req.Userrole = verified.UserRole;
//       next();
//     } catch (error) {
//       return res.status(403).json({ error: "Invalid or Expired Token" });
//     }
//   } catch (error) {
//     console.error("Authentication Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export { authenticate };


