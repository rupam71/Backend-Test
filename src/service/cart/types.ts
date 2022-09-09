export const CartTypes = `
  type CartProduct {
    productName: String
    productId: ID
    totalProduct: Int
    buyingPrice: Float
  }

  type Cart {
    id: ID
    customerName: String
    customerId: ID
    product: [CartProduct]
    totalPrice: Float
    totalProductInCart: Int
  }

  input AddCartInput {
    productId: ID!
    totalProduct: Int!
  }

  type CartResponse {
    statusCode: Int!
    message: String!
    cart: Cart
  }

  extend type Query {
    getCart(customerId: ID!): CartResponse
  }
  
  extend type Mutation {
    addToCart (addCartInput: AddCartInput) :CartResponse
    deleteCart (id: ID!) :CartResponse
  }
`