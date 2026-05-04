"use server";

import { OrderPayload } from "@/types";
import { env } from "../../env";
import { cookies } from "next/headers";

export const placeOrder = async (payload: OrderPayload) => {
  try {
    console.log(payload);
    const cookieStore = await cookies();
    const res = await fetch(`${env.API_URL}/orders`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    console.log(res);

    if (!res.ok) {
      throw new Error("Order Failed");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
