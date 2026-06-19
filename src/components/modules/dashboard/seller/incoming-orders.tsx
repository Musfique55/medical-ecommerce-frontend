"use client";
import {
  getSellerOrders,
  updateOrderStatus,
} from "@/services/orders/orders.services";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Package, Calendar, User, ShoppingBag, Loader2 } from "lucide-react";
import { toast } from "sonner";

const IncomingOrders = () => {
  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["seller-orders", "pending"],
    queryFn: () => getSellerOrders({ params: { order_status: "PENDING" } }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateOrderStatus(id, status),
    onSuccess: (res) => {
      console.log(res);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Order status updated successfully!");
        queryClient.invalidateQueries({ queryKey: ["seller-orders"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update status.");
    },
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Incoming Orders</h2>
          <p className="text-sm text-gray-500 mt-1">
            Review and process your new orders
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {orders?.data && orders?.data?.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              No incoming orders yet
            </h3>
            <p className="text-gray-500">
              When customers place new orders, they will appear here.
            </p>
          </div>
        ) : (
          orders?.data?.map((order: any) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200"
            >
              {/* Order Header */}
              <div className="bg-gray-50/50 p-5 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Order ID
                    </p>
                    <p className="font-bold text-gray-900">
                      #{order.order_number || order.id.slice(0, 8)}
                    </p>
                  </div>
                  <div className="hidden sm:block w-px h-8 bg-gray-200"></div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Date
                    </p>
                    <div className="flex items-center text-gray-900 font-medium">
                      <Calendar className="w-4 h-4 mr-1.5 text-gray-400" />
                      {new Date(
                        order.created_at || new Date(),
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="hidden sm:block w-px h-8 bg-gray-200"></div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Customer
                    </p>
                    <div className="flex items-center text-gray-900 font-medium">
                      <User className="w-4 h-4 mr-1.5 text-gray-400" />
                      {order.customer?.name || "Guest User"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Total
                    </p>
                    <p className="font-bold text-teal-600">
                      ${Number(order.total_amount || 0).toFixed(2)}
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${
                      (order.order_status || order.status) === "DELIVERED"
                        ? "bg-green-100 text-green-700"
                        : (order.order_status || order.status) ===
                              "PROCESSING" ||
                            (order.order_status || order.status) === "PENDING"
                          ? "bg-blue-100 text-blue-700"
                          : (order.order_status || order.status) === "SHIPPED"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.order_status || order.status || "PENDING"}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-5">
                <p className="text-sm font-semibold text-gray-900 mb-4">
                  Items Ordered
                </p>
                <div className="space-y-4">
                  {order.order_items?.map((item: any, index: number) => (
                    <div
                      key={item.id || index}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group"
                    >
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden shadow-xs">
                        {item.product?.images?.[0] ? (
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <Package className="w-6 h-6 text-gray-400" />
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-base truncate mb-1">
                          {item.product?.name || "Unknown Product"}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty:{" "}
                          <span className="font-semibold text-gray-700">
                            {item.quantity}
                          </span>
                        </p>
                      </div>

                      {/* Price Calculation */}
                      <div className="text-right">
                        <p className="font-bold text-gray-900 text-base">
                          $
                          {(
                            Number(item.unit_price) * Number(item.quantity)
                          ).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 font-medium">
                          ${Number(item.unit_price).toFixed(2)} each
                        </p>
                      </div>
                    </div>
                  ))}

                  {(!order.order_items || order.order_items.length === 0) && (
                    <div className="text-sm text-gray-500 italic py-2">
                      No items details available for this order.
                    </div>
                  )}
                </div>
              </div>

              {/* Order Actions */}
              <div className="bg-gray-50/50 p-4 border-t border-gray-100 flex items-center justify-end gap-3">
                {updateStatusMutation.isPending &&
                updateStatusMutation.variables.id === order.id ? (
                  <div className="flex items-center text-sm text-gray-500 gap-2 font-medium">
                    <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
                    Updating order status...
                  </div>
                ) : (
                  <>
                    {(order.order_status || order.status) === "PENDING" && (
                      <>
                        <button
                          onClick={() =>
                            updateStatusMutation.mutate({
                              id: order.id,
                              status: "CANCELLED",
                            })
                          }
                          className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          Cancel Order
                        </button>
                        <button
                          onClick={() =>
                            updateStatusMutation.mutate({
                              id: order.id,
                              status: "CONFIRMED",
                            })
                          }
                          className="px-4 py-2 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition-colors"
                        >
                          Accept & Process
                        </button>
                      </>
                    )}
                    {(order.order_status || order.status) === "CONFIRMED" && (
                      <button
                        onClick={() =>
                          updateStatusMutation.mutate({
                            id: order.id,
                            status: "SHIPPED",
                          })
                        }
                        className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
                      >
                        Mark as Shipped
                      </button>
                    )}
                    {(order.order_status || order.status) === "SHIPPED" && (
                      <button
                        onClick={() =>
                          updateStatusMutation.mutate({
                            id: order.id,
                            status: "DELIVERED",
                          })
                        }
                        className="px-4 py-2 text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-sm transition-colors"
                      >
                        Mark as Delivered
                      </button>
                    )}
                    {(order.order_status || order.status) === "CANCELLED" && (
                      <span className="text-sm font-medium text-gray-500 italic">
                        This order was cancelled.
                      </span>
                    )}
                    {(order.order_status || order.status) === "DELIVERED" && (
                      <span className="text-sm font-medium text-green-600">
                        This order has been delivered! 🎉
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default IncomingOrders;
