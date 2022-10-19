import mongoose from "mongoose";

const CartProductSchema = new mongoose.Schema<CartProductSchemaType>(
  {
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
  }
);

const CartSchema = new mongoose.Schema<CartType>(
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
    product: [CartProductSchema],
    totalPrice: {
      type: Number,
      required: true,
      trim: true
    },
    totalProductInCart: {
      type: Number,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model<CartType>("Cart", CartSchema);
export default Cart;
