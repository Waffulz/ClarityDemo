import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-cream-dark mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Leaf className="w-6 h-6 text-sage" strokeWidth={2.5} />
              <span className="text-lg font-bold text-charcoal">SPROUT</span>
            </div>
            <p className="text-sm text-warm-gray leading-relaxed">
              Fresh salads made with locally sourced ingredients. Healthy eating, simplified.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-charcoal mb-3">Company</h4>
            <ul className="space-y-2 list-none p-0 m-0">
              <li><Link to="/" className="text-sm text-warm-gray hover:text-sage transition-colors no-underline">About</Link></li>
              <li><Link to="/" className="text-sm text-warm-gray hover:text-sage transition-colors no-underline">Menu</Link></li>
              <li><Link to="/" className="text-sm text-warm-gray hover:text-sage transition-colors no-underline">FAQ</Link></li>
            </ul>
          </div>

          {/* Service */}
          <div>
            <h4 className="text-sm font-semibold text-charcoal mb-3">Service</h4>
            <ul className="space-y-2 list-none p-0 m-0">
              <li><span className="text-sm text-warm-gray">Delivery</span></li>
              <li><span className="text-sm text-warm-gray">Payment</span></li>
              <li><span className="text-sm text-warm-gray">Contacts</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-charcoal mb-3">Get our newsletter</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 min-w-0 px-3 py-2 text-sm border border-cream-dark rounded-l-lg bg-cream placeholder-warm-gray"
              />
              <button className="px-4 py-2 bg-sage text-white rounded-r-lg hover:bg-sage-dark transition-colors text-sm font-medium">
                OK
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-cream-dark flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-warm-gray">2025 &copy; All rights reserved. SPROUT Salad Bar</p>
          <div className="flex gap-4">
            <span className="text-xs text-warm-gray hover:text-sage cursor-pointer transition-colors">Terms & Conditions</span>
            <span className="text-xs text-warm-gray hover:text-sage cursor-pointer transition-colors">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
