"use client";
import { getProducts } from "@/services/products/products.services";
import { ProductCard } from "../layout/ProductCard";
import Filters from "./filter";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getCategories } from "@/services/categories/categories.services";
import { getManufacturer } from "@/services/manufacturer/manufacturer.services";
import { Product } from "@/types";
import { useSearchParams } from "next/navigation";

export default function CategoryWrapper() {
  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "";
  const searchTerm = searchParams.get("searchTerm") || "";
  const retails_price = searchParams.get("retails_price[gte]") || "";
  const manufacturer = searchParams.get("manufacturer") || "";

  const { data: products, isFetching } = useQuery({
    queryKey: [
      "products",
      { category, searchTerm, retails_price, manufacturer },
    ],
    queryFn: () =>
      getProducts({
        retails_price: retails_price ? { gte: retails_price } : undefined,
        searchTerm: searchTerm || undefined,
        category: category || undefined,
        "manufacturer.name": manufacturer || undefined,
      }),
    placeholderData: keepPreviousData,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
  const { data: manufacturers } = useQuery({
    queryKey: ["manufacturers"],
    queryFn: () => getManufacturer(),
  });

  const maxPrice =
    (products as Product[] | undefined)?.reduce(
      (max: number, item: Product) => Math.max(max, item.retails_price),
      0,
    ) ?? 0;

  return (
    <div className="flex p-8 bg-gray-50">
      <Filters
        categories={categories}
        manufacturers={manufacturers}
        maxPrice={maxPrice}
      />
      <div
        className={`grid grid-cols-3 gap-5 flex-1 transition-opacity duration-200 ${
          isFetching ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        {(products as Product[] | undefined)?.length
          ? (products as Product[]).map((item: Product) => (
              <ProductCard key={item.id} product={item} />
            ))
          : !isFetching && (
              <div className="col-span-3 text-center py-12 text-gray-500">
                No products found
              </div>
            )}
      </div>
    </div>
  );
}
