interface Params {
  category?: string | undefined;
  retails_price?: { gte?: string };
  "manufacturer.name"?: string | undefined;
  searchTerm?: string | undefined;
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
