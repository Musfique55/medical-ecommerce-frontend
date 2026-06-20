"use server";
import { httpGet } from "@/helper/http-client";

export const getSellerAnalytics = async () => {
  try {
    const res = await httpGet("/seller/analytics");
    return { data: res?.data, error: null };
  } catch (error: any) {
    console.log(error);
    return { data: null, error: error.message };
  }
};
