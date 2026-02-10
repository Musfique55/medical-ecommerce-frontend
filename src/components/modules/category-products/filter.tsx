"use client";
import { Slider } from "@/components/ui/slider";
import { Category, Manufacturer, Product } from "@/types";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";


export default function Filters({
  categories,
  manufacturers,
  products,
  maxPrice
}: {
  categories: Category[];
  manufacturers: Manufacturer[];
  products : Product[];
  maxPrice : number
}) {

  const router = useRouter();
  const searchParams = useSearchParams();
  const manufacturer = searchParams.get("manufacturer");

  const [priceRange,setPriceRange] = useState([maxPrice || 0]);


  const handleMnu = (key: string, value: any) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`,{scroll : false});
  };

  const handlePriceRange = (value : number[]) => {
    setPriceRange(() => (value))
    const params = new URLSearchParams(searchParams.toString());
    params.set("maxPrice", value.toString());
    router.push(`?${params.toString()}`,{scroll : false});
  }

  return (
    <div className="w-64 p-6 font-sans">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Premium Audio</h2>
        <p className="text-sm text-gray-500">
          Discover studio-grade sound with our speakers.
        </p>
      </div>

      {/* Categories Section */}
      <div className="mb-8">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-1.5 cursor-pointer hover:text-gray-900 transition-colors"
            >
              <Link
                href={`/category/${category.slug}`}
                className="text-sm text-gray-700"
              >
                {category.category_name}
              </Link>
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
          onValueChange={handlePriceRange}
          value={priceRange}
          className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
            style={{
              background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${(maxPrice / maxPrice) * 100}%, #e5e7eb ${(maxPrice / maxPrice) * 100}%, #e5e7eb 100%)`,
            }}
          />
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-sm font-medium text-gray-700">
            ${0}
          </span>
          <span className="text-sm font-medium text-gray-700">
            ${maxPrice || 0}
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
                      checked={m.name === manufacturer}
                      onChange={() => handleMnu("manufacturer", m.name)}
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
