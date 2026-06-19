"use server";
import { httpGet } from "@/helper/http-client";
import { env } from "../../../env";

export const getSession = async () => {
  try {
    const res = await httpGet(`${env.AUTH_URL}/me`);

    if (!res.success) {
      return { data: null, error: res.message };
    }

    return { data: res.data, error: null };
  } catch (error: any) {
    console.log(error);
    return { data: null, error: error.message || "something went wrong" };
  }
};

export const getAllUsers = async () => {
  try {
    const users = await httpGet(`admin/users`);

    if (!users.success) {
      return { data: null, error: users.message };
    }

    return { data: users.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || "something went wrong" };
  }
};
