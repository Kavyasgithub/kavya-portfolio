// /sanity-studio/schemas/personalInfo.ts

import { defineField, defineType } from 'sanity'

// We define a 'personalInfo' schema type. This will be a singleton,
// meaning there will only ever be one document of this type in the dataset.
export default defineType({
  name: 'personalInfo',
  title: 'Personal Info',
  type: 'document',
  fields: [
    // --- Name Field ---
    // A simple string field for your full name.
    defineField({
      name: 'name',
      title: 'Your Name',
      type: 'string',
      description: "Your full name, as you'd like it to appear on the site.",
      validation: (Rule) => Rule.required(),
    }),

    // --- Bio Field ---
    // A 'text' field for a longer biographical description.
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      description: 'A brief biography about yourself.',
      rows: 5,
    }),

    // --- Social Links Field ---
    // An array of objects to store your social media links.
    // This demonstrates a more complex data structure.
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      description: 'Your social media profiles.',
      // The 'of' property specifies that this array can contain 'object' types.
      of: [
        {
          type: 'object',
          // Each object in the array will have these two fields.
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              description: 'e.g., GitHub, LinkedIn, Twitter',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              description: 'The full URL to your profile.',
            },
          ],
        },
      ],
    }),
  ],
})