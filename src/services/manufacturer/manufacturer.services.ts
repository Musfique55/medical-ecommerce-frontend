interface Options {
  cache?: RequestCache;
  revalidate?: number;
}

export const getManufacturer = async (options?: Options) => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/manufacturer`);

    const config: RequestInit = {};

    if (options?.cache) {
      config.cache = options.cache;
    }

    if (options?.revalidate) {
      config.next = { revalidate: options.revalidate };
    }

    const res = await fetch(url, config);

    if (!res.ok) {
      throw new Error("something went wrong");
    }

    const data = await res.json();
    if (!data.success) {
      return [];
    }
    return data.data;
  } catch (error: any) {
    console.log(error);
    return [];
  }
};
