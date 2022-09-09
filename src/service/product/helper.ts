export const sendProductResponse = (statusCode:number,message:string,product:any=[]) => {
    return { 
        statusCode,
        message,
        product
     }
}