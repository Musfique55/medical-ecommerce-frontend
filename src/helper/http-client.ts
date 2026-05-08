"use server";
import axios from "axios";
import { env } from "../../env";
import { cookies } from "next/headers";
import { newRefreshToken } from "@/services/auth/auth.services";

interface AxiosRequestConfig {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
}

const axiosInstance = async () => {
  const cookieData = await cookies();
  const accessToken = cookieData.get("accessToken")?.value;
  const refreshToken = cookieData.get("refreshToken")?.value;
  const sessionToken = cookieData.get("better-auth.session_token")?.value;

  if (!accessToken && refreshToken) {
    await newRefreshToken();
  }

  const cookieHeader = `accessToken=${accessToken}; refreshToken=${refreshToken}; better-auth.session_token=${sessionToken}`;

  const instance = axios.create({
    baseURL: env.API_URL,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        await newRefreshToken();
        const cookieData = await cookies();
        const cookieHeader = `access_token=${cookieData.get("access_token")?.value}; refresh_token=${cookieData.get("refresh_token")?.value}; better-auth.session_token=${cookieData.get("better-auth.session_token")?.value}`;
        originalRequest.headers.Cookie = cookieHeader;
        return instance(originalRequest);
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

const httpGet = async (url: string, options?: AxiosRequestConfig) => {
  try {
    const params = new URLSearchParams();
    for (const key in options?.params) {
      const value = options.params[key];
      if (value === undefined || value === "" || value === null) continue;
      params.append(key, String(value));
    }

    const finalURL = `${url}?${params.toString()}`;

    const instance = await axiosInstance();
    const response = await instance.get(finalURL, {
      headers: options?.headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const httpPost = async (url: string, options?: AxiosRequestConfig) => {
  try {
    const instance = await axiosInstance();
    const response = await instance.post(url, options?.body, {
      headers: options?.headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const httpPut = async (url: string, options?: AxiosRequestConfig) => {
  try {
    const instance = await axiosInstance();
    const response = await instance.put(url, options?.body, {
      headers: options?.headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const httpPatch = async (url: string, options?: AxiosRequestConfig) => {
  try {
    const instance = await axiosInstance();
    const response = await instance.patch(url, options?.body, {
      headers: options?.headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const httpDelete = async (url: string, options?: AxiosRequestConfig) => {
  try {
    const instance = await axiosInstance();
    const response = await instance.delete(url, {
      headers: options?.headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { httpGet, httpPost, httpPut, httpPatch, httpDelete };
