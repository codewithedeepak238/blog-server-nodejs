import mongoose, { Schema, Document } from "mongoose";

/**
 * Editor.js Content Interface
 */
export interface EditorJsContent {
  time: number;
  version: string;
  blocks: {
    id?: string;
    type: string;
    data: Record<string, any>;
  }[];
}

/**
 * Blog Document Interface
 */
export interface IBlog extends Document {
  blog_id: string;
  title: string;
  banner?: string;
  des?: string;
  content: EditorJsContent;
  tags?: string[];
  draft?: boolean;
  publishedAt?: Date;
}

/**
 * Blog Schema
 */
const blogSchema: Schema<IBlog> = new Schema(
  {
    blog_id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    banner: { type: String },
    des: { type: String, maxlength: 200 },
    
    // Accept full Editor.js object as-is
    content: {
      type: Schema.Types.Mixed,
      required: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    draft: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "publishedAt",
      updatedAt: false,
    },
  }
);

// 🔍 Text index for search
blogSchema.index({
  title: "text",
  des: "text",
  tags: "text",
});

export default mongoose.model<IBlog>("blogs", blogSchema);
