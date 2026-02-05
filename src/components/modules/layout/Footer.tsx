import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';


export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-teal-600 text-white p-2 rounded-lg">
                <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L12 22M2 12L22 12" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">MediCare+</span>
            </div>
            <p className="text-sm mb-4">
              Your trusted partner in health and wellness. Quality medicines at your doorstep.
            </p>
            <div className="flex gap-3">
              <Button size="icon" variant="ghost" className="hover:bg-teal-600 hover:text-white">
                <Facebook className="size-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-teal-600 hover:text-white">
                <Twitter className="size-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-teal-600 hover:text-white">
                <Instagram className="size-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-teal-400">About Us</a></li>
              <li><a href="#" className="hover:text-teal-400">Shop</a></li>
              <li><a href="#" className="hover:text-teal-400">Blog</a></li>
              <li><a href="#" className="hover:text-teal-400">Contact</a></li>
              <li><a href="#" className="hover:text-teal-400">FAQ</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-teal-400">Track Order</a></li>
              <li><a href="#" className="hover:text-teal-400">Returns</a></li>
              <li><a href="#" className="hover:text-teal-400">Shipping Info</a></li>
              <li><a href="#" className="hover:text-teal-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-teal-400">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm mb-6">
              <li className="flex items-start gap-2">
                <Phone className="size-4 mt-0.5 flex-shrink-0" />
                <span>1-800-PHARMA</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="size-4 mt-0.5 flex-shrink-0" />
                <span>support@medicare.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="size-4 mt-0.5 flex-shrink-0" />
                <span>123 Health St, Medical City, MC 12345</span>
              </li>
            </ul>
            <div>
              <p className="text-sm mb-2">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-800 border-gray-700"
                />
                <Button className="bg-teal-600 hover:bg-teal-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2026 MediCare+. All rights reserved. | Licensed Pharmacy</p>
        </div>
      </div>
    </footer>
  );
}