import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';

export default function Cart() {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-cream-dark mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-charcoal mb-2">Your cart is empty</h1>
        <p className="text-sm text-warm-gray mb-6">Looks like you haven't added any beers yet.</p>
        <Link
          to="/"
          className="inline-block bg-navy text-white px-6 py-3 rounded-xl font-medium hover:bg-navy-dark transition-colors no-underline text-sm"
        >
          Browse Beers
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-charcoal mb-8">Your Cart</h1>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={item.key}
            className="bg-white rounded-2xl border border-cream-dark p-4 flex gap-4"
          >
            {/* Image */}
            <Link to={`/beer/${item.salad.id}`} className="shrink-0">
              <img
                src={item.salad.image}
                alt={item.salad.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover"
              />
            </Link>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <Link to={`/beer/${item.salad.id}`} className="text-sm font-semibold text-charcoal no-underline hover:text-navy transition-colors">
                    {item.salad.name}
                  </Link>
                  {item.extras.dressing && (
                    <p className="text-xs text-warm-gray mt-0.5">Serve: {item.extras.dressing}</p>
                  )}
                  {item.extras.toppings.length > 0 && (
                    <p className="text-xs text-warm-gray mt-0.5">
                      + {item.extras.toppings.map((t) => t.name).join(', ')}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => removeItem(item.key)}
                  className="p-1.5 text-warm-gray hover:text-red-sale transition-colors bg-transparent border-none cursor-pointer shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2 bg-cream rounded-lg px-2 py-1">
                  <button
                    onClick={() => updateQuantity(item.key, item.quantity - 1)}
                    className="p-0.5 hover:text-navy transition-colors bg-transparent border-none cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-semibold w-5 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.key, item.quantity + 1)}
                    className="p-0.5 hover:text-navy transition-colors bg-transparent border-none cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-sm font-bold text-charcoal">
                  ${(item.itemPrice * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl border border-cream-dark p-6">
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm text-charcoal-light">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-charcoal-light">
            <span>Delivery</span>
            <span className="text-navy font-medium">Free</span>
          </div>
          <div className="border-t border-cream-dark pt-3 flex justify-between text-lg font-bold text-charcoal">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <Link
          to="/checkout"
          className="block w-full bg-navy text-white text-center py-3.5 rounded-xl font-medium hover:bg-navy-dark transition-colors no-underline text-sm"
        >
          Proceed to Checkout
        </Link>
        <Link
          to="/"
          className="block text-center text-sm text-warm-gray hover:text-navy mt-3 transition-colors no-underline"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
