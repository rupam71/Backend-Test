import mongoose from "mongoose";

interface SellProductSchemaType {
  customerName: string
  customerId: mongoose.Types.ObjectId
  productName: string
  productId: mongoose.Types.ObjectId
  buyingPrice: number
  totalProduct: number
}

export const SellProductSchema = new mongoose.Schema<SellProductSchemaType>(
    {
      customerName: {
        type: String,
        required: true,
        trim: true
      },
      customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      productName: {
        type: String,
        required: true,
        trim: true
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      buyingPrice: {
        type: Number,
        required: true,
        trim: true
      },
      totalProduct: {
        type: Number,
        required: true,
        trim: true
      },
    },{
        timestamps: true,
      }
  );

  export const SellProduct = mongoose.model<SellProductSchemaType>("SellProduct", SellProductSchema);
  export default SellProduct;