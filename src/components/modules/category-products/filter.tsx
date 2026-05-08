"use client";
import { Slider } from "@/components/ui/slider";
import { Category, Manufacturer } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useOptimistic, useState } from "react";

export default function Filters({
  categories,
  manufacturers,
  maxPrice,
}: {
  categories: Category[];
  manufacturers: Manufacturer[];
  maxPrice: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") || "";
  const activeManufacturer = searchParams.get("manufacturer") || "";

  const [optimisticCategory, setOptimisticCategory] =
    useOptimistic(activeCategory);
  const [optimisticManufacturer, setOptimisticManufacturer] =
    useOptimistic(activeManufacturer);

  const [priceRange, setPriceRange] = useState([maxPrice || 0]);

  const handleFilter = (key: string, value: string) => {
    startTransition(() => {
      if (key === "category") setOptimisticCategory(value);
      if (key === "manufacturer") setOptimisticManufacturer(value);

      const params = new URLSearchParams(searchParams.toString());

      // Toggle: if same value is clicked again, remove the filter
      console.log(key, value);
      if (params.get(key) === value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="w-64 p-6 font-sans shrink-0">
      {/* Categories Section */}
      <div className="mb-8">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`flex items-center justify-between py-1.5 cursor-pointer transition-colors ${
                optimisticCategory === category.slug
                  ? "text-teal-600 font-medium"
                  : "hover:text-gray-900"
              }`}
              onClick={() => handleFilter("category", category.slug)}
            >
              <span className="text-sm">{category.category_name}</span>
              <span className="text-xs text-gray-400 bg-white px-2 py-0.5 rounded">
                {category.product_count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Section */}
      <div className="mb-8">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Price Range
        </h3>
        <div className="relative">
          <Slider
            max={maxPrice}
            step={5}
            onValueChange={(value) => setPriceRange(value)}
            onValueCommit={(value) => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("retails_price[gte]", value.toString());
              router.push(`?${params.toString()}`, { scroll: false });
            }}
            value={priceRange}
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
            style={{
              background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${(priceRange[0] / (maxPrice || 1)) * 100}%, #e5e7eb ${(priceRange[0] / (maxPrice || 1)) * 100}%, #e5e7eb 100%)`,
            }}
          />
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-sm font-medium text-gray-700">${0}</span>
          <span className="text-sm font-medium text-gray-700">
            ${priceRange[0] || 0}
          </span>
        </div>
      </div>

      {/* Manufacturer Section */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Manufacturer
        </h3>
        <div className="space-y-3">
          {manufacturers.length > 0 &&
            manufacturers.map((m) => {
              return (
                <div key={m.id} className="space-y-3">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={m.name === optimisticManufacturer}
                      onChange={() => handleFilter("manufacturer", m.name)}
                      className="w-4 h-4 text-teal-500 border-gray-300 rounded focus:ring-teal-500 focus:ring-2"
                    />
                    <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                      {m.name}
                    </span>
                  </label>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
