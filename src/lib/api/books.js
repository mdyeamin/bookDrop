import { serverFetch } from "../core/server";

// all books fetch from database
export const getAllBooks = async () => {
  return serverFetch(`/api/public/books`);
};

// get single book by id 
export const getBookById =async(id)=>{
return serverFetch(`/api/public/books/${id}`)
}

// current librarian book fetch
export const getCurrentLibrarianBook = async (userId) => {
  return serverFetch(`/api/books?userid=${userId}`);
};
