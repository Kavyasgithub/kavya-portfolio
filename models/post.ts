import mongoose, { Schema, Document } from 'mongoose'

export interface IPost extends Document {
  title: string
  slug: string
  excerpt: string | null
  mainImage: {
    alt: string
    imageUrl: string
  }
  publishedAt: Date
  author: {
    name: string
    picture: string
  }
  content: string // Markdown content
  createdAt: Date
  updatedAt: Date
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, default: null },
    mainImage: {
      alt: { type: String, default: '' },
      imageUrl: { type: String, required: true },
    },
    publishedAt: { type: Date, required: true },
    author: {
      name: { type: String, required: true },
      picture: { type: String, default: '' },
    },
    content: { type: String, required: true },
  },
  { timestamps: true }
)

export default mongoose.models.Post ||
  mongoose.model<IPost>('Post', PostSchema)
