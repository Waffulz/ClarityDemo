import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, CreditCard, ChevronLeft } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const total = getTotal();

  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
  });

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    navigate('/order-confirmation');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm text-warm-gray hover:text-sage transition-colors mb-6 bg-transparent border-none cursor-pointer p-0"
      >
        <ChevronLeft className="w-4 h-4" /> Back to cart
      </button>

      <h1 className="text-3xl font-bold text-charcoal mb-8">Checkout</h1>

      {!isAuthenticated && (
        <div className="bg-sage/5 border border-sage/20 rounded-xl p-4 mb-6 flex items-center justify-between">
          <p className="text-sm text-charcoal-light">Already have an account?</p>
          <Link to="/login" className="text-sm font-medium text-sage hover:underline no-underline">
            Login for faster checkout
          </Link>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column — form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery method */}
            <div className="bg-white rounded-2xl border border-cream-dark p-6">
              <h2 className="text-base font-semibold text-charcoal mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-sage" /> Delivery Method
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('delivery')}
                  className={`py-3 rounded-xl text-sm font-medium border transition-colors cursor-pointer ${
                    deliveryMethod === 'delivery'
                      ? 'bg-sage text-white border-sage'
                      : 'bg-white text-charcoal-light border-cream-dark hover:border-sage'
                  }`}
                >
                  Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`py-3 rounded-xl text-sm font-medium border transition-colors cursor-pointer ${
                    deliveryMethod === 'pickup'
                      ? 'bg-sage text-white border-sage'
                      : 'bg-white text-charcoal-light border-cream-dark hover:border-sage'
                  }`}
                >
                  Pickup
                </button>
              </div>
            </div>

            {/* Contact info */}
            <div className="bg-white rounded-2xl border border-cream-dark p-6">
              <h2 className="text-base font-semibold text-charcoal mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-charcoal-light mb-1 block">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-sm border border-cream-dark rounded-xl bg-cream/50 placeholder-warm-gray"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-charcoal-light mb-1 block">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-sm border border-cream-dark rounded-xl bg-cream/50 placeholder-warm-gray"
                    placeholder="john@email.com"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-charcoal-light mb-1 block">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-sm border border-cream-dark rounded-xl bg-cream/50 placeholder-warm-gray"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Address (only for delivery) */}
            {deliveryMethod === 'delivery' && (
              <div className="bg-white rounded-2xl border border-cream-dark p-6">
                <h2 className="text-base font-semibold text-charcoal mb-4">Delivery Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-charcoal-light mb-1 block">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={form.address}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 text-sm border border-cream-dark rounded-xl bg-cream/50 placeholder-warm-gray"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-charcoal-light mb-1 block">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={form.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 text-sm border border-cream-dark rounded-xl bg-cream/50 placeholder-warm-gray"
                      placeholder="New York"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Payment */}
            <div className="bg-white rounded-2xl border border-cream-dark p-6">
              <h2 className="text-base font-semibold text-charcoal mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-sage" /> Payment
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-charcoal-light mb-1 block">Card Number</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2.5 text-sm border border-cream-dark rounded-xl bg-cream/50 placeholder-warm-gray"
                    placeholder="4242 4242 4242 4242"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-charcoal-light mb-1 block">Expiry</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2.5 text-sm border border-cream-dark rounded-xl bg-cream/50 placeholder-warm-gray"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-charcoal-light mb-1 block">CVC</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2.5 text-sm border border-cream-dark rounded-xl bg-cream/50 placeholder-warm-gray"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-2xl border border-cream-dark p-6">
              <h2 className="text-base font-semibold text-charcoal mb-4">Order Notes</h2>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2.5 text-sm border border-cream-dark rounded-xl bg-cream/50 placeholder-warm-gray resize-none"
                placeholder="Any special requests or allergies..."
              />
            </div>
          </div>

          {/* Right column — order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-cream-dark p-6 sticky top-24">
              <h2 className="text-base font-semibold text-charcoal mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.key} className="flex items-center gap-3">
                    <img
                      src={item.salad.image}
                      alt={item.salad.name}
                      className="w-12 h-12 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-charcoal truncate">{item.salad.name}</p>
                      <p className="text-xs text-warm-gray">x{item.quantity}</p>
                    </div>
                    <span className="text-xs font-semibold text-charcoal">
                      ${(item.itemPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-cream-dark pt-3 space-y-2">
                <div className="flex justify-between text-sm text-charcoal-light">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-charcoal-light">
                  <span>Delivery</span>
                  <span className="text-sage font-medium">
                    {deliveryMethod === 'pickup' ? '$0.00' : 'Free'}
                  </span>
                </div>
                <div className="border-t border-cream-dark pt-2 flex justify-between text-lg font-bold text-charcoal">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-sage text-white py-3.5 rounded-xl font-medium hover:bg-sage-dark transition-colors text-sm cursor-pointer border-none"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
