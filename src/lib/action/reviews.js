import { redirect } from "next/navigation";
import { authClient } from "../auth-client";
import { serverMutation } from "../core/server";
import toast from "react-hot-toast";

// user review post  
export const postUserReview = async(data) =>{
  const { data: tokenData} = await authClient.token();
  const token  = tokenData?.token
  console.log(token);

  const response = await serverMutation('/api/user/review',data,"POST",  token)
  if (response.insertedId) {
    toast.success("thanks for review")
      redirect("/dashboard/user/my-reviews");
    }
    console.log("user review post frontend",response);
    
    return response
}


export const deleteUserReview = async (id)=>{
  const { data: tokenData } = await authClient.token();
  const token = tokenData?.token
  const response = await serverMutation(`/api/user/review/${id}`, null, "DELETE",token);
  if (response.deletedCount > 0) {
    toast.success("delete review successfully")
    redirect("/dashboard/user/my-reviews");
  }
  console.log("update user review frontend",response);
  
  return response;
}


export const editUserReview = async (id, data)=>{
const { data: tokenData } = await authClient.token();
  const token  = tokenData?.token
  
  const response = await serverMutation(`/api/user/review/${id}`, data, "PATCH", token);
    if (response.modifiedCount > 0) {
      toast.success("Edit your review successfully")
      redirect("/dashboard/user/my-reviews");
    }
  
  
    return response;
}