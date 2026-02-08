"use client"
import { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  Home,
  CreditCard,
  Shield,
  Truck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cartItem } from '@/types';
import useCartSnapshot from '@/hooks/useCartSnapshot';



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
  paymentMethod: 'cod';
  specialInstructions: string;
}

export default function CheckoutPage() {
  const [formData, setFormData] = useState<OrderDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'cod',
    specialInstructions: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof OrderDetails, string>>>({});

  const cartSnapShot = useCartSnapshot();

  const items : cartItem[] = JSON.parse(cartSnapShot.getCartItemsSnapshot);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const codFee = 2.99; // Cash on delivery fee
  const total = subtotal + shipping + tax + codFee;

  const handleInputChange = (field: keyof OrderDetails, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof OrderDetails, string>> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.address.trim()) newErrors.address = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Invalid ZIP code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onPlaceOrder(formData);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50/30 to-white">
      {/* Header */}
      <div className="bg-white border-b border-blue-100 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <button 
            // onClick={onBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            <ArrowLeft className="size-5" />
            Back to Cart
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 lg:py-16">
        <div className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3">Checkout</h1>
          <p className="text-lg text-gray-600">Complete your order in a few simple steps</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
            {[
              { num: 1, label: 'Cart', active: false, complete: true },
              { num: 2, label: 'Checkout', active: true, complete: false },
              { num: 3, label: 'Confirmation', active: false, complete: false }
            ].map((step, idx) => (
              <div key={step.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`size-12 rounded-full flex items-center justify-center font-bold text-lg mb-2 transition-all ${
                    step.complete 
                      ? 'bg-green-500 text-white' 
                      : step.active 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.complete ? <CheckCircle2 className="size-6" /> : step.num}
                  </div>
                  <span className={`text-sm font-semibold ${
                    step.active ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    {step.label}
                  </span>
                </div>
                {idx < 2 && (
                  <div className={`h-1 flex-1 -mt-10 ${
                    step.complete ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-3xl p-6 lg:p-8 border border-blue-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-100 size-12 rounded-2xl flex items-center justify-center">
                    <User className="size-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-base font-semibold text-gray-900 mb-2">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`h-12 bg-blue-50/50 border-blue-200 rounded-xl text-base ${
                        errors.firstName ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="size-4" />
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="lastName" className="text-base font-semibold text-gray-900 mb-2">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={`h-12 bg-blue-50/50 border-blue-200 rounded-xl text-base ${
                        errors.lastName ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="size-4" />
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-base font-semibold text-gray-900 mb-2">
                      Email Address *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`h-12 pl-12 bg-blue-50/50 border-blue-200 rounded-xl text-base ${
                          errors.email ? 'border-red-500' : ''
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="size-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-base font-semibold text-gray-900 mb-2">
                      Phone Number *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`h-12 pl-12 bg-blue-50/50 border-blue-200 rounded-xl text-base ${
                          errors.phone ? 'border-red-500' : ''
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="size-4" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-3xl p-6 lg:p-8 border border-blue-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-100 size-12 rounded-2xl flex items-center justify-center">
                    <MapPin className="size-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Delivery Address</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="address" className="text-base font-semibold text-gray-900 mb-2">
                      Street Address *
                    </Label>
                    <div className="relative">
                      <Home className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                      <Input
                        id="address"
                        type="text"
                        placeholder="123 Main Street"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className={`h-12 pl-12 bg-blue-50/50 border-blue-200 rounded-xl text-base ${
                          errors.address ? 'border-red-500' : ''
                        }`}
                      />
                    </div>
                    {errors.address && (
                      <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="size-4" />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="apartment" className="text-base font-semibold text-gray-900 mb-2">
                      Apartment, Suite, etc. (Optional)
                    </Label>
                    <Input
                      id="apartment"
                      type="text"
                      placeholder="Apt 4B"
                      value={formData.apartment}
                      onChange={(e) => handleInputChange('apartment', e.target.value)}
                      className="h-12 bg-blue-50/50 border-blue-200 rounded-xl text-base"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="city" className="text-base font-semibold text-gray-900 mb-2">
                        City *
                      </Label>
                      <Input
                        id="city"
                        type="text"
                        placeholder="New York"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className={`h-12 bg-blue-50/50 border-blue-200 rounded-xl text-base ${
                          errors.city ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.city && (
                        <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="size-4" />
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="state" className="text-base font-semibold text-gray-900 mb-2">
                        State *
                      </Label>
                      <Input
                        id="state"
                        type="text"
                        placeholder="NY"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className={`h-12 bg-blue-50/50 border-blue-200 rounded-xl text-base ${
                          errors.state ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.state && (
                        <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="size-4" />
                          {errors.state}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="zipCode" className="text-base font-semibold text-gray-900 mb-2">
                        ZIP Code *
                      </Label>
                      <Input
                        id="zipCode"
                        type="text"
                        placeholder="10001"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className={`h-12 bg-blue-50/50 border-blue-200 rounded-xl text-base ${
                          errors.zipCode ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.zipCode && (
                        <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="size-4" />
                          {errors.zipCode}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-3xl p-6 lg:p-8 border border-blue-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-100 size-12 rounded-2xl flex items-center justify-center">
                    <CreditCard className="size-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
                </div>

                <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-600 size-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="size-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Cash on Delivery
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Pay securely in cash when your order is delivered to your doorstep. 
                        No online payment required.
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <Shield className="size-4 text-green-600" />
                        <span className="font-semibold text-green-700">
                          Safe & Convenient
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded-xl text-sm font-medium mt-4">
                  💡 A small cash on delivery fee of ${codFee.toFixed(2)} will be added to your order
                </div>
              </div>

              {/* Special Instructions */}
              <div className="bg-white rounded-3xl p-6 lg:p-8 border border-blue-100">
                <Label htmlFor="specialInstructions" className="text-base font-semibold text-gray-900 mb-2">
                  Special Instructions (Optional)
                </Label>
                <textarea
                  id="specialInstructions"
                  placeholder="Add any special delivery instructions here..."
                  value={formData.specialInstructions}
                  onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-blue-50/50 border border-blue-200 rounded-xl text-base resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-6 lg:p-8 border border-blue-100 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                {/* Products */}
                <div className="space-y-4 mb-6 pb-6 border-b border-blue-100">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative">
                        <div className="size-20 bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl overflow-hidden">
                          {/* <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          /> */}
                        </div>
                        <div className="absolute -top-2 -right-2 bg-blue-600 text-white size-6 rounded-full flex items-center justify-center text-xs font-bold">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 leading-snug mb-1">
                          {item.name}
                        </h3>
                        <p className="text-blue-600 font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold text-gray-900">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">COD Fee</span>
                    <span className="font-semibold text-gray-900">${codFee.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-blue-100 pt-4 flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-3xl font-bold text-blue-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-base font-semibold rounded-2xl shadow-lg shadow-blue-200 hover:shadow-xl transition-all mb-4"
                >
                  Place Order
                </Button>

                <p className="text-xs text-center text-gray-500 mb-6">
                  By placing your order, you agree to our terms and conditions
                </p>

                {/* Trust Icons */}
                <div className="grid grid-cols-3 gap-3 pt-6 border-t border-blue-100">
                  {[
                    { icon: Shield, text: 'Secure' },
                    { icon: Truck, text: '2-3 Days' },
                    { icon: CheckCircle2, text: 'Verified' }
                  ].map((item) => (
                    <div key={item.text} className="text-center">
                      <div className="bg-blue-50 size-12 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <item.icon className="size-5 text-blue-600" />
                      </div>
                      <p className="text-xs font-semibold text-gray-700">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
