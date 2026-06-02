export interface ProductImage {
  sourceUrl: string;
  altText: string;
}

export interface ProductCategory {
  name: string;
  slug: string;
}

export interface ProductTag {
  name: string;
}

export interface ProductVariationAttribute {
  name: string;
  value: string;
}

export interface ProductVariation {
  id: string;
  databaseId: number;
  name: string;
  price: string;
  regularPrice: string;
  attributes: {
    nodes: ProductVariationAttribute[];
  };
}

export interface Product {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: ProductImage;
  galleryImages: {
    nodes: ProductImage[];
  };
  price: string;
  regularPrice: string;
  salePrice?: string;
  variations?: {
    nodes: ProductVariation[];
  };
  productCategories: {
    nodes: ProductCategory[];
  };
  productTags: {
    nodes: ProductTag[];
  };
  related?: {
    nodes: Omit<Product, "related">[];
  };
  __typename: "SimpleProduct" | "VariableProduct";
}
