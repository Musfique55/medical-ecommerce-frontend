import { Package, Truck } from "lucide-react";
import React from "react";

const ActiveShipping = () => {
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
          <p className="text-sm text-gray-500 mb-1">Order #LX-4920</p>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
            AeroSwift Runners - V2
          </h3>
          <p className="text-sm text-gray-600">Est. Delivery: Oct 12, 2023</p>
        </div>
        <button className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl transition-colors text-sm sm:text-base whitespace-nowrap">
          Track Detailed Status
        </button>
      </div>

      {/* Progress Steps */}
      <div className="relative">
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 hidden sm:block"></div>
        <div className="absolute top-6 left-0 w-1/2 h-0.5 bg-teal-500 hidden sm:block"></div>

        <div className="relative grid grid-cols-2 sm:flex sm:justify-between gap-4 sm:gap-0">
          {/* Ordered */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-500 rounded-full flex items-center justify-center mb-2 shadow-lg shadow-teal-200">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-gray-900">
              Ordered
            </span>
          </div>

          {/* Shipped */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-500 rounded-full flex items-center justify-center mb-2 shadow-lg shadow-teal-200">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-gray-900">
              Shipped
            </span>
          </div>

          {/* In Transit */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-500 rounded-full flex items-center justify-center mb-2 shadow-lg shadow-teal-200">
              <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-gray-900">
              In Transit
            </span>
          </div>

          {/* Delivered */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full flex items-center justify-center mb-2">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-400">
              Delivered
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveShipping;
