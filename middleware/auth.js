import jwt from "jsonwebtoken"
import  axios from 'axios'
const authMiddleWare = async(req,res,next)=>{
  const {token} = req.headers

  if(!token){
    return res.json({success:false,message:"Not Authorixed Login Again"})
  }
  try{
    const token_decode = jwt.verify(token,process.env.JwT_SECRET)
    req.body.userId= token_decode.id;
    next()
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"})
    
  }
}

export default authMiddleWare;