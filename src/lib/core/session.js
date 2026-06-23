import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  return session;
};

export const requireRole = async (role) => {
  const user = await getUserSession();
  if (user?.user?.role !== role) {
    return redirect("/unauthorized");
  }
};
