// Configuration Sanity Studio
// À utiliser dans votre projet Sanity séparé

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'swh-negoce',
  title: 'SWH NEGOCE',

  projectId: '9vlbwlql',
  dataset: 'production',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
