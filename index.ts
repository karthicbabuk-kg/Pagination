import express from "express";
import dotenv from "dotenv";
import userRoutes from './src/routes/userRoutes';


dotenv.config();

const app=express();

app.use('/api',userRoutes)



app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});

