"use client";

import { getCartItems } from "@/services/cart/cart.services";
import { cartItem } from "@/types";
import { useQuery } from "@tanstack/react-query";

const useCartSnapshot = () => {
  return useQuery<{ data: cartItem }>({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await getCartItems();
      return res;
    },
  });
};

export default useCartSnapshot;
