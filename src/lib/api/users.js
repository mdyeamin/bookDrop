import { serverFetch } from "../core/server";

// get all user from the server
export const getUsers = async () => {
  // const { data: token } = await authClient.token();
  //   console.log(token?.token);

  // const token = await auth?.api?.getAccessToken({
  //   headers: await headers(),
  // });

  return serverFetch("/api/users"); // ← .token
};




// manage books by admin 
export const getAllBooksByAdmin = async () => {
  return serverFetch("/api/books");
};
