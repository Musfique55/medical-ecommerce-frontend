import SellerAnalytics from "@/components/modules/dashboard/seller/seller-analytics";
import RecentOrders from "@/components/modules/dashboard/seller/recent-orders";
import IncomingOrders from "@/components/modules/dashboard/seller/incoming-orders";
import SellerStats from "@/components/modules/dashboard/seller/seller-stats";
import TopProducts from "@/components/modules/dashboard/seller/top-products";
import { getTopProducts } from "@/services/products/products.services";
import { Suspense } from "react";

export default async function SellerDashboard() {
  const topProducts = getTopProducts();

  return (
    <div className="flex flex-col">
      <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-6">
        {/* Stats Grid */}
        <SellerStats />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Analytics */}
            <SellerAnalytics />

            {/* Incoming Orders */}
            <IncomingOrders />

            {/* Recent Orders */}
            <RecentOrders />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <Suspense fallback={<div>Loading top products...</div>}>
              <TopProducts topProductsPromise={topProducts} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
