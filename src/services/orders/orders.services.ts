"use server";
import { cookies } from "next/headers";
import { env } from "../../../env";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { httpGet, httpPatch } from "@/helper/http-client";

async function getCookieData(): Promise<ReadonlyRequestCookies> {
  return new Promise((resolve) =>
    setTimeout(async () => {
      // cookies will be called outside of the async context, causing a build-time error
      const cookieStore = await cookies();
      resolve(cookieStore);
    }, 1000),
  );
}

export const getCustomerOrders = async (params?: Record<string, unknown>) => {
  try {
    const res = await httpGet(`/orders`, { params });

    return { data: res, error: null };
  } catch (error: any) {
    console.log(error);
    return { data: null, error: error.message };
  }
};
export const getSellerOrders = async ({
  params,
}: {
  params?: Record<string, unknown>;
}) => {
  try {
    const res = await httpGet(`/seller/orders`, { params });
    return { data: res?.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

export const updateOrderStatus = async (id: string, order_status: string) => {
  try {
    const res = await httpPatch(`/seller/orders/${id}`, {
      body: { order_status },
    });
    return { data: res?.data, error: null };
  } catch (error: any) {
    console.log(error);
    return { data: null, error: error.message };
  }
};

export const getDeliveredOrders = async () => {
  try {
    const res = await httpGet(`/orders`, {
      params: {
        order_status: "DELIVERED",
      },
    });

    return { data: res.data, error: null };
  } catch (error: any) {
    console.log(error);
    return { data: null, error: error.message };
  }
};

export const getActiveShippedOrders = async () => {
  try {
    const cookieData = await getCookieData();
    const res = await fetch(`${env.API_URL}/orders?order_status=CONFIRMED`, {
      headers: {
        "content-type": "application/json",
        Cookie: cookieData.toString(),
      },
    });
    const data = await res.json();
    return { data: data.data, error: null };
  } catch (error: any) {
    console.log(error);
    return { data: null, error: error.message };
  }
};
