import type { Product, ProductVariation } from "./product";

export interface CartItemProduct {
  node: Pick<Product, "id" | "databaseId" | "name" | "slug" | "image">;
}

export interface CartItemVariation {
  node: Pick<
    ProductVariation,
    "id" | "name" | "price" | "attributes"
  >;
}

export interface CartItem {
  key: string;
  quantity: number;
  total: string;
  product: CartItemProduct;
  variation?: CartItemVariation;
}

export interface AppliedCoupon {
  code: string;
  discountAmount: string;
}

export interface ShippingRate {
  id: string;
  label: string;
  cost: string;
}

export interface Cart {
  contents: {
    nodes: CartItem[];
  };
  subtotal: string;
  total: string;
  discountTotal: string;
  appliedCoupons: AppliedCoupon[];
  availableShippingMethods: Array<{
    rates: ShippingRate[];
  }>;
}
