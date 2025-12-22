// Requêtes GROQ pour Sanity CMS

// Récupère tous les produits
export const allProductsQuery = `
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    description,
    images,
    "category": category->{ _id, name, "slug": slug.current },
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
    images,
    "category": category->{ _id, name, "slug": slug.current },
    datasheet { asset->{ url } }
  }
`;

// Récupère toutes les catégories
export const allCategoriesQuery = `
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    "slug": slug.current
  }
`;

// Récupère les produits d'une catégorie
export const productsByCategoryQuery = `
  *[_type == "product" && category->slug.current == $categorySlug] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    description,
    images[0],
    "category": category->{ _id, name, "slug": slug.current }
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
    images[0],
    "category": category->{ _id, name, "slug": slug.current }
  }
`;
