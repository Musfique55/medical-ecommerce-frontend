"use server";
import { env } from "../../../env";

export const getCategories = async () => {
  try {
    const data = await fetch(`${env.API_URL}/categories`);
    return data.json();
  } catch (error) {
    console.log(error);
  }
};
