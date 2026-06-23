"use server";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, { cache: "no-store" });
  const data =await  res.json();
  return data;
};

export const serverMutation = async (path, data, method = "POST" , token) => {
  const url = `${baseUrl}${path}`;

  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "content-type": "application/json",
      ...(token?.token && { authorization: `Bearer ${token.token}` }),
      // authorization:`Bearer ${token?.token}`
      // ...(await authHeader()),
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  return await res.json();
};
