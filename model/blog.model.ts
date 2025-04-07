import mongoose, { Schema, Document } from "mongoose";

// Editor.js block format
export interface EditorJsBlock {
  type: string;
  data: Record<string, any>;
}

export interface IBlog extends Document {
  blog_id: string;
  title: string;
  banner?: string;
  des?: string;
  content?: EditorJsBlock[];
  tags?: string[];
  draft?: boolean;
  publishedAt?: Date;
}

const contentBlockSchema = new Schema(
  {
    type: { type: String, required: true },
    data: { type: Schema.Types.Mixed, required: true },
  },
  { _id: false }
);

const blogSchema: Schema = new Schema<IBlog>(
  {
    blog_id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    banner: { type: String },
    des: { type: String, maxlength: 200 },
    content: [contentBlockSchema],
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
