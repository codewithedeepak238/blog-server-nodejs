import { Router } from "express";
import { getAllBlogs, getSingleBlog } from "../../controller/blog.controller";

const customerBlogRouter = Router();

customerBlogRouter.get("/blogs", getAllBlogs);
customerBlogRouter.get("/blog/:id", getSingleBlog);


// Write Comment
// customerBlogRouter.patch("/blog/:id", addComment);


export default customerBlogRouter;