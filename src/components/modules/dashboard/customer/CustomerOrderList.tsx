"use client";

import { use, useState, useTransition } from "react";
import { Order } from "@/types";
import {
  Package,
  Search,
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { orderStatus } from "@/constants/orderStatus";
import { useRouter, useSearchParams } from "next/navigation";
import CustomerOrderListSkeleton from "./CustomerOrderListSkeleton";

export default function CustomerOrderList({
  ordersPromise,
}: {
  ordersPromise: Promise<{
    data: { data: Order[]; meta?: any } | null;
    error: string | null;
  }>;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const tabs = [
    { id: "ALL", label: "All Orders" },
    { id: orderStatus.PENDING, label: "Pending" },
    { id: orderStatus.CONFIRMED, label: "Confirmed" },
    { id: orderStatus.SHIPPED, label: "Shipped" },
    { id: orderStatus.DELIVERED, label: "Delivered" },
    { id: orderStatus.CANCELLED, label: "Cancelled" },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case orderStatus.PENDING:
        return { color: "bg-yellow-100 text-yellow-700", icon: Clock };
      case orderStatus.CONFIRMED:
        return { color: "bg-blue-100 text-blue-700", icon: CheckCircle2 };
      case orderStatus.SHIPPED:
        return { color: "bg-indigo-100 text-indigo-700", icon: Truck };
      case orderStatus.DELIVERED:
        return { color: "bg-teal-100 text-teal-700", icon: Package };
      case orderStatus.CANCELLED:
        return { color: "bg-red-100 text-red-700", icon: XCircle };
      default:
        return { color: "bg-gray-100 text-gray-700", icon: Package };
    }
  };

  const handleFilter = (tab: string) => {
    startTransition(() => {
      if (tab === "ALL") {
        router.push(`/customer/orders`);
        return;
      }
      const params = new URLSearchParams(searchParams.toString());
      params.set("order_status", tab);

      const queryString = params.toString();
      router.push(`?${queryString}`);
    });
  };

  const { data: initialOrders, error } = use(ordersPromise);

  if (isPending) return <CustomerOrderListSkeleton />;

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex w-full overflow-x-auto gap-2 pb-2 sm:pb-0 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  searchParams.get("order_status") === tab.id ||
                  (searchParams.get("order_status") === null &&
                    tab.id === "ALL")
                    ? "bg-teal-50 text-teal-600"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64 flex-shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search orders..."
              className="pl-9 bg-gray-50 border-transparent focus:bg-white transition-colors rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {initialOrders?.data && initialOrders?.data.length > 0 ? (
          initialOrders?.data.map((order) => {
            const StatusIcon = getStatusConfig(order.order_status).icon;
            const statusColor = getStatusConfig(order.order_status).color;

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:border-teal-200 transition-colors"
              >
                <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-gray-900">
                        Order #{order.order_number}
                      </span>
                      <div
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${statusColor}`}
                      >
                        <StatusIcon className="w-3.5 h-3.5" />
                        {order.order_status}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      Placed on{" "}
                      {order.created_at
                        ? new Date(order.created_at).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <div className="text-left sm:text-right w-full sm:w-auto flex flex-row sm:flex-col justify-between items-center sm:items-end">
                    <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                    <p className="text-lg font-bold text-teal-600">
                      ${Number(order.total_amount)?.toFixed(2) || "0.00"}
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="space-y-4">
                    {order.order_items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-200">
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <h4 className="font-semibold text-gray-900 text-sm truncate">
                            {item.name}
                          </h4>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                            <span>Qty: {item.quantity}</span>
                            <span>
                              ${Number(item.unit_price)?.toFixed(2)} each
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-end items-center gap-3">
                    <Link
                      href={`/customer/orders/${order.id}`}
                      className="w-full sm:w-auto text-center px-6 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-colors text-sm"
                    >
                      View Details
                    </Link>
                    {order.order_status === orderStatus.DELIVERED && (
                      <Link href={`/product/${order.id}`}>
                        <button className="w-full sm:w-auto px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl transition-colors text-sm shadow-sm shadow-teal-200">
                          Buy Again
                        </button>
                      </Link>
                    )}
                    {(order.order_status === orderStatus.SHIPPED ||
                      order.order_status === orderStatus.CONFIRMED) && (
                      <button className="w-full sm:w-auto px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl transition-colors text-sm shadow-sm shadow-teal-200">
                        Track Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              {searchQuery
                ? "We couldn't find any orders matching your search."
                : "You haven't placed any orders yet."}
            </p>
            {!searchQuery && (
              <Link
                href="/"
                className="inline-block mt-6 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl transition-colors shadow-sm shadow-teal-200"
              >
                Start Shopping
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
