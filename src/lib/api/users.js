import { serverFetch } from "../core/server";


// get all user from the server
export const getUsers = async () => {
  return  serverFetch("/api/users");
};
