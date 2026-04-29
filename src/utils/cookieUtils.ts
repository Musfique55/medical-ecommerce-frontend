"use server"
import { cookies } from "next/headers";

export const getCookie = async (key: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value;
};


export const setCookie = async(key : string,value : string,maxAgeInSeconds : number) => {
    const  cookieStore = await cookies();
    cookieStore.set(key,value,{
        httpOnly : true,
        sameSite : "none",
        maxAge : maxAgeInSeconds,
       path : "/",
       secure : true 
    })
}

export const deleteCookie = async (key : string) => {
    const  cookieStore = await cookies();
    cookieStore.delete(key);
}