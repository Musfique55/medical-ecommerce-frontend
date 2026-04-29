"use server";
import { cookies } from "next/headers";
import { env } from "../../../env";
import { setToken } from "@/utils/tokenUtils";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export const login = async (email: string, password: string) => {
  const res = await fetch(`${env.AUTH_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!res.ok) {
    console.log(res);
    return {
      message: "Something went wrong",
      data: null,
      success: false,
    };
  }

  const data = await res.json();
  if (!data.success) {
    return {
      message: data.message,
      data: null,
      success: false,
    };
  }

  await setToken("accessToken", data.data.accessToken, 60 * 15);
  await setToken("refreshToken", data.data.refreshToken, 60 * 60 * 60 * 24 * 7);
  await setToken(
    "better-auth.session_token",
    data.data.token,
    60 * 60 * 60 * 24 * 7,
  );

  return {
    data: data.data,
    success: data.success,
    message: data.message,
  };
};

export const register = async (payload: RegisterPayload) => {
  try {
    const res = await fetch(`${env.AUTH_URL}/register`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json",
      },
    });

    if (!res.ok) {
      return {
        success: false,
        data: null,
        error: res.statusText,
      };
    }

    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        data: null,
        error: result.message,
      };
    }

    await setToken("accessToken", result.data.accessToken, 60 * 15);
    await setToken(
      "refreshToken",
      result.data.refreshToken,
      60 * 60 * 60 * 24 * 7,
    );

    return {
      success: true,
      data: result.data,
      error: null,
    };
  } catch (error: any) {
    return {
      success: false,
      data: null,
      error: error.message,
    };
  }
};

export const verifyEmail = async (email: string, otp: string) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name} : ${cookie.value}`)
    .join("; ");
  try {
    const res = await fetch(`${env.AUTH_URL}/verify-email`, {
      method: "POST",
      body: JSON.stringify({
        email,
        otp,
      }),
      headers: {
        "content-type": "application/json",
        Cookie: cookieHeader,
      },
    });

    if (!res.ok) {
      return {
        success: true,
        message: res.statusText,
      };
    }

    const result = await res.json();

    return {
      success: true,
      message: result.message,
    };
  } catch (error: any) {
    return {
      success: true,
      message: error.statusText,
    };
  }
};

export const newRefreshToken = async () => {
  try {
    const cookieStore = await cookies();
    const cookieHeaders = cookieStore.getAll().map(cookie => `${cookie.name}=${cookie.value}`).join("; ");

    const res = await fetch(`${env.AUTH_URL}/refresh-token`,{
      method : "POST",
      headers : {
        Cookie : cookieHeaders,
        "content-type" : "application/json"
      }
    })

    const result = await res.json();

    await setToken("accessToken",result.data.accessToken,60 * 15)
    await setToken("refreshToken",result.data.accessToken,60 * 60 * 60 * 24 * 7)
    await setToken("better-auth.session_token",result.data.accessToken,60 * 60 * 60 * 24 * 7)

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
