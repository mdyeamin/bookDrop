import { serverMutation } from "../core/server"

export const postPaymentData = async(data)=>{
    const response = await serverMutation('/api/payment',data)
    return response
}