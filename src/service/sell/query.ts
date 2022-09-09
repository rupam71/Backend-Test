import { sendInvoicesResponse, sendSellResponse } from "./helper";
import Sell from "./model";
import SellProduct from "./sellProductModel";

export const SellQuery = {
  totalBuy: async (parent: any, args: any, context:any) => {
    let totalBuy = 0
    const sell = await Sell.find({
      ...(args?.customerId && {customerId:args.customerId})
    })

    
    sell.forEach(ele=>{
      totalBuy += ele?.totalProduct ?? 0
    })

    return sendSellResponse(200,`Total Buy ${totalBuy}`)
  },
  totalProfit: async (parent: any, args: any, context:any) => {
    let totalProfit = 0
    const sell = await Sell.find({
      ...(args?.customerId && {customerId:args.customerId})
    })
    
    sell.forEach(ele=>{
      totalProfit += ele?.totalPrice ?? 0
    })

    return sendSellResponse(200,`Total Profit ${totalProfit}`)
  },
  allinvoices: async (parent: any, args: any, context:any) => {
    let allInvoices:any = []
    const sell = await Sell.find({
      ...(args?.invoicesFilter?.customerName && {customerName:args.invoicesFilter.customerName})
    })

    for await (let ele of sell) {
        let invoice:any = ele
        let invoiceProduct:any = []

        if(ele.product) {
          for await (let ele2 of ele.product) {
            const sellProduct = await SellProduct.findById(ele2)
            invoiceProduct.push(sellProduct)
          }
        }
        
        invoice.product = invoiceProduct
        allInvoices.push(invoice)
    }

    return sendInvoicesResponse(200,`Success`,allInvoices)
  },
};
