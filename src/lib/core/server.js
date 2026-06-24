"use server";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, { cache: "no-store" });
  const data = await res.json();
  return data;
};

export const secureServerFetch = async (path, token) => {
  const res = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
    "content-type": "application/json",
    headers: {
      ...(token && { authorization: `Bearer ${token}` }),
    },
  });
  const data = await res.json();
  return data;
};

export const serverMutation = async (path, data, method = "POST", token) => {
  const url = `${baseUrl}${path}`;

  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "content-type": "application/json",
      ...(token && { authorization: `Bearer ${token}` }),
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  return await res.json();
};
