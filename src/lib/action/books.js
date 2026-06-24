import { redirect } from "next/navigation";
import { serverMutation } from "../core/server";

import { authClient } from "../auth-client";


// a librarian can post books
export const PostBook = async (data) => {
  const { data: {token} } = await authClient.token();
  console.log(token);

  const response = await serverMutation("/api/books", data ,"POST" ,token);
  console.log(" after post book ", response);
  if (response.insertedId) {
    redirect("/dashboard/librarian/inventory");
  }
  return response;
};
// a librarian can delete books
export const handleDeleteBook = async (bookId) => {
  const { data: {token} } = await authClient.token();
  console.log(token);

  const response = await serverMutation(`/api/books/${bookId}`, null, "DELETE" ,token);
  if (response.deletedCount > 0) {
    redirect("/dashboard/librarian/inventory");
  }
  return response;
};

// librarian can update book

export const handleUpdateBook = async (bookId, data) => {
  const { data: {token} } = await authClient.token();
  console.log(token);
  const response = await serverMutation(`/api/books/${bookId}`, data, "PATCH", token);
  if (response.modifiedCount > 0) {
    redirect("/dashboard/librarian/inventory");
  }

  return response;
};


// manage books by admin ****************
// update book status 
export const updateBookStatusByAdmin=async(bookId,data)=>{
  const { data: {token} } = await authClient.token();
  console.log(token);
  const response =await serverMutation(`/api/admin/books/${bookId}`,{status:data},"PATCH", token)
  console.log(response);
  if(response.modifiedCount >0){

    redirect('/dashboard/admin/manage-all-books')
  }
  
  return response
} 

// manage books by admin ****************
