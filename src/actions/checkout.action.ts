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

    if (!data.success) {
      throw new Error(data.message);
    }

    // clear cart
    cookieStore.delete("cart_id");

    return data;
  } catch (error) {
    console.log(error);
  }
};
