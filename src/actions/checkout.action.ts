"use server";

import { OrderPayload } from "@/types";
import { env } from "../../env";
import { cookies } from "next/headers";

export const placeOrder = async (payload: OrderPayload) => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${env.API_URL}/orders`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log(data);

    if (!data.success) {
      return {
        message: data.message,
        success: false,
        data: null,
      };
    }

    // clear cart
    cookieStore.delete("cart_id");

    return data;
  } catch (error: any) {
    return {
      message: error.message,
      success: false,
      data: null,
    };
  }
};
