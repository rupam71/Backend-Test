import mongoose from "mongoose";

const SellSchema = new mongoose.Schema<SellType>(
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
    // product: [SellProductSchema],
    product: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SellProduct',
    }],
    totalPrice: {
      type: Number,
      required: true,
      trim: true
    },
    totalProduct: {
      type: Number,
      required: true,
      trim: true
    },
  },
  {
    timestamps: true,
  }
);

const Sell = mongoose.model<SellType>("Sell", SellSchema);

export default Sell;
