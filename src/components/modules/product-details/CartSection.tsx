"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cartServices } from '@/services/cart/cart.services';
import { Product } from '@/types';
import { Heart, Minus, Plus, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

const CartSection = ({product} : {product : Product}) => {
    const [quantity,setQuantity] = useState(1);
    const price   = product.discount_value > 0 ? Math.round(product.retails_price - ((product.retails_price * product.discount_value) / 100)).toFixed(2) : Number(product?.retails_price);

    const handleCart = (product : Product,quantity:number,price:number) => {
      cartServices.addToCart(product,quantity,price);
      toast.success("item added to the cart");
    }
    return (
        <div>
            <div className="space-y-4">
              <label className="text-sm font-semibold text-gray-900">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-white rounded-2xl p-2 shadow-sm border border-blue-100">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-12 rounded-xl hover:bg-blue-50 cursor-pointer"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={product?.stock === 0}
                  >
                    <Minus className="size-5" />
                  </Button>
                  <span className="text-2xl font-bold text-gray-900 w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-12 rounded-xl hover:bg-blue-50 cursor-pointer"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={product.stock === 0}
                  >
                    <Plus className="size-5" />
                  </Button>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">
                    ${(Number(price) * quantity).toFixed(2)}
                  </span>{" "}
                  total
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                size="lg"
                className="flex-1 bg-blue-600 hover:bg-blue-700 h-16 text-lg font-semibold rounded-2xl shadow-lg shadow-blue-200 hover:shadow-xl transition-all"
                onClick={() => handleCart(product,quantity,Number(price))}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="size-6 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="size-16 rounded-2xl border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
              >
                <Heart className="size-6 text-blue-600" />
              </Button>
            </div>

        </div>
    );
};

export default CartSection;