"use client";
import { Button } from "@/components/ui/button";
import { cartServices } from "@/services/cart/cart.services";
import { Heart, Menu, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getServerSnapshot = () => {
  return 0;
};

const Actions = () => {
  
  const cartSnapShot = useSyncExternalStore(subscribe,cartServices.getCartSnapshot,getServerSnapshot);



  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" className="hidden md:flex">
        <User className="size-5" />
      </Button>
      <Button variant="ghost" size="icon" className="hidden md:flex">
        <Heart className="size-5" />
      </Button>
      <Link href={"/cart"}>
        <Button
          variant="ghost"
          size="icon"
          className="relative cursor-pointer"
        >
          <ShoppingCart className="size-5" />

          {/* {cartItems.length > 0 && ( */}
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full size-5 flex items-center justify-center">
              {cartSnapShot}
            </span>
          {/* )} */}
        </Button>
      </Link>

      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="size-5" />
      </Button>
    </div>
  );
};

export default Actions;
