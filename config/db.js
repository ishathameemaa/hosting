import mongoose from "mongoose";
export const connectDB = async ()=>{
  await mongoose.connect('mongodb+srv://ishathameema:tNEyn513xJdvj0yW@cluster0.txuj5ri.mongodb.net/food-deliver').then(()=>console.log("DB connected"));
  

}