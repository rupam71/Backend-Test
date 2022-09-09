export interface Context {
    user : User
}

export type UserType = User | null
export type ProductType = Product | null
export type CartType = Cart | null

interface User {
    id: mongoose.Types.ObjectId
    name: string
    email: string
    password: string
    phone: string
}

interface Product {
    id: mongoose.Types.ObjectId
    name: string
    brand: string
    totalProduct: number
    actualPrice: number
    discountPercentage: number
    sellingPrice: number
    totalSell: number
}

export interface CartProduct {
    productName: string
    productId: mongoose.Types.ObjectId
    buyingPrice: number
    totalProduct: number
  }
  
export interface Cart {
    id: mongoose.Types.ObjectId
    customerName: string
    customerId: mongoose.Types.ObjectId
    product: [CartProduct]
    totalPrice: number
    totalProductInCart: number
  }