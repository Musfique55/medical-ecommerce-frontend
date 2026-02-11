import { orderServices } from "@/services/orders/orders.services";
import { Heart, MapPin, Package, ShoppingBag } from "lucide-react";

const CustomerStats = async () => {
  const orders = await orderServices.getCustomerOrders();
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Total Orders
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-gray-900">
                {orders?.data?.length || 0}
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-50 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-teal-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                In Wishlist
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-gray-900">18</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-50 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-teal-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Addresses
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-gray-900">3</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-50 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-teal-500" />
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default CustomerStats;
