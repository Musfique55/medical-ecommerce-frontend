"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Package, Truck, ArrowRight } from "lucide-react";
import Link from "next/link";
import useSteps from "@/hooks/useSteps";

const OrderConfirmation = () => {
  const steps = useSteps((state) => state.steps);
  // Just in case we want to show order details later
  // For now, we show a generic premium confirmation UI

  return (
    <div className="lg:col-span-3">
      <div className="bg-white rounded-3xl p-8 lg:p-12 border border-blue-100 text-center max-w-3xl mx-auto shadow-sm">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-50"></div>
            <div className="relative bg-green-50 text-green-500 rounded-full p-4 border-4 border-green-100">
              <CheckCircle2 className="size-16" />
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
          Thank you for your purchase. We've received your order and are getting it ready for shipment. You will receive an email confirmation shortly.
        </p>

        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 md:p-8 mb-10 flex flex-col sm:flex-row items-center justify-center gap-8 text-left">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-xl shadow-sm border border-blue-100 text-blue-600">
              <Package className="size-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Order Status</p>
              <p className="font-semibold text-gray-900">Processing</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-12 bg-blue-200"></div>
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-xl shadow-sm border border-blue-100 text-blue-600">
              <Truck className="size-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Delivery Method</p>
              <p className="font-semibold text-gray-900">Cash on Delivery</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-base font-semibold rounded-2xl shadow-lg shadow-blue-200 hover:shadow-xl transition-all">
            <Link href="/products">
              Continue Shopping
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-14 px-8 text-blue-600 border-blue-200 hover:bg-blue-50 text-base font-semibold rounded-2xl transition-all group">
            <Link href="/dashboard/orders" className="flex items-center gap-2">
              View My Orders
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
