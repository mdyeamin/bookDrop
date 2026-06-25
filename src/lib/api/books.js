import { headers } from "next/headers";
import { secureServerFetch, serverFetch } from "../core/server";
import { auth } from "../auth";

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

    const  tokenData  = await auth?.api?.getToken({
      headers: await headers(),
    });
    const token = tokenData?.token
    console.log(token);
  return secureServerFetch(`/api/books?userid=${userId}`,token);
};


// ekjon librarian er kotota delivery hoyeche
export const getCurrentLibrarianOrderedBook = async (librarianId)=>{
const  tokenData  = await auth?.api?.getToken({
      headers: await headers(),
    });
    const token = tokenData?.token
    console.log(token);

return secureServerFetch(`/api/librarian/orders?librarianid=${librarianId}`,token)
}