// /sanity-studio/schemas/project.ts

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  // Here we define the fields for our 'project' document type.
  // Each object in this array corresponds to a field in the Sanity Studio form.
  fields: [
    // --- Title Field ---
    // A simple text input for the project's title.
    defineField({
      name: 'title', // The unique programmatic name for this field.
      title: 'Title', // The human-readable label shown in the Studio.
      type: 'string', // The data type for this field.
      description: 'The main title of the project.',
      validation: (Rule) => Rule.required(), // Makes this field mandatory.
    }),

    // --- Slug Field ---
    // A special field type for generating unique, URL-friendly strings.
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The unique URL segment for the project. Click "Generate" to create from title.',
      options: {
        // Automatically generate the slug from the 'title' field.
        source: 'title',
        maxLength: 96, // A reasonable max length for slugs.
      },
      validation: (Rule) => Rule.required(),
    }),

    // --- Cover Image Field ---
    // A rich image field with built-in asset management.
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'The main visual for the project. Appears on project cards and at the top of the project page.',
      options: {
        // Enables the hotspot functionality, which is crucial for responsive cropping.
        // It allows you to define the "important" part of an image.
        hotspot: true,
      },
      // You can even add custom fields to the image object itself!
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),

    // --- Description Field ---
    // A multi-line text input for a longer description.
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text', // 'text' is for long-form text, as opposed to 'string'.
      description: 'A detailed description of the project, its purpose, and the challenges faced.',
      rows: 4, // Sets the default height of the text area in the Studio.
    }),

    // --- Technologies Field ---
    // An array of strings to list the technologies used.
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      description: 'A list of technologies, frameworks, or languages used in this project.',
      // 'of' specifies the type(s) of items this array can contain.
      of: [{ type: 'string' }],
    }),

    // --- Project URL Field ---
    // A specialized field for URLs, with built-in validation.
    defineField({
      name: 'projectUrl',
      title: 'Project URL',
      type: 'url',
      description: 'The live URL where the project can be viewed.',
    }),
  ],
})