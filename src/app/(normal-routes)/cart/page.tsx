
import { ArrowLeft} from "lucide-react";


import CartItems from "@/components/modules/cart/CartItems";
import Link from "next/link";



export default function CartPage() {
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
      {/* Header */}
      <div className="bg-white border-b border-blue-100 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <Link
            href={"/"}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            <ArrowLeft className="size-5" />
            Continue Shopping
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 lg:py-16">
        
          <CartItems />

        
      </div>
    </div>
  );
}
