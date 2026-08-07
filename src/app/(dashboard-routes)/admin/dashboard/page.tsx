import AdminAnalytics from "@/components/modules/dashboard/admin/analytics";
import RecentUsers from "@/components/modules/dashboard/admin/recent-users";
import AdminStats from "@/components/modules/dashboard/admin/stats";
import TopProducts from "@/components/modules/dashboard/admin/top-products";
import { Suspense } from "react";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col">
      <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-6">
        {/* Stats Grid */}
        <AdminStats />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Analytics */}
            <AdminAnalytics />

            {/* Recent Users */}
            <Suspense fallback={<div>Loading users...</div>}>
              <RecentUsers />
            </Suspense>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <Suspense fallback={<div>Loading top products...</div>}>
              <TopProducts />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
