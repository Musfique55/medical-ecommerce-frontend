"use client";

import {
  Package,
  Layers,
  AlertCircle,
  CheckCircle,
  Edit3,
  Trash2,
  FileText,
} from "lucide-react";
import { Product } from "@/types";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductTable({
  products,
  onEdit,
  onDelete,
}: ProductTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xs border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/50">
              <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Product Info
              </th>
              <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Manufacturer
              </th>
              <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Purchase Price
              </th>
              <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Retail Price
              </th>
              <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Stock Status
              </th>
              <th className="text-center py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products?.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-gray-500">
                  <div className="max-w-xs mx-auto space-y-2">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto" />
                    <p className="font-semibold text-gray-700">
                      No products found
                    </p>
                    <p className="text-xs text-gray-400">
                      There are no medicines in this category matching your
                      search.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const hasDiscount =
                  product.discount_type !== "NONE" &&
                  product.discount_value > 0;
                const finalPrice =
                  product.discount_type === "FIXED"
                    ? Math.max(
                        0,
                        product.retails_price - product.discount_value,
                      )
                    : product.discount_type === "PERCENTAGE"
                      ? product.retails_price -
                        (product.retails_price * product.discount_value) / 100
                      : product.retails_price;

                return (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    {/* Product details */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {product.image_url?.[0] ? (
                            <img
                              src={product.image_url[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package className="w-5 h-5 text-teal-600" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-gray-900 text-sm truncate max-w-[200px] sm:max-w-[300px]">
                            {product.name}
                          </h3>
                          <p className="text-xs text-gray-500 truncate max-w-[200px] sm:max-w-[300px]">
                            {product.description || "No description provided."}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-6 align-middle">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700">
                        <Layers className="w-3 h-3 text-gray-400" />
                        {product.category?.category_name || "Uncategorized"}
                      </span>
                    </td>

                    {/* Manufacturer */}
                    <td className="py-4 px-6 align-middle text-sm text-gray-600 font-medium">
                      {product.manufacturer?.name || "Unknown"}
                    </td>

                    <td className="py-4 px-6 align-middle text-sm font-semibold text-gray-700">
                      {product.purchase_price !== undefined && product.purchase_price !== null ? (
                        `$${Number(product.purchase_price).toFixed(2)}`
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>

                    {/* Retail Price */}
                    <td className="py-4 px-6 align-middle">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 text-sm">
                          ${finalPrice.toFixed(2)}
                        </span>
                        {hasDiscount && (
                          <span className="text-xs text-gray-400 line-through">
                            ${Number(product.retails_price).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Stock status */}
                    <td className="py-4 px-6 align-middle">
                      {product.stock === 0 ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-red-50 text-red-600">
                          <AlertCircle className="w-3.5 h-3.5" />
                          Out of Stock
                        </span>
                      ) : product.stock <= 50 ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-600">
                          <AlertCircle className="w-3.5 h-3.5" />
                          Low Stock ({product.stock})
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-green-50 text-green-700">
                          <CheckCircle className="w-3.5 h-3.5" />
                          In Stock ({product.stock})
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-center align-middle">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onEdit(product)}
                          className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(product)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
