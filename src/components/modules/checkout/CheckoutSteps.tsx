import { CheckCircle2 } from "lucide-react";
import React from "react";

const CheckoutSteps = () => {
  return (
    <div className="container mx-auto mt-10">
      <div className="mb-8">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
          Checkout
        </h1>
        <p className="text-lg text-gray-600">
          Complete your order in a few simple steps
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
          {[
            { num: 1, label: "Cart", active: false, complete: true },
            { num: 2, label: "Checkout", active: true, complete: false },
            { num: 3, label: "Confirmation", active: false, complete: false },
          ].map((step, idx) => (
            <div key={step.num} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`size-12 rounded-full flex items-center justify-center font-bold text-lg mb-2 transition-all ${
                    step.complete
                      ? "bg-green-500 text-white"
                      : step.active
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step.complete ? (
                    <CheckCircle2 className="size-6" />
                  ) : (
                    step.num
                  )}
                </div>
                <span
                  className={`text-sm font-semibold ${
                    step.active ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {idx < 2 && (
                <div
                  className={`h-1 flex-1 -mt-10 ${
                    step.complete ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
