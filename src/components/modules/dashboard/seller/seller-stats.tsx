import { Package, ShoppingCart, TrendingUp, AlertCircle } from "lucide-react";

const SellerStats = () => {
  const stats = [
    {
      label: "Total Products",
      value: "145",
      change: "+12.5%",
      icon: Package,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      label: "Total Orders",
      value: "1,241",
      change: "+8.3%",
      icon: ShoppingCart,
      bgColor: "bg-teal-50",
      iconColor: "text-teal-500",
    },
    {
      label: "Total Revenue",
      value: "$12.8K",
      change: "+15.2%",
      icon: TrendingUp,
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
    },
    {
      label: "Active Issues",
      value: "3",
      change: "-4.5%",
      icon: AlertCircle,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-500",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
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
