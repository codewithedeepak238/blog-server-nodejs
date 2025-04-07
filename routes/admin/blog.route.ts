import { createBlog, deleteBlog, updateBlog } from "../../controller/blog.controller";
import { Router } from "express";
import upload from "../../middleware/upload";

const blogRouter = Router();

blogRouter.post("/create-blog", upload.single("banner"), createBlog);
blogRouter.patch("/update-blog/:id", upload.single("banner"), updateBlog);
blogRouter.delete("/remove-blog/:id", upload.single("banner"), deleteBlog);

export default blogRouter;