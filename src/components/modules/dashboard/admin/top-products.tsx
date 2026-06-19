"use client";
import { Product } from "@/types";
import { Package, ArrowUp, ArrowDown } from "lucide-react";
import Link from "next/link";
import { use } from "react";

interface TopProducts extends Product {
  totalOrders: number;
  totalSold: number;
}

const TopProducts = ({
  topProductsPromise,
}: {
  topProductsPromise: Promise<{ data: TopProducts[]; error: any }>;
}) => {
  const res = use(topProductsPromise);
  const products = res.data;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Top Products</h2>
        <Link
          href="/admin/products"
          className="text-teal-500 hover:text-teal-600 font-semibold text-sm transition-colors"
        >
          View all
        </Link>
      </div>

      <div className="space-y-4">
        {products?.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-xl p-4 hover:border-teal-200 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="w-6 h-6 text-orange-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1 truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {product?.totalOrders.toLocaleString()} sales
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-teal-600 mb-1">
                  ${product?.totalSold * Number(product?.retails_price)}
                </p>
                {/* <div
                  className={`flex items-center justify-end gap-1 text-xs font-semibold ${
                    product.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.trend === "up" ? (
                    <ArrowUp className="w-3 h-3" />
                  ) : (
                    <ArrowDown className="w-3 h-3" />
                  )}
                  {product.percentage}%
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
