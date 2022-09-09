import mongoose from "mongoose";

interface ProductType {
  name: string
  brand: string
  totalProduct: number
  actualPrice: number
  discountPercentage: number
  sellingPrice: number
  totalSell: number
}

const ProductSchema = new mongoose.Schema<ProductType>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    brand: {
      type: String,
      required: true,
      trim: true
    },
    totalProduct: {
      type: Number,
      required: true,
      trim: true
    },
    actualPrice: {
      type: Number,
      required: true,
      trim: true
    },
    discountPercentage: {
      type: Number,
      required: true,
      trim: true,
      default: 0.00
    },
    sellingPrice: {
      type: Number,
      trim: true
    },
    totalSell: {
      type: Number,
      default:0,
      trim: true
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.pre('save', async function(next){
  const product = this
  product.sellingPrice = product.actualPrice-((product.discountPercentage/100)*product.actualPrice)
  
  next()
})

const Product = mongoose.model<ProductType>("Product", ProductSchema);
export default Product;
