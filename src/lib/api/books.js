import { serverFetch } from "../core/server";

// all books fetch from database
export const getAllBooks = async () => {
  return serverFetch(`/api/books`);
};
// current librarian book fetch
export const getCurrentLibrarianBook = async (userId) => {
  return serverFetch(`/api/books?userid=${userId}`);
};
