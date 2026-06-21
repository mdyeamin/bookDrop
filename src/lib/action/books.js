import { redirect } from "next/navigation";
import { serverMutation } from "../core/server";

// a librarian can post books
export const PostBook = async (data) => {
  const response = await serverMutation("/api/books", data);
  console.log(" after post book ", response);
  if (response.insertedId) {
    redirect("/dashboard/librarian/inventory");
  }
  return response;
};

export const handleDeleteBook = async (bookId) => {
  const response = await serverMutation(`/api/books/${bookId}`, null, "DELETE");
  if (response.deletedCount > 0) {
    redirect("/dashboard/librarian/inventory");
  }
  return response;
};
