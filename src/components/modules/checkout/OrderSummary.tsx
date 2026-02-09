"use client";
import { Button } from "@/components/ui/button";
import useCartSnapshot from "@/hooks/useCartSnapshot";
import useSteps from "@/hooks/useSteps";
import { cartItem } from "@/types";
import { CheckCircle2, Shield, Truck } from "lucide-react";

const OrderSummary = () => {
  const cartSnapShot = useCartSnapshot();
  

  const items: cartItem[] = JSON.parse(cartSnapShot.getCartItemsSnapshot);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const codFee = 2.99; // Cash on delivery fee
  const total = subtotal + shipping + tax + codFee;

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-blue-100 sticky top-24">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

        {/* Products */}
        <div className="space-y-4 mb-6 pb-6 border-b border-blue-100">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="relative">
                <div className="size-20 bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl overflow-hidden">
                  {/* <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          /> */}
                </div>
                <div className="absolute -top-2 -right-2 bg-blue-600 text-white size-6 rounded-full flex items-center justify-center text-xs font-bold">
                  {item.quantity}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 leading-snug mb-1">
                  {item.name}
                </h3>
                <p className="text-blue-600 font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-base">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold text-gray-900">
              ${subtotal.toFixed(2)}
            </span>
          </div>

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

          <div className="flex justify-between text-base">
            <span className="text-gray-600">Tax (8%)</span>
            <span className="font-semibold text-gray-900">
              ${tax.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between text-base">
            <span className="text-gray-600">COD Fee</span>
            <span className="font-semibold text-gray-900">
              ${codFee.toFixed(2)}
            </span>
          </div>

          <div className="border-t border-blue-100 pt-4 flex justify-between">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-3xl font-bold text-blue-600">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        <Button
          type="submit"
          form="checkout-form"
          className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-base font-semibold rounded-2xl shadow-lg shadow-blue-200 hover:shadow-xl transition-all mb-4"
        >
          Place Order
        </Button>

        <p className="text-xs text-center text-gray-500 mb-6">
          By placing your order, you agree to our terms and conditions
        </p>

        {/* Trust Icons */}
        <div className="grid grid-cols-3 gap-3 pt-6 border-t border-blue-100">
          {[
            { icon: Shield, text: "Secure" },
            { icon: Truck, text: "2-3 Days" },
            { icon: CheckCircle2, text: "Verified" },
          ].map((item) => (
            <div key={item.text} className="text-center">
              <div className="bg-blue-50 size-12 rounded-xl flex items-center justify-center mx-auto mb-2">
                <item.icon className="size-5 text-blue-600" />
              </div>
              <p className="text-xs font-semibold text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
