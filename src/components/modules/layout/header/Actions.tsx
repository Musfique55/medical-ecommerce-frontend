"use client";
import { Button } from "@/components/ui/button";
import { Heart, Menu, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Actions = () => {
  const [cartItems] = useState(() => {
    if (typeof window !== undefined) {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    }
    return [];
  });

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

          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full size-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Button>
      </Link>

      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="size-5" />
      </Button>
    </div>
  );
};

export default Actions;
