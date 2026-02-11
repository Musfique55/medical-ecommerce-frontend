"use client"
import { Roles } from "@/constants/roles";
import { authClient } from "@/lib/authClient";
import { Bell, Menu, Search } from "lucide-react";

const DashboardHeader = () => {
    const user = authClient.useSession();
  return (
    <div>
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg flex-shrink-0"
            //   onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>

            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-0.5 truncate">
                {user?.data?.user?.role === Roles.CUSTOMER ? "Customer Dashboard" : user?.data?.user?.role === Roles.SELLER ? "Seller Dashboard" : "Admin Dashboard"} 
              </h1>
              <p className="text-sm sm:text-base text-gray-600 hidden sm:block">
                Welcome back, {user?.data?.user?.name.split(" ")[0]} Monitoring your active shipments.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2.5 w-64 lg:w-80 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <button className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-teal-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="relative mt-4 md:hidden">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            className="pl-10 pr-4 py-2.5 w-full bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </header>
    </div>
  );
};

export default DashboardHeader;
