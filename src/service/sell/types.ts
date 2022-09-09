export const SellTypes = `
  type SellProduct {
    productName: String
    productId: ID
    totalProduct: Int
    buyingPrice: Float
  }

  type Sell {
    id: ID
    customerName: String
    customerId: ID
    product: [SellProduct]
    totalPrice: Float
    totalProduct: Int
  }

  input AddSellInput {
    cartId: ID!
  }

  type SellResponse {
    statusCode: Int!
    message: String!
    sellInformation: Sell
  }

  type InvoicesResponse {
    statusCode: Int!
    message: String!
    sellInformation: [Sell]
  }

  input InvoicesFilter {
    customerName: String
  }

  extend type Query {
    totalBuy(customerId: ID): SellResponse
    totalProfit(customerId: ID): SellResponse
    allinvoices(invoicesFilter: InvoicesFilter): InvoicesResponse
  }
  
  extend type Mutation {
    addSell (addSellInput: AddSellInput) :SellResponse
  }
`