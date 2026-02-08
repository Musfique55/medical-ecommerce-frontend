import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Form from "@/components/modules/checkout/Form";
import OrderSummary from "@/components/modules/checkout/OrderSummary";
import Link from "next/link";

export interface OrderDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  paymentMethod: "cod";
  specialInstructions: string;
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50/30 to-white">
      {/* Header */}
      <div className="bg-white border-b border-blue-100 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <Link
            href={"/cart"}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            <ArrowLeft className="size-5" />
            Back to Cart
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 lg:py-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            <Form />
          </div>

          {/* Order Summary Sidebar */}
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
