import mongoose, { Schema, Document } from "mongoose";

// 1. Define rich content block types
export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: number; text: string }
  | { type: "image"; url: string; alt?: string }
  | { type: "code"; language: string; code: string }
  | { type: "list"; ordered: boolean; items: string[] };

// 2. Define main Blog interface
export interface IBlog extends Document {
  blog_id: string;
  title: string;
  banner?: string;
  des?: string;
  content?: ContentBlock[];
  tags?: string[];
  draft?: boolean;
  publishedAt?: Date;
}

// 3. Define Mongoose schema (with generic for flexibility)
const contentBlockSchema = new Schema<ContentBlock>(
  {
    type: { type: String, required: true },
  },
  { _id: false, strict: false } // allows flexible shape per content type
);

const blogSchema: Schema = new Schema<IBlog>(
  {
    blog_id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    banner: { type: String },
    des: { type: String, maxlength: 200 },
    content: [contentBlockSchema], // array of content blocks
    tags: [String],
    draft: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: "publishedAt",
    },
  }
);

blogSchema.index({
  title: "text",
  des: "text",
  tags: "text",
});

export default mongoose.model<IBlog>("blogs", blogSchema);
