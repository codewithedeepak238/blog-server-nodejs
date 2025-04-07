import { createBlog, deleteBlog, updateBlog, uploadContentImage, getAllBlogs, getSingleBlog, getDraftBlogs } from "../../controller/blog.controller";
import { Router } from "express";
import upload from "../../middleware/upload";
import { auth } from "../../middleware/auth";

const blogRouter = Router();

//Create Blog
blogRouter.post("/create-blog", auth, upload.single("banner"), createBlog);

//Update Blog
blogRouter.patch("/update-blog/:id", auth, upload.single("banner"), updateBlog);

//Delete Blog
blogRouter.delete("/remove-blog/:id", auth, deleteBlog);

//To upload images from the content
blogRouter.post("/editor-image", auth, upload.single("image"), uploadContentImage);

//Get All Blogs
blogRouter.get("/blogs", auth, getAllBlogs);

//Get Single Blog
blogRouter.get("/blog/:id", auth, getSingleBlog);

//Get Draft Blogs
blogRouter.get("/blogs/draft", auth, getDraftBlogs);


export default blogRouter;