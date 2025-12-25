import { createClient } from '@sanity/client';

// Configuration Sanity
const SANITY_PROJECT_ID = '9vlbwlql';
const SANITY_DATASET = 'production';

// Client Sanity pour les requêtes API
export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true, // Utiliser le CDN pour de meilleures performances
});

// Client pour les requêtes sans cache (preview)
export const previewClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
});
