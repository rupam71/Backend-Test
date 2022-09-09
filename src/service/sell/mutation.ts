import Cart from "../cart/model";
import Product from "../product/model";
import { sendSellResponse } from "./helper";
import Sell from "./model";
import SellProduct from "./sellProductModel";

export const SellMutation = {
  addSell: async (parent: any, args: any, context: any, info: any) => {
    if(!context.user)  return sendSellResponse(403,"Permission Denied")
    
    const cart = await Cart.findById(args.addSellInput.cartId)
    if (!cart) return sendSellResponse(401,"The Cart With Given ID Not Found")
    if (cart.customerId.toString() !== context.user.id) return sendSellResponse(401,"Only Cart Owner Can Add to Sell")

    let sellProductId:any = []
    let sellProductDetails:any = []

    await cart.product.forEach(async(ele:any)=>{
      const sellProduct = new SellProduct({
        customerName: cart.customerName,
        customerId: cart.customerId,
        productName: ele.productName,
        productId: ele.productId,
        buyingPrice: ele.buyingPrice,
        totalProduct: ele.totalProduct
      })

      sellProduct.save()
      sellProductId.push(sellProduct.id)
      sellProductDetails.push(sellProduct)

      const product = await Product.findByIdAndUpdate(
        ele.productId,
        {
          $inc: {
            totalSell: ele.totalProduct,
            totalProduct: -(ele.totalProduct)
          }
        },
        { new: true }
      )
    })

    const sell = new Sell({
      customerName: cart.customerName,
      customerId: cart.customerId,
      product: sellProductId,
      totalPrice: cart.totalPrice,
      totalProduct: cart.totalProductInCart
    });

    await sell.save()
    sell.product = sellProductDetails

    await Cart.findByIdAndRemove(args.addSellInput.cartId);

    return sendSellResponse(200,"Success",sell)
  },
};
