"use client";

import { useEffect, useCallback } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { useCartStore } from "@/lib/store/cartStore";
import { GET_CART } from "@/lib/graphql/queries/cart";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  UPDATE_CART_ITEM,
  APPLY_COUPON,
} from "@/lib/graphql/mutations/addToCart";
import type { Cart } from "@/types/cart";

interface GetCartData {
  cart: Cart;
}

export function useCart() {
  const setItems = useCartStore((s) => s.setItems);
  const openCart = useCartStore((s) => s.openCart);
  const storeItems = useCartStore((s) => s.items);

  const { data, loading: cartLoading, refetch } = useQuery<GetCartData>(GET_CART, {
    fetchPolicy: "network-only",
  });

  // Sync WooCommerce cart → Zustand store when data arrives
  useEffect(() => {
    const nodes = data?.cart?.contents?.nodes;
    if (!nodes) return;

    const items = nodes.map((node) => ({
      key: node.key,
      productId: node.product.node.databaseId,
      name: node.product.node.name,
      slug: node.product.node.slug,
      image: node.product.node.image,
      price: node.variation?.node?.price ?? "",
      quantity: node.quantity,
      variationName: node.variation?.node?.attributes?.nodes
        ?.map((a: { value: string }) => a.value)
        .join(" / "),
    }));

    setItems(items);
  }, [data, setItems]);

  // addToCart
  const [addToCartMutation, { loading: addingToCart }] = useMutation(ADD_TO_CART);

  const addToCart = useCallback(
    async (productId: number, quantity = 1, variationId?: number) => {
      await addToCartMutation({
        variables: { productId, quantity, ...(variationId && { variationId }) },
      });
      await refetch();
      openCart();
    },
    [addToCartMutation, refetch, openCart]
  );

  // removeItem
  const [removeItemMutation] = useMutation(REMOVE_CART_ITEM);

  const removeItem = useCallback(
    async (key: string) => {
      await removeItemMutation({ variables: { keys: [key] } });
      await refetch();
    },
    [removeItemMutation, refetch]
  );

  // updateQuantity
  const [updateQtyMutation] = useMutation(UPDATE_CART_ITEM);

  const updateQuantity = useCallback(
    async (key: string, quantity: number) => {
      await updateQtyMutation({ variables: { key, quantity } });
      await refetch();
    },
    [updateQtyMutation, refetch]
  );

  // applyCoupon
  const [applyCouponMutation, { loading: applyingCoupon }] = useMutation(APPLY_COUPON);

  const applyCoupon = useCallback(
    async (code: string) => {
      await applyCouponMutation({ variables: { code } });
      await refetch();
    },
    [applyCouponMutation, refetch]
  );

  return {
    items: storeItems,
    cartData: data?.cart,
    cartLoading,
    addingToCart,
    applyingCoupon,
    addToCart,
    removeItem,
    updateQuantity,
    applyCoupon,
    refetch,
  };
}
