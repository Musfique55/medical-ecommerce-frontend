"use client";

import { Package, DollarSign, AlertCircle, TrendingDown } from "lucide-react";
import { Product } from "@/types";

interface ProductStatsProps {
  products: Product[];
}

export default function ProductStats({ products }: ProductStatsProps) {
  const totalProducts = products.length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;
  const activeDiscounts = products.filter((p) => p.discount_type !== "NONE" && p.discount_value > 0).length;
  const averagePrice = products.length
    ? products.reduce((acc, p) => acc + p.retails_price, 0) / products.length
    : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Products */}
      <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-5 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Total Products
          </span>
          <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-blue-500" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold text-gray-900">{totalProducts}</span>
          <span className="text-xs text-gray-500 font-medium">items active</span>
        </div>
      </div>

      {/* Avg Price */}
      <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-5 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Average Price
          </span>
          <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-teal-600" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold text-gray-900">
            ${averagePrice.toFixed(2)}
          </span>
          <span className="text-xs text-gray-500 font-medium">per product</span>
        </div>
      </div>

      {/* Out of Stock */}
      <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-5 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Out of Stock
          </span>
          <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className={`text-2xl sm:text-3xl font-bold ${outOfStockCount > 0 ? "text-red-600" : "text-gray-900"}`}>
            {outOfStockCount}
          </span>
          <span className="text-xs text-gray-500 font-medium">require restock</span>
        </div>
      </div>

      {/* Active Promos */}
      <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-5 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Active Offers
          </span>
          <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center">
            <TrendingDown className="w-5 h-5 text-amber-500" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold text-gray-900">{activeDiscounts}</span>
          <span className="text-xs text-gray-500 font-medium">discounted</span>
        </div>
      </div>
    </div>
  );
}
