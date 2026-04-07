import { Link } from 'react-router-dom';
import { Star, Plus } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import toast from 'react-hot-toast';

export default function SaladCard({ salad }) {
  const addItem = useCartStore((s) => s.addItem);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(salad, 1, { toppings: [], dressing: null });
    // Clarity: track which salad was added and from where
    window.clarity?.("event", "addToCart");
    window.clarity?.("set", "addedSalad", salad.name);
    window.clarity?.("set", "addedSaladCategory", salad.category);
    window.clarity?.("set", "addToCartSource", "quickAdd");
    toast.success(`${salad.name} added to cart!`);
  };

  return (
    <Link
      to={`/salad/${salad.id}`}
      className="group bg-white rounded-2xl overflow-hidden border border-cream-dark hover:shadow-lg transition-all duration-300 no-underline block"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-cream">
        <img
          src={salad.image}
          alt={salad.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Rating badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-star fill-star" />
          <span className="text-xs font-semibold text-charcoal">{salad.rating}/5</span>
        </div>
        {/* Sale badge */}
        {salad.onSale && (
          <div className="absolute top-3 left-3 bg-red-sale text-white text-xs font-bold px-2.5 py-1 rounded-lg uppercase">
            On Sale
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-charcoal mb-1 truncate">{salad.name}</h3>
        <p className="text-xs text-warm-gray mb-3 truncate">{salad.category}</p>

        <div className="flex items-center justify-between">
          <button
            onClick={handleQuickAdd}
            className="flex items-center gap-1.5 text-xs font-medium text-sage hover:text-sage-dark transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            Add <Plus className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {salad.oldPrice && (
              <span className="text-xs text-warm-gray line-through">${salad.oldPrice.toFixed(2)}</span>
            )}
            <span className={`text-sm font-bold ${salad.onSale ? 'text-red-sale' : 'text-charcoal'}`}>
              ${salad.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
