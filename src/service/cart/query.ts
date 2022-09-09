import { sendCartResponse } from "./helper";
import Cart from "./model";

export const CartQuery = {
  getCart: async (parent: any, args: any, context:any) => {
    const cart = await Cart.find({customerId:args.customerId})
    
    if(cart.length>0) return sendCartResponse(200,"Success",cart[0])
    else return sendCartResponse(403,"No Cart Found For This User")
  },
};
