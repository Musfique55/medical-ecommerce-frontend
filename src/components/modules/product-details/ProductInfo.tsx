"use client";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";
import {
  Check,
  RotateCcw,
  Shield,
  Star,
  Truck,
} from "lucide-react";
import Image from "next/image";
import CartSection from "./CartSection";
import TabsSection from "./TabsSection";


const ProductInfo = ({ product }: { product: Product }) => {
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative bg-gradient-to-br from-blue-50 to-sky-50 rounded-3xl overflow-hidden aspect-square border border-blue-100">
            <Image
              src={product?.image_url?.[0]}
              alt={product?.name || "fallback"}
              fill
              className="w-full h-full object-cover"
            />
            {product?.discount_value > 0 && (
              <Badge className="absolute top-6 left-6 bg-red-500 hover:bg-red-600 text-white rounded-xl px-4 py-2 text-base font-semibold shadow-lg">
                Save {product?.discount_value}%
              </Badge>
            )}
            {product?.stock === 0 && (
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center">
                <span className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-3 gap-4">
            {/* {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? "border-blue-500 shadow-lg shadow-blue-200"
                      : "border-blue-100 hover:border-blue-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))} */}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="text-sm text-blue-600 font-semibold mb-3 uppercase tracking-wide">
              {product?.category?.category_name}
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {product?.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`size-5 ${
                        i < Math.floor(product?.rating)
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-300 fill-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {/* {product.rating} */}
                </span>
                <span className="text-gray-500">
                  ({product?.reviews?.length} reviews)
                </span>
              </div>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {product?.description}
            </p>
          </div>

          {/* Price */}
          <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-end gap-4 mb-2">
              <div className="text-5xl font-bold text-blue-600">
                $
                {Math.round(
                  product.retails_price -
                    (product.retails_price * product.discount_value) / 100,
                ).toFixed(2)}
              </div>
              {product?.discount_value > 0 && (
                <div className="text-2xl text-gray-400 line-through font-semibold mb-2">
                  $
                  {Number(
                    product?.retails_price ? product.retails_price : 0,
                  ).toFixed(2)}
                </div>
              )}
            </div>
            {product?.stock > 0 && (
              <p className="text-sm text-green-700 font-semibold flex items-center gap-2">
                <Check className="size-4" />
                In Stock - Ships within 24 hours
              </p>
            )}
          </div>

          {/* Quantity Selector */}
          <CartSection product={product} />

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-6">
            {[
              { icon: Shield, text: "100% Authentic" },
              { icon: Truck, text: "Free Shipping" },
              { icon: RotateCcw, text: "Easy Returns" },
            ].map((badge) => (
              <div
                key={badge.text}
                className="bg-white rounded-2xl p-4 text-center border border-blue-100 hover:shadow-lg hover:shadow-blue-100/50 transition-all"
              >
                <badge.icon className="size-6 text-blue-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-gray-700">
                  {badge.text}
                </p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <TabsSection product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
