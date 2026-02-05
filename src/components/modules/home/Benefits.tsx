import React from "react";

const Benefits = () => {
  return (
    <section className="py-16 bg-teal-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold mb-2">50K+</div>
            <p className="text-teal-100">Happy Customers</p>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">100%</div>
            <p className="text-teal-100">Authentic Products</p>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">24/7</div>
            <p className="text-teal-100">Customer Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
