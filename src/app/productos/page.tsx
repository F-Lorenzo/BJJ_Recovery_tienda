import type { Metadata } from "next";
import { getClient } from "@/lib/graphql/server-client";
import { GET_PRODUCTS } from "@/lib/graphql/queries/products";
import { CatalogClient } from "./CatalogClient";
import type { Product } from "@/types/product";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Productos de recuperación muscular para BJJ",
  description:
    "Pistolas masajeadoras, tape, CBD, cremas analgésicas y más. Todo lo que necesitás para recuperarte y volver al tatami.",
};

interface ProductsData {
  products: {
    nodes: Pick<
      Product,
      | "id"
      | "slug"
      | "name"
      | "image"
      | "price"
      | "regularPrice"
      | "salePrice"
      | "productTags"
      | "productCategories"
    >[];
  };
}

export default async function ProductsPage() {
  let products: ProductsData["products"]["nodes"] = [];

  try {
    const { data } = await getClient().query<ProductsData>({
      query: GET_PRODUCTS,
      variables: { first: 50 },
    });
    products = data?.products?.nodes ?? [];
  } catch {
    // degrade silently
  }

  return <CatalogClient initialProducts={products} />;
}
