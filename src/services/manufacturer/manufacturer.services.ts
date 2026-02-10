import { env } from "../../../env";

interface Options {
  cache?: RequestCache;
  revalidate?: number;
}

export const manufacturerServices = {
  getManufacturer: async (options?: Options) => {
    try {
      const url = new URL(`${env.API_URL}/manufacturer`);

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
      return { data : data.data, error: null };
    } catch (error: any) {
      console.log(error);
      return { data: null, error: error.message };
    }
  },
};
