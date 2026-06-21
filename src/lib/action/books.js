import { serverMutation } from "../core/server";

export const PostBook = async (data) => {
  const response = await serverMutation("/api/books", data);
  console.log(" after post book ", response);

  return response;
};
