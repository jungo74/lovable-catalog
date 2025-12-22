import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './client';
import type { SanityImage } from '@/types';

const builder = imageUrlBuilder(sanityClient);

// Génère l'URL d'une image Sanity avec transformations
export function urlFor(source: SanityImage) {
  return builder.image(source);
}

// Génère une URL optimisée pour les images
export function getImageUrl(source: SanityImage, width?: number, height?: number): string {
  let imageBuilder = builder.image(source).auto('format').fit('max');
  
  if (width) {
    imageBuilder = imageBuilder.width(width);
  }
  if (height) {
    imageBuilder = imageBuilder.height(height);
  }
  
  return imageBuilder.url();
}

// Génère une URL pour Open Graph (1200x630)
export function getOgImageUrl(source: SanityImage): string {
  return builder.image(source).width(1200).height(630).auto('format').url();
}
