import {
  Package,
  User,
  Home,
  Edit,
} from "lucide-react";
import CustomerStats from "@/components/modules/dashboard/customer/CustomerStats";
import CustomerOrderHistory from "@/components/modules/dashboard/customer/CustomerOrderHistory";
import ProfileCard from "@/components/modules/dashboard/customer/ProfileCard";

export default function CustomerDashboard() {
  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Main Content */}
      <main className="flex-1 bg-gray-50 w-full lg:w-auto">
        {/* Dashboard Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
            {/* Left Column - 2/3 width on desktop */}
            <div className="xl:col-span-2 space-y-4 sm:space-y-6">
              {/* Active Shipment Card */}

              {/* Stats Cards */}
              <CustomerStats />

              {/* Order History */}
              <CustomerOrderHistory />
            </div>

            {/* Right Column - 1/3 width on desktop */}
            <div className="space-y-4 sm:space-y-6">
              {/* Profile Card */}
              <ProfileCard />

              {/* Default Address */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Default Address</h3>
                  <button className="text-teal-500 hover:text-teal-600 font-semibold text-sm transition-colors">
                    Edit
                  </button>
                </div>

                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Home className="w-5 h-5 text-teal-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      Home - Primary
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      452 Applewood Circle,
                      <br />
                      Suite 400
                      <br />
                      Cupertino, CA 95014, US
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Access Wishlist */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">
                    Quick Access Wishlist
                  </h3>
                  <button className="text-teal-500 hover:text-teal-600 font-semibold text-sm transition-colors">
                    View All
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                    <Package className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                    <Package className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                    <Package className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer group">
                    <span className="text-gray-500 font-semibold group-hover:text-gray-700 transition-colors">
                      +1
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
