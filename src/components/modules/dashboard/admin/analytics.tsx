import { TrendingUp, TrendingDown } from "lucide-react";

const AdminAnalytics = () => {
  const analyticsData = [
    {
      title: "Revenue Trend",
      value: "$524.8K",
      change: "+15.2%",
      isPositive: true,
      chart: "↗",
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "+0.8%",
      isPositive: true,
      chart: "↗",
    },
    {
      title: "Churn Rate",
      value: "1.2%",
      change: "-0.3%",
      isPositive: true,
      chart: "↘",
    },
    {
      title: "Avg Order Value",
      value: "$127.50",
      change: "+5.1%",
      isPositive: true,
      chart: "↗",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Key Metrics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsData.map((metric, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-4 hover:border-teal-200 transition-colors"
          >
            <p className="text-sm text-gray-600 mb-2">{metric.title}</p>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              <span
                className={`text-sm font-semibold ${
                  metric.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAnalytics;
