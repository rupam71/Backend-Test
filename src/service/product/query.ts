import mongoose from "mongoose";
import { sendProductResponse } from "./helper";
import Product from "./model";

export const ProductQuery = {
  getAllProduct: async (parent: any, args: any, context:any) => {
    const product = await Product.find()
    return sendProductResponse(200,"Success",product)
  },
  getProductById: async (parent: any, args: any, context:any) => {
    if(!mongoose.Types.ObjectId.isValid(args.id)) return sendProductResponse(403,"Invalid ID")
    
    const product = await Product.findById(args.id);
    if (!product) return sendProductResponse(401,"This Product Not Exists")

    return sendProductResponse(200,"Success",product)
  },
  bestSellingProduct: async (parent: any, args: any, context:any) => {
    const product = await Product.find().sort({totalSell:-1}).limit(1);
    if (!product) return sendProductResponse(401,"This Product Not Exists")

    return sendProductResponse(200,"Success",product)
  },
};
