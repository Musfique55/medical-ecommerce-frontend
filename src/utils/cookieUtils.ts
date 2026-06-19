"use server";
import { cookies } from "next/headers";

export const getCookie = async (key: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value;
};

export const setCookie = async (
  key: string,
  value: string,
  maxAgeInSeconds: number,
) => {
  const cookieStore = await cookies();
  cookieStore.set(key, value, {
    httpOnly: true,
    sameSite: "none",
    maxAge: maxAgeInSeconds,
    path: "/",
    secure: true,
  });
};

export const deleteCookie = async (key: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(key);
};

export const cookieHeaders = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const sessionToken = cookieStore.get("better-auth.session_token")?.value;
  if (!accessToken && !refreshToken && !sessionToken) {
    return "";
  }
  return `accessToken=${accessToken}; refreshToken=${refreshToken}; better-auth.session_token=${sessionToken}`;
};
