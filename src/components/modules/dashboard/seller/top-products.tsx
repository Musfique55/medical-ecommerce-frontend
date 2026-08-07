import { Package } from "lucide-react";
import { use } from "react";

const TopProducts = ({
  topProductsPromise,
}: {
  topProductsPromise: Promise<any>;
}) => {
  const { data } = use(topProductsPromise);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Your Top Products</h2>
        <button className="text-teal-500 hover:text-teal-600 font-semibold text-sm transition-colors">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {data?.slice(0, 5).map((product: any) => (
          <div
            key={product.id}
            className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100"
          >
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              {product.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <Package className="w-6 h-6 text-gray-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">
                {product.title}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {product.category?.name || "Uncategorized"}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">${product.price}</p>
              <p className="text-xs font-semibold text-teal-600">
                {product.salesCount || Math.floor(Math.random() * 100) + 10}{" "}
                sold
              </p>
            </div>
          </div>
        ))}

        {(!data || data.length === 0) && (
          <div className="text-center py-8">
            <p className="text-gray-500">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopProducts;
