"use server";
import { httpGet, httpPatch } from "@/helper/http-client";

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
    const res = await httpGet(`/orders`, {
      params: {
        order_status: "CONFIRMED",
      },
    });
    return { data: res.data, error: null };
  } catch (error: any) {
    console.log(error);
    return { data: null, error: error.message };
  }
};
