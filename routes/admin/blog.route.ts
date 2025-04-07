import { createBlog, deleteBlog, updateBlog, uploadContentImage, getAllBlogs, getSingleBlog, getDraftBlogs } from "../../controller/blog.controller";
import { Router } from "express";
import upload from "../../middleware/upload";

const blogRouter = Router();

//Create Blog
blogRouter.post("/create-blog", upload.single("banner"), createBlog);

//Update Blog
blogRouter.patch("/update-blog/:id", upload.single("banner"), updateBlog);

//Delete Blog
blogRouter.delete("/remove-blog/:id", deleteBlog);

//To upload images from the content
blogRouter.post("/editor-image", upload.single("image"), uploadContentImage);

//Get All Blogs
blogRouter.get("/blogs", getAllBlogs);

//Get Single Blog
blogRouter.get("/blog/:id", getSingleBlog);

//Get Draft Blogs
blogRouter.get("/blog/:id", getDraftBlogs);


export default blogRouter;