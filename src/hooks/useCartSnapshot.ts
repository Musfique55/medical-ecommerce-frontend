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

const totalItemsServerSnapshot = () => {
    return 0;
}

const useCartSnapshot = () => {
   const getCartItemsSnapshot = useSyncExternalStore(subscribe,cartServices.getCartItemsSnapshot,itemsServerSnapshot);

   const getTotalItemsSnapshot = useSyncExternalStore(subscribe,cartServices.getCartSnapshot,totalItemsServerSnapshot);

   return {getCartItemsSnapshot,getTotalItemsSnapshot}
};

export default useCartSnapshot;