import mongoose, { Schema, Document } from 'mongoose'

export interface IProject extends Document {
  title: string
  slug: string
  coverImage: {
    alt: string
    imageUrl: string
  }
  description: string | null
  technologies: string[]
  projectUrl: string | null
  createdAt: Date
  updatedAt: Date
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    coverImage: {
      alt: { type: String, default: '' },
      imageUrl: { type: String, required: true },
    },
    description: { type: String, default: null },
    technologies: [{ type: String }],
    projectUrl: { type: String, default: null },
  },
  { timestamps: true }
)

export default mongoose.models.Project ||
  mongoose.model<IProject>('Project', ProjectSchema)
