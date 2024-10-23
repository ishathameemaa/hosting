import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";

import usermodel from "./models/usermodel.js";
import 'dotenv/config.js'
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRoute.js";
import { fileURLToPath } from 'url';
import path from 'path';


//app config
const app = express();
const port = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//middleware

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, './public')));
// DB connection
connectDB();
  // API endpoints
  app.use("/api/food", foodRouter);
  app.use("/image",express.static('upload'))
  // app.use("/api/user",usermodel)
  app.use("/api/user",userRouter)
  app.use("/api/cart",cartRouter)
  app.use("/api/order",orderRouter)

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'index.html'));
});
  // app.get("/", (req, res) => {
  //   res.send("API Working");
  // });

app.listen(port,()=>{
  console.log(`server started on http://localhost:${port}`);
  
})

