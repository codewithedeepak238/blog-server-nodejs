import { Request, Response } from "express";
import blogModel from "../model/blog.model";
import slugify from "../utils/slugify";


// Create Blog, Body: banner, title, des, content, tags, draft
export const createBlog = async (req: Request, res: Response) => {
    try {
        const { title, des, content, tags, draft } = req.body;

        // ✅ Multer-S3 adds `.location` with the public S3 URL
        const banner = (req.file as any)?.location;

        if (!title || !content) {
            res.status(400).json({ message: "Title and content are required." });
            return
        }

        const parsedContent = typeof content === "string" ? JSON.parse(content) : content;
        const blog_id = `${slugify(title)}-${Math.random().toString(36).substring(2, 6)}`;

        const existing = await blogModel.findOne({ blog_id });
        if (existing) {
            res.status(409).json({ message: "A blog with this title already exists." });
            return
        }

        const blog = await blogModel.create({
            blog_id,
            title,
            des,
            content: parsedContent,
            tags,
            draft,
            banner, // ✅ Store image URL
        });

        res.status(201).json({ message: "Blog created successfully", blog });
    } catch (error: any) {
        console.error("Error creating blog:", error);
        res.status(500).json({ message: "Failed to create blog", error: error.message });
    }
};


// Delete Blog
export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: "Pass blog Id in params." });
            return
        }

        const existing = await blogModel.findOne({ blog_id: id });


        if (!existing) {
            res.status(400).json({ message: "This blog doesn't exist." });
            return
        }

        await blogModel.deleteOne({ blog_id: id });

        res.status(201).json({ message: "Blog removed successfully" });
    }
    catch (error: any) {
        console.error("Error creating blog:", error);
        res.status(500).json({ message: "Failed to create blog", error: error.message });
    }
}

//Update Blog
export const updateBlog = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: "Pass blog Id in params." });
            return
        }

        const existingBlog = await blogModel.findOne({ blog_id: id });

        if (!existingBlog) {
            res.status(404).json({ message: "Blog not found" });
            return;
        }

        // Optional new banner
        const banner = (req.file as any)?.location;

        const {
            title,
            des,
            content,
            tags,
            draft,
        }: {
            title?: string;
            des?: string;
            content?: any;
            tags?: string[];
            draft?: boolean;
        } = req.body;

        if (title) {
            existingBlog.title = title;
            existingBlog.blog_id = slugify(title); //If title is change update the blog id
        }

        if (des !== undefined) existingBlog.des = des;
        if (draft !== undefined) existingBlog.draft = draft;
        if (tags !== undefined) existingBlog.tags = tags;
        if (banner) existingBlog.banner = banner;

        if (content) {
            existingBlog.content = typeof content === "string" ? JSON.parse(content) : content;
        }

        await existingBlog.save();

        res.status(201).json({ message: "Blog updated successfully", blog: existingBlog });
    }
    catch (error: any) {
        console.error("Error creating blog:", error);
        res.status(500).json({ message: "Failed to update blog", error: error.message });
    }
}


//Upload content image
export const uploadContentImage = async (req: Request, res: Response) => {
    try {
        const imageUrl = (req.file as any)?.location;

        if (!imageUrl) {
            res.status(400).json({ success: 0, message: 'Image upload failed' });
            return
        }

        res.json({
            success: 1,
            file: {
                url: imageUrl,
            },
        });
    }
    catch (error: any) {
        console.error("Error creating blog:", error);
        res.status(500).json({ message: "Failed to update blog", error: error.message });
    }
}