import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getClient } from "@/lib/graphql/server-client";
import {
  GET_PRODUCT_BY_SLUG,
  GET_PRODUCTS,
} from "@/lib/graphql/queries/products";
import { ProductPageClient } from "./ProductPageClient";
import type { Product } from "@/types/product";

export const revalidate = 60;

interface ProductData {
  product: Product | null;
}

interface ProductsData {
  products: { nodes: Pick<Product, "slug">[] };
}

export async function generateStaticParams() {
  try {
    const { data } = await getClient().query<ProductsData>({
      query: GET_PRODUCTS,
      variables: { first: 100 },
    });
    return (data?.products?.nodes ?? []).map((p: { slug: string }) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { data } = await getClient().query<ProductData>({
      query: GET_PRODUCT_BY_SLUG,
      variables: { slug },
    });
    const product = data?.product;
    if (!product) return {};
    return {
      title: product.name,
      description: product.shortDescription?.replace(/<[^>]+>/g, "") ?? "",
      openGraph: {
        title: product.name,
        images: product.image?.sourceUrl ? [product.image.sourceUrl] : [],
      },
    };
  } catch {
    return {};
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let product: Product | null = null;

  try {
    const { data } = await getClient().query<ProductData>({
      query: GET_PRODUCT_BY_SLUG,
      variables: { slug },
    });
    product = data?.product ?? null;
  } catch {
    notFound();
  }

  if (!product) notFound();

  return <ProductPageClient product={product} />;
}
