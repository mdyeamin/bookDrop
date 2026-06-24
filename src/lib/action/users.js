
import { redirect } from "next/navigation";
import { serverMutation } from "../core/server";
import { authClient } from "../auth-client";

// update user role my admin 
export const  handleUpdateUserRole =async (userId, newRole)=>{
  const { data: {token} } = await authClient.token();
    console.log("sdfdsf",token);
const response = await serverMutation(`/api/users/${userId}`,{ role: newRole } , "PATCH",token);

if(response.modifiedCount === 1){
  redirect("/dashboard/admin/users");
}
return response;

}

// delete user by admin 

export const handleDeleteUser = async (userId) => {
  const { data: {token} } = await authClient.token();
    console.log(token);
  const response = await serverMutation(`/api/users/${userId}`, null, "DELETE",token);
  if (response.deletedCount > 0) {
    redirect("/dashboard/admin/users");
  }
  return response;
};