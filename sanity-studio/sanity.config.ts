import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
// import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import project from './schemaTypes/project'
import post from './schemaTypes/post'
import personalInfo from './schemaTypes/personalInfo'

const singletons = new Set(['personalInfo'])

export default defineConfig({
  name: 'default',
  title: 'My Portfolio Website',

  projectId: 'cpol5vcp',
  dataset: 'production',
// --- 2. Add the singleton schema to your types array ---
  schema: {
    // The filter is to ensure we don't have duplicate schema definitions.
    // The template might have already included 'post', so this is a safe way to add 'project' and 'personalInfo'.
    types: (prev) => {
      // The 'Blog' template already provides 'post', 'author', etc. in schemaTypes
      // We are adding our custom 'project' and 'personalInfo' schemas.
      return [...schemaTypes, project, personalInfo]
    },
  },

  // --- 3. Configure the Structure Tool for the Singleton Pattern ---
  plugins: [
    structureTool({
      // The 'structure' property defines the layout of the Sanity Studio's desk.
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // --- The Singleton Item ---
            // We create a single list item for our 'personalInfo' document.
            S.listItem()
              .title('Personal Info')
              .id('personalInfo') // A unique ID for this list item.
              .child(
                // When this list item is clicked, it opens a document editor...
                S.document()
                  .schemaType('personalInfo') // for the 'personalInfo' schema...
                  .documentId('personalInfo') // ...and specifically for the document with the ID 'personalInfo'.
              ),
            S.divider(), // A visual separator in the Studio UI.

            // --- Regular, Multi-Instance Document Types ---
            // We can use a helper to list out all other document types,
            // filtering out the singletons we've already handled.
            ...S.documentTypeListItems().filter(
              (item) => !singletons.has(item.getId()!)
            ),
          ]),
    }),
    visionTool(),
  ],
})
