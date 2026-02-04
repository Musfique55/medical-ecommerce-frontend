import { env } from "../../../env";

export const categoryServices = {
    getCategories : async () => {
      const data = await  fetch(`${env.API_URL}/api/v1/categories`);
      return data.json();
    }
}