import mongoose from 'mongoose';
import { sendProductResponse } from "./helper";
import Product from "./model";

export const ProductMutation = {
  addProduct: async (parent: any, args: any, context: any, info: any) => {
    if(!context.user)  return sendProductResponse(403,"Permission Denied")
    const product = new Product(args.addProductInput);

    try {
      await product.save()
      return sendProductResponse(200,"Success",[product])
    } catch (error:any) {
      if(error.code) return sendProductResponse(403,"This email already used")
      else {
        const errMessage = (Object as any).entries(error.errors)[0][1].message
        return sendProductResponse(403,errMessage)
      }
    }
  },
  updateProduct: async (parent: any, args: any, context: any, info: any) => {
    if(!context.user)  return sendProductResponse(403,"Permission Denied")
    if(!mongoose.Types.ObjectId.isValid(args.updateProductInput.id)) return sendProductResponse(403,"Invalid ID")

    try {
      const product = await Product.findByIdAndUpdate(
        args.updateProductInput.id,
        {...args.updateProductInput},
        { new: true }
      );

      if (!product) return sendProductResponse(401,"The Product With Given ID Not Found")
      await product.save()
      return sendProductResponse(200,"Success",[product])
    } catch (error) {
      console.log(error)
    }
    
  },
  deleteProduct: async (parent: any, args: any, context: any, info: any) => {
    if(!context.user)  return sendProductResponse(403,"Permission Denied")
    if(!mongoose.Types.ObjectId.isValid(args.id)) return sendProductResponse(403,"Invalid ID")

    const product = await Product.findByIdAndRemove(args.id);
    if (!product) return sendProductResponse(401,"The Product With Given ID Not Found")

    return sendProductResponse(200,"Success",[product])
  },
};
