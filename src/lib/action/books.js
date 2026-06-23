import { redirect } from "next/navigation";
import { serverMutation } from "../core/server";

import { authClient } from "../auth-client";

// a librarian can post books
export const PostBook = async (data) => {
  const { data: token } = await authClient.token();
  console.log(token.token);

  const response = await serverMutation("/api/books", data ,"POST" ,token);
  console.log(" after post book ", response);
  if (response.insertedId) {
    redirect("/dashboard/librarian/inventory");
  }
  return response;
};
// delete book
export const handleDeleteBook = async (bookId) => {
  const response = await serverMutation(`/api/books/${bookId}`, null, "DELETE");
  if (response.deletedCount > 0) {
    redirect("/dashboard/librarian/inventory");
  }
  return response;
};

// update book

export const handleUpdateBook = async (bookId, data) => {
  const response = await serverMutation(`/api/books/${bookId}`, data, "PATCH");
  if (response.modifiedCount > 0) {
    redirect("/dashboard/librarian/inventory");
  }

  return response;
};
