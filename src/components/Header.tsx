import  { Suspense } from "react";
import Navbar from "./Navbar";
import { categoryServices } from "@/services/categories/categories.services";
import { Button } from "./ui/button";
import { Heart, Menu, Phone, Search, ShoppingCart, User } from "lucide-react";
import { Input } from "./ui/input";

const Header = () => {
  const categoryPromise = categoryServices.getCategories();
  return (
    <div>
      <header className="bg-white border-b sticky top-0 z-50">
        {/* Top Bar */}
        <div className="bg-teal-600 text-white py-2">
          <div className="container mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Phone className="size-4" />
                <span>24/7 Support: 1-800-PHARMA</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <span>Free shipping on orders over $50</span>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-teal-600 text-white p-2 rounded-lg">
                <svg
                  className="size-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2L12 22M2 12L22 12" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-teal-700">MediCare+</h1>
                <p className="text-xs text-gray-600">Your Health Partner</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl relative">
              <Input
                type="text"
                placeholder="Search for medicines, health products..."
                className="pr-10"
              />
              <Button
                size="icon"
                className="absolute right-0 top-0 bg-teal-600 hover:bg-teal-700"
              >
                <Search className="size-4" />
              </Button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="size-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Heart className="size-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                // onClick={onCartClick}
              >
                <ShoppingCart className="size-5" />
                {/* {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full size-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )} */}
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="size-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for medicines..."
                className="pr-10"
              />
              <Button
                size="icon"
                className="absolute right-0 top-0 bg-teal-600 hover:bg-teal-700"
              >
                <Search className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      <Suspense>
        <Navbar categoryPromise={categoryPromise} />
      </Suspense>
    </div>
  );
};

export default Header;
