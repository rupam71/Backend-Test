import mongoose from 'mongoose';
import Product from '../product/model';
import User from '../user/model';
import { sendCartResponse } from "./helper";
import Cart from "./model";

export const CartMutation = {
  addToCart: async (parent: any, args: any, context: any, info: any) => {
    if(!context.user)  return sendCartResponse(403,"Permission Denied")
    
    const customer:any = await User.findById(context.user.id)
    if(!customer) return sendCartResponse(403,"No User Fouond")

    const product:any = await Product.findById(args.addCartInput.productId)
    if(!product) return sendCartResponse(403,"No Product Fouond")

    const existingCart:any = await Cart.find({customerId:context.user.id})

    const CartProduct = {
      productName: product.name,
      productId: args.addCartInput.productId,
      totalProduct: args.addCartInput.totalProduct,
      buyingPrice: product.sellingPrice*args.addCartInput.totalProduct,
    }

    if(existingCart.length===0) {
      const CartItem = {
        customerName: customer.name ,
        customerId: context.user.id,
        product: [CartProduct],
        totalPrice: CartProduct.buyingPrice,
        totalProductInCart: CartProduct.totalProduct
      }
      
      const cart = new Cart(CartItem);

      try {
        await cart.save()
        return sendCartResponse(200,"Success",cart)
      } catch (error:any) {
        if(error.code) return sendCartResponse(403,"This email already used")
        else {
          const errMessage = (Object as any).entries(error.errors)[0][1].message
          return sendCartResponse(403,errMessage)
        }
      }
    } else {
      let CartItem
      const hasOrNot = existingCart[0].product.filter((ele:any)=>ele.productId.toString()===args.addCartInput.productId)
      if(hasOrNot.length===0){
        CartItem = {
          customerName: customer.name ,
          customerId: context.user.id,
          product: [...existingCart[0].product,CartProduct],
          totalPrice: existingCart[0].totalPrice+CartProduct.buyingPrice,
          totalProductInCart: existingCart[0].totalProductInCart+CartProduct.totalProduct
        }
      } else {
        CartItem = {
          customerName: customer.name ,
          customerId: context.user.id,
          product: existingCart[0].product.map((ele:any)=>{
            if(ele.productId.toString()===args.addCartInput.productId){
              return {
                productName: product.name,
                productId: args.addCartInput.productId,
                totalProduct: args.addCartInput.totalProduct + ele.totalProduct,
                buyingPrice: (product.sellingPrice*args.addCartInput.totalProduct) + ele.buyingPrice,
              }
            } else return ele
          }),
          totalPrice: existingCart[0].totalPrice+CartProduct.buyingPrice,
          totalProductInCart: existingCart[0].totalProductInCart+CartProduct.totalProduct
        }
      }
      try {
        const cart:any = await Cart.findByIdAndUpdate(
          existingCart[0].id,
          CartItem,
          { new: true }
        )

        await cart.save()
  
        if (!cart) return sendCartResponse(401,"The Cart With Given ID Not Found",{})
        return sendCartResponse(200,"Success",cart)
      } catch (error) {
        console.log(error)
      }
    }
  },
  deleteCart: async (parent: any, args: any, context: any, info: any) => {
    if(!context.user)  return sendCartResponse(403,"Permission Denied")

    if(!mongoose.Types.ObjectId.isValid(args.id)) return sendCartResponse(403,"Invalid ID")

    const cart:any = await Cart.find({id:args.id});
    if (cart.length===0) return sendCartResponse(401,"The Cart With Given ID Not Found")
    if (cart[0].customerId.toString() !== context.user.id) return sendCartResponse(401,"Only Cart Owner Can Remove His Own Cart")

    await cart[0].remove()

    return sendCartResponse(200,"Success",cart[0])
  },
};
