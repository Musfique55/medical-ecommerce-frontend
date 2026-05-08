import CategoryWrapper from "@/components/modules/category-products/category-wrapper";
import { getCategories } from "@/services/categories/categories.services";
import { getManufacturer } from "@/services/manufacturer/manufacturer.services";
import { getProducts } from "@/services/products/products.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const AllCategoriesProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const {
    "retails_price[gte]": retails_price,
    searchTerm,
    category,
    manufacturer,
  } = await searchParams;

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: [
        "products",
        {
          category: category || "",
          searchTerm: searchTerm || "",
          retails_price: retails_price || "",
          manufacturer: manufacturer || "",
        },
      ],
      queryFn: () =>
        getProducts({
          retails_price: retails_price ? { gte: retails_price } : undefined,
          searchTerm: searchTerm || undefined,
          category: category || undefined,
          "manufacturer.name": manufacturer || undefined,
        }),
    }),
    queryClient.prefetchQuery({
      queryKey: ["categories"],
      queryFn: () => getCategories(),
    }),
    queryClient.prefetchQuery({
      queryKey: ["manufacturers"],
      queryFn: () => getManufacturer(),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoryWrapper />
    </HydrationBoundary>
  );
};

export default AllCategoriesProductsPage;
