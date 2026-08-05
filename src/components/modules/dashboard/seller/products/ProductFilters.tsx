"use client";

import debounce from "lodash/debounce";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
}

export default function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
}: ProductFiltersProps) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("searchTerm") || "");

  const router = useRouter();

  const debouncedSearch = useMemo(() => {
    return debounce((value: string) => {
      const updatedParams = new URLSearchParams(searchParams.toString());
      if (value) {
        updatedParams.set("searchTerm", value);
      } else {
        updatedParams.delete("searchTerm");
      }
      router.push(`/seller/products?${updatedParams.toString()}`);
    }, 500);
  }, [searchParams, router]);

  const onSearchChange = useCallback(
    (value: string) => {
      setSearch(value);
      debouncedSearch(value);
    },
    [debouncedSearch],
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
      {/* Search Bar */}
      <div className="relative w-full md:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-teal-500 transition-all"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 w-full md:w-auto">
        <button
          onClick={() => onCategoryChange("ALL")}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            selectedCategory === "ALL"
              ? "bg-teal-600 text-white"
              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
          }`}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              selectedCategory === cat
                ? "bg-teal-600 text-white"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
