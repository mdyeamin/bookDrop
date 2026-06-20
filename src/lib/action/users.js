import { redirect } from "next/navigation";
import { serverMutation } from "../core/server";


export const  handleUpdateUserRole =async (userId, newRole)=>{
const response = await serverMutation(`/api/users/${userId}`,{ role: newRole } , "PATCH");

if(response.modifiedCount === 1){
  redirect("/dashboard/admin/users");
}
return response;

}