import { headers } from "next/headers";
import { secureServerFetch, serverFetch } from "../core/server";
import { auth } from "../auth";

// all books fetch from database

export const getAllBooks = async (queryParams = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (queryParams.search) params.append("search", queryParams.search);
    if (queryParams.category) params.append("category", queryParams.category);
    if (queryParams.fee) params.append("fee", queryParams.fee);
    
    
    if (queryParams.page) params.append("page", queryParams.page);

    const queryString = params.toString();
    const path = queryString ? `/api/public/books?${queryString}` : `/api/public/books`;

    return await serverFetch(path);
  } catch (error) {
    console.error("Error fetching public books:", error);
   
    return { books: [], totalPages: 1 }; 
  }
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


// ekjon librarian er kotota delivery /order hoyeche
export const getCurrentLibrarianOrderedBook = async (librarianId)=>{
const  tokenData  = await auth?.api?.getToken({
      headers: await headers(),
    });
    const token = tokenData?.token
    console.log(token);

return secureServerFetch(`/api/librarian/orders?librarianid=${librarianId}`,token)
}


// admin all order dekhte pabe 
export const getOrderedBookForAdmin = async () => {
  try {
    const tokenData = await auth?.api?.getToken({
      headers: await headers(),
    });
    
    const token = tokenData?.token;
    
    
    return await secureServerFetch(`/api/admin/orders`, token);
  } catch (error) {
    console.error("Error fetching ordered books for admin:", error);
    return [];
  }
};




// manage books by admin
export const getAllBooksByAdmin = async () => {
  return serverFetch("/api/books");
};


