import { cookies } from "next/headers";
import { env } from "../../../env";

export const userServices = {
  getSession: async () => {
    try {
      const cookieStores = await cookies();
      const res = await fetch(`${env.AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStores.toString(),
        },
        cache: "no-store",
      });

      const session = await res.json();

      return { data: session, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "something went wrong" } };
    }
  },
};
