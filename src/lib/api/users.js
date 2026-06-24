import { headers } from "next/headers";
import { auth } from "../auth";
import { secureServerFetch, serverFetch } from "../core/server";

// get all user from the server
export const getUsers = async () => {
  // const { data: token } = await authClient.token();
  //   console.log(token?.token);

  const  tokenData  = await auth?.api?.getToken({
    headers: await headers(),
  });
  const token = tokenData?.token
  console.log(token);

  return secureServerFetch("/api/users",token); // ← .token
};

// manage books by admin
export const getAllBooksByAdmin = async () => {
  return serverFetch("/api/books");
};
