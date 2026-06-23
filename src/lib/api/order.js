import { serverFetch } from "../core/server"


export const getDeliveryOrder=async(userId)=>{
    return serverFetch(`/api/my/order?userid=${userId}`)
}