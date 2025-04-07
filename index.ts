import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import connectToMongoDB from "./config/connection";
import blogRouter from "./routes/admin/blog.route";

dotenv.config();

const app = express();


//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));



//Main routes
app.all("/", (req, res, next) => {
    res.send("Hello from Boomzo Blogs")
});

app.use('/api/v1/admin', blogRouter);

const PORT = process.env.PORT || 3500;

//MonogoDB Connections
connectToMongoDB().then(()=>{
    app.listen(PORT, () => { console.log(`Server running on ${PORT}`);});
});