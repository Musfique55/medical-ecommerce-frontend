import { env } from "../../../env";

export const categoryServices = {
    getCategories : async () => {
      const data = await  fetch(`${env.API_URL}/categories`);
      return data.json();
    }
}