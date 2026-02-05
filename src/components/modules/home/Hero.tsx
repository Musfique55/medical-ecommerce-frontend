import { ArrowRight, Shield, Truck, Clock } from 'lucide-react';
import Image from "next/image";
import { Button } from '../../ui/button';

export function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold">
                🏥 Trusted by 50,000+ Customers
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Your Health,
              <span className="text-teal-600"> Our Priority</span>
            </h1>
            <p className="text-xl text-gray-600">
              Quality OTC medicines delivered to your doorstep. Fast, reliable, and always here for you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-lg px-8">
                Shop Now
                <ArrowRight className="ml-2 size-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Learn More
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <div className="bg-white rounded-lg p-4 shadow-sm mb-2 inline-flex">
                  <Shield className="size-8 text-teal-600" />
                </div>
                <p className="text-sm font-semibold">100% Authentic</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg p-4 shadow-sm mb-2 inline-flex">
                  <Truck className="size-8 text-teal-600" />
                </div>
                <p className="text-sm font-semibold">Fast Delivery</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg p-4 shadow-sm mb-2 inline-flex">
                  <Clock className="size-8 text-teal-600" />
                </div>
                <p className="text-sm font-semibold">24/7 Support</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 h-80">
              <Image 
                src="https://images.unsplash.com/photo-1769702247711-5f554fcfc103" 
                alt="Pharmacy products" 
                fill
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 size-72 bg-teal-200 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -top-6 -left-6 size-72 bg-blue-200 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 size-64 bg-teal-100 rounded-full blur-3xl opacity-30 z-0"></div>
      <div className="absolute bottom-0 left-0 size-64 bg-blue-100 rounded-full blur-3xl opacity-30 z-0"></div>
    </div>
  );
}