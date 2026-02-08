import { cartItem, Product } from "@/types";

export const cartServices = {
  addToCart: (product: Product, quantity: number, price: number) => {
    const item = {
      id: product.id,
      name: product.name,
      price,
      quantity,
      stock: product.stock,
      image_url: product.image_url,
    };

    const cartItems: cartItem[] = JSON.parse(
      localStorage.getItem("cart") || "[]",
    );

    const isExist = cartItems.find((p: cartItem) => p.id === product.id);

    if (isExist) {
      isExist.quantity += quantity;
    } else {
      cartItems.push(item);
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("storage"));
  },

  removeFromCart: (id: string) => {
    const cartItems: cartItem[] = JSON.parse(
      localStorage.getItem("cart") || "[]",
    );

    const remainingItems = cartItems.filter((p) => p.id !== id);

    localStorage.setItem("cart", JSON.stringify(remainingItems));

    window.dispatchEvent(new Event("storage"));
  },

  getCartSnapshot: () => {
    let cartTotal = 0;
    if(typeof window !== undefined){
      const cartItems : cartItem[] = JSON.parse(
        localStorage.getItem("cart") || "[]",
      );
      cartTotal = cartItems.reduce((prev,curr) => prev += curr.quantity,0);
    }


    return  cartTotal;
  },
};
