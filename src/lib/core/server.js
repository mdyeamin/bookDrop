"use server";
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";
export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  const data = res.json();
  return data;
};

export const serverMutation = async (path, data, method = "POST") => {
  const url = `${baseUrl}${path}`;
  console.log("dsfdsf", url);

  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "content-type": "application/json",
      // ...(await authHeader()),
    },
    body: data ? JSON.stringify(data) : undefined,
  });
 

  return res.json();
};
