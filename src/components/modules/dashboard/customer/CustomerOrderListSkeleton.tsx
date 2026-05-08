import { Package, Search } from "lucide-react";

export default function CustomerOrderListSkeleton() {
  const tabs = [1, 2, 3, 4, 5, 6];

  return (
    <div className="space-y-6 animate-pulse">
      {/* Search and Filter Skeleton */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex w-full overflow-x-auto gap-2 pb-2 sm:pb-0 scrollbar-hide">
            {tabs.map((tab) => (
              <div
                key={tab}
                className="px-4 py-2 rounded-xl bg-gray-100 h-9 w-24 flex-shrink-0"
              ></div>
            ))}
          </div>
          <div className="relative w-full sm:w-64 flex-shrink-0">
            <div className="h-10 bg-gray-100 rounded-xl w-full"></div>
          </div>
        </div>
      </div>

      {/* Orders List Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-5 bg-gray-200 rounded w-32"></div>
                  <div className="h-5 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-48"></div>
              </div>
              <div className="text-left sm:text-right w-full sm:w-auto flex flex-row sm:flex-col justify-between items-center sm:items-end gap-2">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            </div>

            {/* Items */}
            <div className="p-4 sm:p-6">
              <div className="space-y-4">
                {[1, 2].map((j) => (
                  <div key={j} className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-xl flex-shrink-0"></div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4 max-w-[250px]"></div>
                      <div className="flex gap-4">
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-end gap-3">
                <div className="h-10 bg-gray-200 rounded-xl w-full sm:w-32"></div>
                <div className="h-10 bg-gray-200 rounded-xl w-full sm:w-32"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
