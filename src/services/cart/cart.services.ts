"use server";
import { env } from "../../../env";
import { cookies } from "next/headers";
import { jwtUtils } from "@/utils/jwtUtils";

interface ProductPayload {
  product_id: string;
  name: string;
  image: string | null;
  price: number;
}

export const addToCart = async (product: ProductPayload, quantity: number) => {
  const cookie = await cookies();
  const accessToken = cookie.get("accessToken")?.value;
  const id = accessToken ? jwtUtils.decodeToken(accessToken).id : null;
  let cartId = cookie.get("cart_id")?.value;

  if (cartId && id && cartId !== id) {
    //merge cart
    await mergeCart();
    cartId = id as string;
  } else if (accessToken && !cartId) {
    cartId = id as string;
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

    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message,
        data: null,
      };
    }

    cookie.set("cart_id", result.data.cart_id);

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

    if (!result.success) {
      return {
        success: false,
        message: result.message,
        data: null,
      };
    }
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

    if (!result.success) {
      return {
        success: false,
        message: result.message,
        data: null,
      };
    }

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateQuantityFromCart = async (
  operation: "increment" | "decrement",
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
        operation,
      }),
    });

    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message,
        data: null,
      };
    }

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
    if (!result.success) {
      throw new Error(result.message);
    }

    return result;
  } catch (error) {
    console.log(error);
  }
};
