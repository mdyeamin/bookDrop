
import { serverMutation } from "../core/server"
import toast from "react-hot-toast";
import { authClient } from "../auth-client";
// when user order then post to DB the data


export const postPaymentData = async(data)=>{
    const { data: tokenData } = await authClient.token();
      const token = tokenData?.token
    const response = await serverMutation('/api/payment',data ,token)
    return response
}

// user can delete his order
export const deleteUserOrder = async(userId)=>{
    const { data: tokenData } = await authClient.token();
      const token = tokenData?.token
        const response = await serverMutation(`/api/payment/${userId}`,null,"DELETE", token)
        toast.success("delete Your Book")
        return response
}