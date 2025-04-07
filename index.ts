import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import connectToMongoDB from "./config/connection";
import blogRouter from "./routes/admin/blog.route";
import customerBlogRouter from "./routes/customer/blog.route";

dotenv.config();

const app = express();


//Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({extended: true, limit: '10mb'}));



//Main routes
app.all("/", (req, res, next) => {
    res.send("Hello from Boomzo Blogs")
});

app.use('/api/v1/admin', blogRouter);
app.use('/api/v1/customer', customerBlogRouter);

const PORT = process.env.PORT || 3500;

//MonogoDB Connections
connectToMongoDB().then(()=>{
    app.listen(PORT, () => { console.log(`Server running on ${PORT}`);});
});