"use client";
import { getSellerOrders } from "@/services/orders/orders.services";
import { useQuery } from "@tanstack/react-query";
import { Package, MoreVertical } from "lucide-react";

const RecentOrders = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["seller-orders", "delivered"],
    queryFn: () =>
      getSellerOrders({
        params: {
          order_status: "DELIVERED",
        },
      }),
  });

  const orders = data?.data || [];

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
        <button className="text-teal-500 hover:text-teal-600 font-semibold text-sm transition-colors">
          View all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Order Info
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Total
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  No recent orders found.
                </td>
              </tr>
            ) : (
              orders.map((order: any) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Package className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            {order.customer?.name || order.customer}
                          </p>
                          <p className="text-xs text-gray-500">
                            {order.order_number || order.id}
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 align-top">
                    <p className="text-sm text-gray-600">
                      {order.created_at
                        ? new Date(order.created_at).toLocaleDateString()
                        : order.date}
                    </p>
                  </td>
                  <td className="py-4 px-4 align-top">
                    <p className="text-sm font-semibold text-gray-900">
                      {order.total_amount
                        ? `$${Number(order.total_amount).toFixed(2)}`
                        : order.total}
                    </p>
                  </td>
                  <td className="py-4 px-4 align-top">
                    <p
                      className={`text-sm font-semibold ${
                        (order.order_status || order.status) === "DELIVERED"
                          ? "text-green-600"
                          : (order.order_status || order.status) ===
                                "PROCESSING" ||
                              (order.order_status || order.status) === "PENDING"
                            ? "text-blue-600"
                            : (order.order_status || order.status) === "SHIPPED"
                              ? "text-purple-600"
                              : "text-orange-600"
                      }`}
                    >
                      {order.order_status || order.status}
                    </p>
                  </td>
                  <td className="py-4 px-4 text-center align-top">
                    <button className="p-1 hover:bg-gray-200 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-500" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
