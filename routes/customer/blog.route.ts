import { Router } from "express";
import { getAllBlogs, getSingleBlog } from "../../controller/blog.controller";

const customerBlogRouter = Router();

customerBlogRouter.get("/blogs", getAllBlogs);
customerBlogRouter.get("/blog/:id", getSingleBlog);


export default customerBlogRouter;