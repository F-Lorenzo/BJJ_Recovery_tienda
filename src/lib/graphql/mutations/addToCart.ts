import { gql } from "@apollo/client";

export const ADD_TO_CART = gql`
  mutation AddToCart($productId: Int!, $quantity: Int = 1, $variationId: Int) {
    addToCart(
      input: {
        productId: $productId
        quantity: $quantity
        variationId: $variationId
      }
    ) {
      cartItem {
        key
        quantity
        total
      }
    }
  }
`;

export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($key: ID!, $quantity: Int!) {
    updateItemQuantities(input: { items: [{ key: $key, quantity: $quantity }] }) {
      cart {
        total
        subtotal
      }
    }
  }
`;

export const REMOVE_CART_ITEM = gql`
  mutation RemoveCartItem($keys: [ID]!) {
    removeItemsFromCart(input: { keys: $keys }) {
      cart {
        total
        subtotal
      }
    }
  }
`;

export const APPLY_COUPON = gql`
  mutation ApplyCoupon($code: String!) {
    applyCoupon(input: { code: $code }) {
      cart {
        total
        subtotal
        discountTotal
        appliedCoupons {
          code
          discountAmount
        }
      }
    }
  }
`;
