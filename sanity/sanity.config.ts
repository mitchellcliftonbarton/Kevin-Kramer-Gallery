import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {myStructure} from './myStructure'
import {KKGLogo} from './components/KKGLogo'

export default defineConfig({
  name: 'default',
  title: 'Kevin Kramer Gallery',
  icon: KKGLogo,

  projectId: 'ii4ohxov',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: myStructure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
