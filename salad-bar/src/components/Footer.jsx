import { Beer } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-navy-dark mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Beer className="w-6 h-6 text-gold" strokeWidth={2.5} />
              <span className="text-lg font-bold text-white">CERVEZA IMPORTS</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              Authentic Mexican beer imports. Corona, Modelo, Victoria & Pacifico delivered to your door.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Company</h4>
            <ul className="space-y-2 list-none p-0 m-0">
              <li><Link to="/" className="text-sm text-white/50 hover:text-gold transition-colors no-underline">About</Link></li>
              <li><Link to="/" className="text-sm text-white/50 hover:text-gold transition-colors no-underline">Shop</Link></li>
              <li><Link to="/" className="text-sm text-white/50 hover:text-gold transition-colors no-underline">FAQ</Link></li>
            </ul>
          </div>

          {/* Service */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Service</h4>
            <ul className="space-y-2 list-none p-0 m-0">
              <li><span className="text-sm text-white/50">Delivery</span></li>
              <li><span className="text-sm text-white/50">Payment</span></li>
              <li><span className="text-sm text-white/50">Contacts</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Get our deals</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 min-w-0 px-3 py-2 text-sm border border-navy-light rounded-l-lg bg-navy-light text-white placeholder-white/30"
              />
              <button className="px-4 py-2 bg-gold text-navy rounded-r-lg hover:bg-gold-dark transition-colors text-sm font-medium">
                OK
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-navy-light flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">2025 &copy; All rights reserved. CERVEZA IMPORTS</p>
          <div className="flex gap-4">
            <span className="text-xs text-white/40 hover:text-gold cursor-pointer transition-colors">Terms & Conditions</span>
            <span className="text-xs text-white/40 hover:text-gold cursor-pointer transition-colors">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
