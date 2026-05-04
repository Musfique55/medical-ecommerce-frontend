"use server";
import { env } from "../../../env";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";

interface ProductPayload {
  productId: string;
  name: string;
  image: string | null;
  price: number;
}

export const addToCart = async (product: ProductPayload, quantity: number) => {
  const cookie = await cookies();
  let cartId = cookie.get("cart_id")?.value;
  if (!cartId) {
    cookie.set("cart_id", uuidv4());
    cartId = cookie.get("cart_id")?.value;
  }
  try {
    const res = await fetch(`${env.API_URL}/cart`, {
      method: "POST",
      body: JSON.stringify({
        product,
        quantity,
      }),
      headers: {
        "content-type": "application/json",
        Cookie: `cart_id=${cartId}`,
      },
    });

    if (!res.ok) {
      return {
        success: false,
        message: res.statusText,
        data: null,
      };
    }

    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message,
        data: null,
      };
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

export const getCartItems = async () => {
  try {
    const cookie = await cookies();
    const cartId = cookie.get("cart_id")?.value;
    const res = await fetch(`${env.API_URL}/cart`, {
      headers: {
        Cookie: `cart_id=${cartId}`,
      },
    });

    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const removeProductFromCart = async (productId: string) => {
  try {
    const cookie = await cookies();
    const cartId = cookie.get("cart_id")?.value;
    const res = await fetch(`${env.API_URL}/cart/${productId}`, {
      method: "DELETE",
      headers: {
        Cookie: `cart_id=${cartId}`,
      },
    });

    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateQuantityFromCart = async (
  productId: string,
  quantity: number,
) => {
  try {
    const cookie = await cookies();
    const cartId = cookie.get("cart_id")?.value;
    const res = await fetch(`${env.API_URL}/cart/${productId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Cookie: `cart_id=${cartId}`,
      },
      body: JSON.stringify({
        quantity,
      }),
    });

    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const mergeCart = async () => {
  try {
    const cookie = await cookies();
    const cookieHeaders = cookie.toString();
    const res = await fetch(`${env.API_URL}/cart/merge`, {
      method: "POST",
      headers: {
        Cookie: cookieHeaders,
      },
    });

    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};
