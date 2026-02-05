import React from 'react';

const Trust = () => {
    return (
        <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Why Choose MediCare+</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="font-semibold mb-2">Secure Shopping</h3>
              <p className="text-sm text-gray-600">SSL encrypted checkout</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="font-semibold mb-2">Fast Delivery</h3>
              <p className="text-sm text-gray-600">2-3 day shipping nationwide</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">💊</div>
              <h3 className="font-semibold mb-2">Licensed Pharmacy</h3>
              <p className="text-sm text-gray-600">FDA approved products</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="font-semibold mb-2">Easy Returns</h3>
              <p className="text-sm text-gray-600">30-day money back guarantee</p>
            </div>
          </div>
        </div>
      </section>
    );
};

export default Trust;