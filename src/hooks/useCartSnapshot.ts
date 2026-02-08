"use client"

import { cartServices } from "@/services/cart/cart.services";
import { useSyncExternalStore } from "react";

const subscribe = (callback : () => void) => {
    window.addEventListener("storage",callback);
    return () => window.removeEventListener("storage",callback);
}

const itemsServerSnapshot = () => {
    return "[]";
}

const useCartSnapshot = () => {
   const getCartItemsSnapshot = useSyncExternalStore(subscribe,cartServices.getCartItemsSnapshot,itemsServerSnapshot)

   return {getCartItemsSnapshot}
};

export default useCartSnapshot;