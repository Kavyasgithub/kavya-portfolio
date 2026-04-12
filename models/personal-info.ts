import mongoose, { Schema, Document } from 'mongoose'

export interface IPersonalInfo extends Document {
  name: string
  bio: string | null
  socialLinks: Array<{
    platform: string
    url: string
  }>
}

const PersonalInfoSchema = new Schema<IPersonalInfo>({
  name: { type: String, required: true },
  bio: { type: String, default: null },
  socialLinks: [
    {
      platform: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
})

export default mongoose.models.PersonalInfo ||
  mongoose.model<IPersonalInfo>('PersonalInfo', PersonalInfoSchema)
