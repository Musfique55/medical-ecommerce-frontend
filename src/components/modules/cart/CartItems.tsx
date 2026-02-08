"use client";
import { cartServices } from "@/services/cart/cart.services";
import { cartItem } from "@/types";
import { useState, useSyncExternalStore } from "react";
import { Input } from "@/components/ui/input";
import {
  Trash2,
  Plus,
  Minus,
  Shield,
  Truck,
  Lock,
  Tag,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getServerSnapshot = () => {
  return "[]";
};

const CartItems = () => {
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const getCartSnapshot = useSyncExternalStore(
    subscribe,
    cartServices.getCartItemsSnapshot,
    getServerSnapshot,
  );

  const items: cartItem[] = JSON.parse(getCartSnapshot);

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "health10") {
      setPromoApplied(true);
    }
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    cartServices.updateQuantity(id, quantity);
  };

  const handleRemove = (id: string) => {
    cartServices.removeFromCart(id);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 50 ? 0 : 5.99;
  const discount = promoApplied ? subtotal * 0.1 : 0; // 10% discount when promo applied
  const tax = (subtotal - discount) * 0.08; // 8% tax
  const total = subtotal + shipping - discount + tax;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
          Shopping Cart
        </h1>
        <p className="text-lg text-gray-600">
          {items.length} {items.length === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      {items.length === 0 ? (
        // Empty Cart State
        <div className="text-center py-20">
          <div className="bg-blue-50 size-32 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShoppingBag className="size-16 text-blue-300" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Discover our quality medicines and health products to get started
          </p>
          <Link href={"/"}>
            <Button className="bg-blue-600 hover:bg-blue-700 h-14 px-8 text-lg font-semibold rounded-2xl shadow-lg shadow-blue-200 cursor-pointer">
              Start Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 lg:p-8 border border-blue-100 hover:shadow-lg hover:shadow-blue-100/50 transition-all"
              >
                <div className="grid md:grid-cols-4 gap-6">
                  {/* Product Image */}
                  <div className="aspect-square bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl overflow-hidden">
                    {/* <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="w-full h-full object-cover"
                      /> */}
                  </div>

                  {/* Product Info */}
                  <div className="md:col-span-2 space-y-3">
                    <div>
                      <div className="text-xs text-blue-600 font-semibold mb-1 uppercase tracking-wide">
                        {item.category}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Quantity Controls - Mobile */}
                    <div className="md:hidden flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-blue-50 rounded-2xl p-1.5">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-9 rounded-xl hover:bg-white"
                          onClick={() => handleUpdateQuantity(item.id, -1)}
                        >
                          <Minus className="size-4" />
                        </Button>
                        <span className="w-10 text-center font-bold">
                          {item.quantity}
                        </span>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-9 rounded-xl hover:bg-white"
                          onClick={() => handleUpdateQuantity(item.id, 1)}
                        >
                          <Plus className="size-4" />
                        </Button>
                      </div>

                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-9 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl ml-auto"
                        onClick={() => handleRemove(item.id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Price & Actions - Desktop */}
                  <div className="flex md:flex-col justify-between items-end md:items-end">
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600 mb-1">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500">
                        ${item.price.toFixed(2)} each
                      </div>
                    </div>

                    {/* Quantity Controls - Desktop */}
                    <div className="hidden md:flex flex-col gap-3">
                      <div className="flex items-center gap-2 bg-blue-50 rounded-2xl p-1.5">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-9 rounded-xl hover:bg-white"
                          onClick={() => handleUpdateQuantity(item.id, -1)}
                        >
                          <Minus className="size-4" />
                        </Button>
                        <span className="w-10 text-center font-bold">
                          {item.quantity}
                        </span>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-9 rounded-xl hover:bg-white"
                          onClick={() => handleUpdateQuantity(item.id, 1)}
                        >
                          <Plus className="size-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl text-sm"
                        onClick={() => handleRemove(item.id)}
                      >
                        <Trash2 className="size-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Promo Code */}
            <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-3xl p-6 lg:p-8 border border-blue-100">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="size-5 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900">
                  Have a promo code?
                </h3>
              </div>
              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="h-12 bg-white border-blue-200 rounded-xl text-base"
                  disabled={promoApplied}
                />
                <Button
                  onClick={handleApplyPromo}
                  disabled={promoApplied}
                  className="bg-blue-600 hover:bg-blue-700 h-12 px-6 rounded-xl font-semibold whitespace-nowrap"
                >
                  {promoApplied ? "✓ Applied" : "Apply"}
                </Button>
              </div>
              {promoApplied && (
                <p className="text-sm text-green-700 font-semibold mt-3 flex items-center gap-2">
                  <svg
                    className="size-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Promo code applied! You saved 10%
                </p>
              )}
              <p className="text-xs text-gray-600 mt-3">
                💡 Try code: <span className="font-semibold">HEALTH10</span>
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 lg:p-8 border border-blue-100 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">
                    Subtotal ({items.length} items)
                  </span>
                  <span className="font-semibold text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-base">
                    <span className="text-green-600 font-medium">
                      Promo Discount
                    </span>
                    <span className="font-semibold text-green-600">
                      -${discount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-base">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-gray-900">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                {subtotal < 50 && shipping > 0 && (
                  <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded-xl text-sm font-medium">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping! 🚚
                  </div>
                )}

                <div className="flex justify-between text-base">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-semibold text-gray-900">
                    ${tax.toFixed(2)}
                  </span>
                </div>

                <div className="border-t border-blue-100 pt-4 flex justify-between">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-bold text-blue-600">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link href={"/checkout"}>
                <Button className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 h-14 text-base font-semibold rounded-2xl shadow-lg shadow-blue-200 hover:shadow-xl transition-all mb-4">
                  Proceed to Checkout
                  <ChevronRight className="size-5 ml-2" />
                </Button>
              </Link>

              <p className="text-xs text-center text-gray-500 mb-6">
                Secure checkout • Free returns within 30 days
              </p>

              {/* Trust Icons */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-blue-100">
                {[
                  { icon: Lock, text: "Secure" },
                  { icon: Shield, text: "Authentic" },
                  { icon: Truck, text: "Fast Ship" },
                ].map((item) => (
                  <div key={item.text} className="text-center">
                    <div className="bg-blue-50 size-12 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <item.icon className="size-5 text-blue-600" />
                    </div>
                    <p className="text-xs font-semibold text-gray-700">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;
