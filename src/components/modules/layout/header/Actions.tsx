"use client";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import useCartSnapshot from "@/hooks/useCartSnapshot";
import { Heart, Menu, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

const Actions = () => {
  const { data: cartItems } = useCartSnapshot();
  const { data: user } = useAuth();

  let totalItems = 0;
  cartItems?.data?.items?.forEach((item: any) => {
    totalItems += item.quantity;
  });

  return (
    <div className="flex items-center gap-2">
      {user?.data ? (
        user?.data?.role === "CUSTOMER" ? (
          <Link href={"/dashboard/customer"}>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex cursor-pointer"
            >
              <User className="size-5" />
            </Button>
          </Link>
        ) : user?.data?.role === "ADMIN" ? (
          <Link href={"/dashboard/admin"}>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex cursor-pointer"
            >
              <User className="size-5" />
            </Button>
          </Link>
        ) : (
          <Link href={"/dashboard/seller"}>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex cursor-pointer"
            >
              <User className="size-5" />
            </Button>
          </Link>
        )
      ) : (
        <Link href={"/auth/login"}>
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex cursor-pointer"
          >
            Login
          </Button>
        </Link>
      )}

      <Button variant="ghost" size="icon" className="hidden md:flex">
        <Heart className="size-5" />
      </Button>
      <Link href={"/cart"}>
        <Button variant="ghost" size="icon" className="relative cursor-pointer">
          <ShoppingCart className="size-5" />

          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full size-5 flex items-center justify-center">
            {totalItems || 0}
          </span>
        </Button>
      </Link>

      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="size-5" />
      </Button>
    </div>
  );
};

export default Actions;
