import { gql } from "@apollo/client";

export const GET_CART = gql`
  query GetCart {
    cart {
      contents {
        nodes {
          key
          quantity
          total
          product {
            node {
              id
              databaseId
              name
              slug
              image {
                sourceUrl
                altText
              }
            }
          }
          variation {
            node {
              id
              name
              price
              attributes {
                nodes {
                  name
                  value
                }
              }
            }
          }
        }
      }
      subtotal
      total
      discountTotal
      appliedCoupons {
        code
        discountAmount
      }
      availableShippingMethods {
        rates {
          id
          label
          cost
        }
      }
    }
  }
`;
