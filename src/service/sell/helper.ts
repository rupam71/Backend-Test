export const sendSellResponse = (statusCode:number,message:string,sellInformation:any={}) => {
    return { 
        statusCode,
        message,
        sellInformation
     }
}

export const sendInvoicesResponse = (statusCode:number,message:string,sellInformation:any=[]) => {
    return { 
        statusCode,
        message,
        sellInformation
     }
}