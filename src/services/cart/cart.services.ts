import { cartItem, Product } from "@/types";

export const cartServices = {
  addToCart: (product: Product, quantity: number, price: number) => {
    const item = {
      id: product.id,
      name: product.name,
      description: product.description,
      price,
      quantity,
      category: product.category.category_name,
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

  updateQuantity: (id: string, quantity: number) => {
    const cartItems: cartItem[] = JSON.parse(
      localStorage.getItem("cart") || "[]",
    );

   

    const updatedQuantity = cartItems.map((p) => {
      if (p.id === id) {
          p.quantity += quantity;
      }

      return p;
    });
    
    localStorage.setItem("cart",JSON.stringify(updatedQuantity));

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

  clearCart : () => {
    localStorage.removeItem("cart");
  },

  getCartSnapshot: () => {
    let cartTotal = 0;
    if (typeof window !== undefined) {
      const cartItems: cartItem[] = JSON.parse(
        localStorage.getItem("cart") || "[]",
      );
      cartTotal = cartItems.reduce((prev, curr) => (prev += curr.quantity), 0);
    }

    return cartTotal;
  },

  getCartItemsSnapshot: () => {
    if (typeof window === undefined) return "[]";
    return localStorage.getItem("cart") || "[]";
  },
};
