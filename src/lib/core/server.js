"use server";
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  const data =  res.json();
  return data;
};
