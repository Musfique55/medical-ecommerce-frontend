import { cartItem } from "@/types";
import { Shield, Truck } from "lucide-react";
import { ElementType } from "react";

const TrustSection = ({ items }: { items: cartItem[] }) => {
  return (
    <div>
      {/* Trust Section */}
      {items.length > 0 && (
        <div className="mt-16 lg:mt-20 bg-gradient-to-br from-blue-50 to-sky-50 rounded-3xl p-8 lg:p-12 border border-blue-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              Shop with Confidence
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your health and safety are our top priorities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Shield,
                title: "100% Authentic",
                description: "All products sourced from licensed manufacturers",
              },
              {
                icon: Truck,
                title: "Fast & Free Shipping",
                description: "Free 2-3 day delivery on orders over $50",
              },
              {
                icon: Lock,
                title: "Secure Checkout",
                description: "256-bit SSL encryption protects your data",
              },
            ].map((feature) => {
              const Icon = feature.icon as ElementType;
              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-2xl p-6 text-center"
                >
                  <div className="bg-blue-100 size-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="size-7 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrustSection;
