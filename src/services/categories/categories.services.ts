export const getCategories = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
    if (!res.ok) {
      return [];
    }
    const result = await res.json();

    if (!result.success) {
      return [];
    }

    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
