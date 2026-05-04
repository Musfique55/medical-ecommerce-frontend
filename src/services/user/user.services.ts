"use server"
import { cookies } from "next/headers";
import { env } from "../../../env";

export const getSession = async () => {
  try {
    const cookieStores = await cookies();
    const res = await fetch(`${env.AUTH_URL}/me`, {
      headers: {
        Cookie: cookieStores.toString(),
      },
      cache: "no-store",
    });

    const session = await res.json();
    if(!session.success){
      return { data: null, error: session.message };
    }

    return { data: session.data, error: null };
  } catch (error : any) {
    console.log(error);
    return { data: null, error: error.message ||  "something went wrong" };
  }
};
