"use server"
import { env } from "../../../env";


 export const getCategories = async () => {
      const data = await  fetch(`${env.API_URL}/categories`);
      return data.json();
    }
