import { redirect } from "next/navigation";
import { serverMutation } from "../core/server";

import { authClient } from "../auth-client";
import toast from "react-hot-toast";


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

// a librarian can unpublish books

export const unpublishBookByLibrarian=async(bookId,data)=>{
  const { data: {token} } = await authClient.token();
  console.log(token);
  const response =await serverMutation(`/api/books/${bookId}`,{status:data},"PATCH", token)
  console.log(response);
  if(response.modifiedCount >0){
  toast.success(
  data === "approved" 
    ? `Congratulations! Your book has been successfully published.` 
    : `Status updated: Your book is ${data}.`
);
    redirect('/dashboard/librarian/inventory')
  }
  
  return response
} 




// manage books by admin ****************
// update book status 
export const updateBookStatusByAdmin=async(bookId,data)=>{
  const { data: {token} } = await authClient.token();
  console.log(token);
  const response =await serverMutation(`/api/admin/books/${bookId}`,{status:data},"PATCH", token)
  console.log(response);
  if(response.modifiedCount >0){
    
    redirect('/dashboard/admin/book-approval-queue')
  }
  
  return response
} 
export const handleDeleteBookByAdmin = async (userId) => {
  
  const { data: {token} } = await authClient.token();
    console.log(token);
  const response = await serverMutation(`/api/admin/books/${userId}`, null, "DELETE",token);
  if (response.deletedCount > 0) {
    redirect("/dashboard/admin/book-approval-queue");
  }
  return response;
};
// manage books by admin ****************
