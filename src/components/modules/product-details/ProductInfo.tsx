import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { Check, Heart, Minus, Plus, ShoppingCart } from 'lucide-react';
import Image from 'next/image';


const ProductInfo = ({product} : {product :Product}) => {
    console.log(product);
    return (
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
                    {/* {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`size-5 ${
                          i < Math.floor(product?.rating)
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-300 fill-gray-300"
                        }`}
                      />
                    ))} */}
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
                  ${product?.retails_price ? product.retails_price : 0}
                </div>
                {/* {product.originalPrice && (
                  <div className="text-2xl text-gray-400 line-through font-semibold mb-2">
                    ${product.originalPrice.toFixed(2)}
                  </div>
                )} */}
              </div>
              {product?.stock > 0 && (
                <p className="text-sm text-green-700 font-semibold flex items-center gap-2">
                  <Check className="size-4" />
                  In Stock - Ships within 24 hours
                </p>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-gray-900">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-white rounded-2xl p-2 shadow-sm border border-blue-100">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-12 rounded-xl hover:bg-blue-50"
                    // onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    // disabled={!product.inStock}
                  >
                    <Minus className="size-5" />
                  </Button>
                  <span className="text-2xl font-bold text-gray-900 w-12 text-center">
                    {/* {quantity} */}
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-12 rounded-xl hover:bg-blue-50"
                    // onClick={() => setQuantity(quantity + 1)}
                    // disabled={!product.inStock}
                  >
                    <Plus className="size-5" />
                  </Button>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">
                    {/* ${(product.price * quantity).toFixed(2)} */}
                  </span>{" "}
                  total
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                size="lg"
                className="flex-1 bg-blue-600 hover:bg-blue-700 h-16 text-lg font-semibold rounded-2xl shadow-lg shadow-blue-200 hover:shadow-xl transition-all"
                // onClick={handleAddToCart}
                // disabled={!product.inStock}
              >
                <ShoppingCart className="size-6 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="size-16 rounded-2xl border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
              >
                <Heart className="size-6 text-blue-600" />
              </Button>
            </div>

            {/* Trust Badges */}
            {/* <div className="grid grid-cols-3 gap-4 pt-6">
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
            </div> */}
          </div>
        </div>
    );
};

export default ProductInfo;