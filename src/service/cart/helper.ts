export const sendCartResponse = (statusCode:number,message:string,cart:CartType | {}={}) => {
    return { 
        statusCode,
        message,
        cart
     }
}