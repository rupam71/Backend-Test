interface Context {
    user : User
}

type UserType = User | null
type ProductType = Product | null
type CartType = Cart | null

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

interface CartProduct {
    productName: string
    productId: mongoose.Types.ObjectId
    buyingPrice: number
    totalProduct: number
  }
  
interface Cart {
    id: mongoose.Types.ObjectId
    customerName: string
    customerId: mongoose.Types.ObjectId
    product: [CartProduct]
    totalPrice: number
    totalProductInCart: number
  }

  interface CartProductSchemaType {
    productName: string
    productId: mongoose.Types.ObjectId
    buyingPrice: number
    totalProduct: number
  }
  
  interface CartType {
    customerName: string
    customerId: mongoose.Types.ObjectId
    product: [CartProductSchemaType]
    totalPrice: number
    totalProductInCart: number
  }

  interface ProductType {
    name: string
    brand: string
    totalProduct: number
    actualPrice: number
    discountPercentage: number
    sellingPrice: number
    totalSell: number
  }

  interface SellType {
    customerName: string
    customerId: mongoose.Types.ObjectId
    product: []
    totalPrice: number
    totalProduct: number
  }

  interface UserTypeModel {
    name: string
    email: string
    password: string
    phone: string
  }