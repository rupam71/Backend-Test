export const ProductTypes = `
  type Product {
    id: ID
    name: String
    brand: String
    totalProduct: Int
    actualPrice: Float
    discountPercentage: Float
    sellingPrice : Float
    totalSell: Int
  }

  input AddProductInput {
    name: String!
    brand: String!
    totalProduct: Int!
    actualPrice: Float!
    discountPercentage: Float
  }

  input UpdateProductInput {
    id: ID!
    name: String
    brand: String
    totalProduct: Int
    actualPrice: Float
    discountPercentage: Float
  }

  type ProductResponse {
    statusCode: Int!
    message: String!
    product: [Product]
  }

  extend type Query {
    getAllProduct: ProductResponse
    getProductById(id: ID!): ProductResponse
    bestSellingProduct: ProductResponse
  }
  
  extend type Mutation {
    addProduct (addProductInput: AddProductInput) :ProductResponse
    updateProduct (updateProductInput: UpdateProductInput) :ProductResponse
    deleteProduct (id: ID!) :ProductResponse
  }
`