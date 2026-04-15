import { Link } from 'react-router-dom';
import { Star, Plus } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import toast from 'react-hot-toast';

export default function BeerCard({ beer }) {
  const addItem = useCartStore((s) => s.addItem);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(beer, 1, { toppings: [], dressing: null });
    window.clarity?.("event", "addToCart");
    window.clarity?.("set", "addedBeer", beer.name);
    window.clarity?.("set", "addedBeerCategory", beer.category);
    window.clarity?.("set", "addToCartSource", "quickAdd");
    toast.success(`${beer.name} added to cart!`);
  };

  return (
    <Link
      to={`/beer/${beer.id}`}
      className="group bg-white rounded-2xl overflow-hidden border border-cream-dark hover:shadow-lg transition-all duration-300 no-underline block"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-cream">
        <img
          src={beer.image}
          alt={beer.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Rating badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-star fill-star" />
          <span className="text-xs font-semibold text-charcoal">{beer.rating}/5</span>
        </div>
        {/* Sale badge */}
        {beer.onSale && (
          <div className="absolute top-3 left-3 bg-red-sale text-white text-xs font-bold px-2.5 py-1 rounded-lg uppercase">
            On Sale
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-charcoal mb-1 truncate">{beer.name}</h3>
        <p className="text-xs text-warm-gray mb-3 truncate">{beer.brand} &middot; {beer.category}</p>

        <div className="flex items-center justify-between">
          <button
            onClick={handleQuickAdd}
            className="flex items-center gap-1.5 text-xs font-medium text-navy hover:text-navy-dark transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            Add <Plus className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {beer.oldPrice && (
              <span className="text-xs text-warm-gray line-through">${beer.oldPrice.toFixed(2)}</span>
            )}
            <span className={`text-sm font-bold ${beer.onSale ? 'text-red-sale' : 'text-charcoal'}`}>
              ${beer.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
