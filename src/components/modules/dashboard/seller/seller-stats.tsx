import { Package, ShoppingCart, TrendingUp } from "lucide-react";

interface SellerAnalyticsResponse {
  total_products: number;
  total_orders: number;
  total_revenue: number;
  product_change_pct: number;
  order_change_pct: number;
  revenue_change_pct: number;
}

const SellerStats = async ({
  sellerAnalyticsPromise,
}: {
  sellerAnalyticsPromise: Promise<{ data: SellerAnalyticsResponse | null }>;
}) => {
  const stats = await sellerAnalyticsPromise;

  const statsData = stats
    ? [
        {
          label: "Total Products",
          value: stats.data?.total_products,
          change: `${stats.data?.product_change_pct}%`,
          icon: Package,
          bgColor: "bg-blue-50",
          iconColor: "text-blue-500",
        },
        {
          label: "Total Orders",
          value: stats.data?.total_orders,
          change: `${stats.data?.order_change_pct}%`,
          icon: ShoppingCart,
          bgColor: "bg-teal-50",
          iconColor: "text-teal-500",
        },
        {
          label: "Total Revenue",
          value: `$${stats.data?.total_revenue}`,
          change: `${stats.data?.revenue_change_pct}%`,
          icon: TrendingUp,
          bgColor: "bg-green-50",
          iconColor: "text-green-500",
        },
        // {
        //   label: "Active Issues",
        //   value: stats.activeissues,
        //   change: `${stats.activeissues > 0 ? "+" : ""}${stats.activeissues}%`,
        //   icon: AlertCircle,
        //   bgColor: "bg-orange-50",
        //   iconColor: "text-orange-500",
        // },
      ]
    : [];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    {stat.label}
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.iconColor}`} />
                </div>
              </div>
              <p
                className={`text-xs sm:text-sm font-semibold ${
                  stat.change.startsWith("+")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stat.change} this month
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SellerStats;
