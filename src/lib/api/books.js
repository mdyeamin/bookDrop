import { serverFetch } from "../core/server";

export const getCurrentLibrarianBook = async (userId) => {
  return serverFetch(`/api/books?userid=${userId}`);
};
