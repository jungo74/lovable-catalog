// Requêtes GROQ pour Sanity CMS

// Récupère tous les produits
export const allProductsQuery = `
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    description,
    "images": images[]{
      "asset": {
        "_ref": asset._ref,
        "url": asset->url
      }
    },
    "category": category->{ _id, name, "slug": slug.current, icon },
    "hasDatasheet": defined(datasheet)
  }
`;

// Récupère un produit par son slug
export const productBySlugQuery = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    description,
    "images": images[]{
      "asset": {
        "_ref": asset._ref,
        "url": asset->url
      }
    },
    "category": category->{ _id, name, "slug": slug.current, icon },
    specifications[]{label, value},
    "datasheet": datasheet.asset->url
  }
`;

// Récupère toutes les catégories
export const allCategoriesQuery = `
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    icon
  }
`;

// Récupère les produits d'une catégorie
export const productsByCategoryQuery = `
  *[_type == "product" && category->slug.current == $categorySlug] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    description,
    "images": images[0]{
      "asset": {
        "_ref": asset._ref,
        "url": asset->url
      }
    },
    "category": category->{ _id, name, "slug": slug.current, icon }
  }
`;

// Récupère tous les slugs de produits (pour sitemap)
export const allProductSlugsQuery = `
  *[_type == "product" && defined(slug.current)][].slug.current
`;

// Récupère les X premiers produits (pour aperçu accueil)
export const featuredProductsQuery = `
  *[_type == "product"] | order(_createdAt desc) [0...6] {
    _id,
    name,
    "slug": slug.current,
    description,
    "images": images[0]{
      "asset": {
        "_ref": asset._ref,
        "url": asset->url
      }
    },
    "category": category->{ _id, name, "slug": slug.current, icon }
  }
`;

// Récupère les slides du hero carousel
export const heroSlidesQuery = `
  *[_type == "heroSlide"] | order(order asc) {
    _id,
    title,
    subtitle,
    description,
    "image": image.asset->url
  }
`;
