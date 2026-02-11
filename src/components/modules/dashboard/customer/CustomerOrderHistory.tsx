import { orderServices } from "@/services/orders/orders.services";
import { Order } from "@/types";
import { Package } from "lucide-react";
import Link from "next/link";

const CustomerOrderHistory = async () => {
  const orders = await orderServices.getDeliveredOrders();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          Order History
        </h2>
        <Link href={"/dashboard/history"}>
          <button className="text-teal-500 hover:text-teal-600 font-semibold text-sm transition-colors cursor-pointer">
            View all history
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Order 1 */}
        {orders.data.length > 0 &&
          orders.data.slice(0, 2).map((item: Order) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-xl p-4 hover:border-teal-200 transition-colors"
            >
              <div className="flex gap-3 sm:gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package className="w-7 h-7 sm:w-8 sm:h-8 text-orange-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      #{item.order_number}
                    </span>
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                      {item.order_items[0].name}
                    </h3>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-teal-600 mb-2">
                    ${item.total_amount}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <p className="text-xs sm:text-sm text-gray-500">
                      Delivered on Sep 24
                    </p>
                    <button className="text-teal-500 hover:text-teal-600 font-semibold text-xs sm:text-sm transition-colors text-left sm:text-right">
                      Buy Again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CustomerOrderHistory;
