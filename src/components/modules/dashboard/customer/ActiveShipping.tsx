"use client";
import { orderStatus } from "@/constants/orderStatus";
import { Order } from "@/types";
import { Check, Package, Truck } from "lucide-react";

const STATUS_SEQUENCE = [
  orderStatus.CONFIRMED,
  orderStatus.SHIPPED,
  orderStatus.DELIVERED,
];

const ActiveShipping = ({ activeOrder }: { activeOrder: Order[] }) => {
  const currentOrder = activeOrder?.[0];

  const currentStatus = currentOrder?.order_status;

  const activeIndex = STATUS_SEQUENCE.indexOf(currentStatus);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <Truck className="w-5 h-6 text-teal-600" />
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Active Shipment
          </h2>
        </div>
        <span className="px-3 py-1 bg-teal-50 text-teal-600 text-xs font-bold uppercase rounded-full w-fit">
          Arriving Thursday
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-200 rounded-xl flex items-center justify-center flex-shrink-0">
          <Package className="w-8 h-8 sm:w-10 sm:h-10 text-orange-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-500 mb-1">
            #{activeOrder?.[0]?.order_number}
          </p>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
            {activeOrder?.[0]?.order_items?.[0]?.name}
          </h3>
          <p className="text-sm text-gray-600">Est. Delivery: Oct 12, 2023</p>
        </div>
        <button className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl transition-colors text-sm sm:text-base whitespace-nowrap">
          Track Detailed Status
        </button>
      </div>

      {/* Progress Steps */}
      <div className="relative mt-8">
        {/* Background Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 hidden sm:block"></div>

        {/* Dynamic Progress Line */}
        <div
          className="absolute top-5 left-0 h-0.5 bg-teal-500 transition-all duration-500 hidden sm:block"
          style={{
            width: `${(activeIndex / (STATUS_SEQUENCE.length - 1)) * 100}%`,
          }}
        ></div>

        <div className="relative flex justify-between gap-4">
          {STATUS_SEQUENCE.map((status, index) => {
            const isCompleted = index < activeIndex;
            const isActive = index === activeIndex;

            return (
              <div key={status} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2 transition-colors duration-300 z-10 
                  ${isActive || isCompleted ? "bg-teal-500 shadow-lg shadow-teal-100" : "bg-gray-200"}`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <Package
                      className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`}
                    />
                  )}
                </div>
                <span
                  className={`text-xs sm:text-sm font-semibold capitalize 
                  ${isActive || isCompleted ? "text-gray-900" : "text-gray-400"}`}
                >
                  {status.toLowerCase()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActiveShipping;
