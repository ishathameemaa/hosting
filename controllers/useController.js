import usermodel from "../models/usermodel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


//login user
const loginUser = async (req,res)=>{
  const {email,password}= req.body;
  try {
    const user = await usermodel.findOne({email})
    if (!user) {
      return res.json({success:false,message:" User Doesn't exist"})
      
    }
    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
      return res.json({success:false,message:"Invalid crendentials "})
    }
    const token = createToken(user._id);
    res.json({success:true,token})
    
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
    
  }
}
const createToken =(id) => {
  return jwt.sign({id},process.env.JWT_SECRET)
}

//regstr user
const registerUser = async (req,res)=>{  
    const {name,password,email} = req.body
    try {
      //checking is user is already exits
      const exists = await usermodel.findOne({email})
      if(exists){
        return res.json({success:false,message:"user already exists"})
      }

      //validity email format & strong password

      if(!validator.isEmail(email)){
        return res.json({success:false,message:'please enter a  valid email'})

      }
      if (password.length<8) {
        return res.json({success:false,message:'please enter a strong password'})
        
      }
      //hashing user password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password,salt)
      const newUser = new usermodel({
        name:name,
        email:email,
        password:hashedPassword
      });

      const user = await newUser.save()
     const token = createToken(user._id)
      res.json({success:true,token})
    } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"})
      
      
    }

}
export {loginUser,registerUser}

