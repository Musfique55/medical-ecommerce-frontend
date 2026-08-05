import {
  httpGet,
  httpPost,
  httpPut,
  httpPatch,
  httpDelete,
} from "@/helper/http-client";

interface Params {
  category?: string | undefined;
  retails_price?: { gte?: string };
  manufacturer?: string | undefined;
  searchTerm?: string | undefined;
  isFeatured?: boolean | undefined;
}

interface SellerOptions {
  searchTerm?: string | undefined;
  category?: string | undefined;
}

interface Options {
  cache?: RequestCache;
  revalidate?: number;
}

export const getProducts = async (params?: Params, options?: Options) => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/medicines`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") return;

        // Handle nested objects like retails_price: { gte: "32" } → retails_price[gte]=32
        if (typeof value === "object") {
          Object.entries(value).forEach(([nestedKey, nestedValue]) => {
            if (
              nestedValue !== undefined &&
              nestedValue !== null &&
              nestedValue !== ""
            ) {
              url.searchParams.append(
                `${key}[${nestedKey}]`,
                nestedValue as string,
              );
            }
          });
        } else {
          url.searchParams.append(key, value);
        }
      });
    }

    const config: RequestInit = {};

    if (options?.cache) {
      config.cache = options.cache;
    }

    if (options?.revalidate) {
      config.next = { revalidate: options.revalidate };
    }

    const res = await fetch(url.toString(), config);
    const data = await res.json();

    return data.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getProduct = async (slug: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/medicines/${slug}`,
    );
    const data = await res.json();

    return { data: data.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const getSellerProducts = async (params?: SellerOptions) => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/seller/medicines`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") return;
        url.searchParams.append(key, value as string);
      });
    }
    console.log(url.toString());
    const result = await httpGet(url.toString());
    return result;
  } catch (error: any) {
    // throw new Error(error.message);
    console.log(error);
  }
};

export const createSellerProduct = async (data: Record<string, unknown>) => {
  try {
    const res = await httpPost(
      `${process.env.NEXT_PUBLIC_API_URL}/seller/medicines`,
      {
        body: data,
      },
    );
    return { data: res, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || "Failed to create product" };
  }
};

export const updateSellerProduct = async (
  id: string,
  data: Record<string, unknown>,
) => {
  try {
    const res = await httpPut(
      `${process.env.NEXT_PUBLIC_API_URL}/seller/medicines/${id}`,
      {
        body: data,
      },
    );
    return { data: res, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || "Failed to update product" };
  }
};

export const deleteSellerProduct = async (id: string) => {
  try {
    const res = await httpDelete(
      `${process.env.NEXT_PUBLIC_API_URL}/seller/medicines/${id}`,
    );
    return { data: res, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || "Failed to delete product" };
  }
};

export const updateSellerProductStock = async (id: string, stock: number) => {
  try {
    const res = await httpPatch(
      `${process.env.NEXT_PUBLIC_API_URL}/seller/medicines/${id}/stock`,
      {
        body: { stock },
      },
    );
    return { data: res, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || "Failed to update stock" };
  }
};

export const getTopProducts = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/medicines/top-medicines`,
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return { data: null, error };
  }
};
