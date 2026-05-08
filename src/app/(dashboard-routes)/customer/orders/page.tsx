import { getCustomerOrders } from "@/services/orders/orders.services";
import CustomerOrderList from "@/components/modules/dashboard/customer/CustomerOrderList";
import { Suspense } from "react";
import CustomerOrderListSkeleton from "@/components/modules/dashboard/customer/CustomerOrderListSkeleton";

export default async function CustomerOrderPage({
  searchParams,
}: {
  searchParams: Promise<{ order_status?: string }>;
}) {
  const { order_status } = await searchParams;
  const ordersPromise = getCustomerOrders({ order_status });

  return (
    <div className="flex min-h-screen bg-white font-sans">
      <main className="flex-1 bg-gray-50 w-full lg:w-auto">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                My Orders
              </h1>
              <p className="text-gray-500">
                View and track all your recent orders
              </p>
            </div>
            <Suspense fallback={<CustomerOrderListSkeleton />}>
              <CustomerOrderList ordersPromise={ordersPromise} />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
