import { redirect } from "next/navigation";
import { serverFetch, serverMutation } from "../core/server";

// get all user from the server
export const getUsers = async () => {
  return serverFetch("/api/users");
};

// delete user from the server

export const handleDeleteUser = async (userId) => {
  const response = await serverMutation(`/api/users/${userId}`, null, "DELETE");
  if (response.deletedCount > 0) {
    redirect("/dashboard/admin/users");
  }
  return response;
};
