import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Star, Minus, Plus, ChevronLeft, Percent, Beer } from 'lucide-react';
import { beers, extras, serveStyles } from '../data/beers';
import { useCartStore } from '../stores/cartStore';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const beer = beers.find((b) => b.id === Number(id));
  const addItem = useCartStore((s) => s.addItem);

  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [selectedServe, setSelectedServe] = useState(null);

  // Clarity: track product views
  useEffect(() => {
    if (beer) {
      window.clarity?.("event", "viewProduct");
      window.clarity?.("set", "viewedBeer", beer.name);
      window.clarity?.("set", "viewedBeerCategory", beer.category);
    }
  }, [beer]);

  if (!beer) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-lg text-warm-gray">Product not found.</p>
        <Link to="/" className="text-navy font-medium hover:underline mt-3 inline-block">
          Back to shop
        </Link>
      </div>
    );
  }

  const toggleExtra = (extra) => {
    setSelectedExtras((prev) =>
      prev.find((e) => e.name === extra.name)
        ? prev.filter((e) => e.name !== extra.name)
        : [...prev, extra]
    );
  };

  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const totalPrice = (beer.price + extrasTotal) * quantity;

  const handleAddToCart = () => {
    addItem(beer, quantity, { toppings: selectedExtras, dressing: selectedServe });
    window.clarity?.("event", "addToCart");
    window.clarity?.("set", "addedBeer", beer.name);
    window.clarity?.("set", "addedBeerCategory", beer.category);
    window.clarity?.("set", "addToCartSource", "productDetail");
    window.clarity?.("set", "addToCartQuantity", String(quantity));
    if (selectedServe) {
      window.clarity?.("set", "selectedServeStyle", selectedServe);
    }
    if (selectedExtras.length > 0) {
      window.clarity?.("set", "selectedExtras", selectedExtras.map((e) => e.name));
    }
    toast.success(`${quantity}x ${beer.name} added to cart!`);
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm text-warm-gray hover:text-navy transition-colors mb-6 bg-transparent border-none cursor-pointer p-0"
      >
        <ChevronLeft className="w-4 h-4" /> Back to shop
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden bg-cream aspect-square">
          <img
            src={beer.image}
            alt={beer.name}
            className="w-full h-full object-cover"
          />
          {beer.onSale && (
            <div className="absolute top-4 left-4 bg-red-sale text-white text-sm font-bold px-3 py-1.5 rounded-lg uppercase">
              On Sale
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-xs text-warm-gray uppercase tracking-wide mb-1">{beer.brand} &middot; {beer.category}</p>
              <h1 className="text-3xl font-bold text-charcoal">{beer.name}</h1>
            </div>
            <div className="flex items-center gap-1 bg-cream rounded-lg px-3 py-1.5">
              <Star className="w-4 h-4 text-star fill-star" />
              <span className="text-sm font-semibold text-charcoal">{beer.rating}/5</span>
            </div>
          </div>

          <p className="text-sm text-charcoal-light leading-relaxed mb-4">{beer.description}</p>

          {/* Meta */}
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-1.5 text-sm text-warm-gray">
              <Percent className="w-4 h-4" /> {beer.abv} ABV
            </div>
            <div className="flex items-center gap-1.5 text-sm text-warm-gray">
              <Beer className="w-4 h-4" /> {beer.calories} cal/serving
            </div>
            {beer.tags.map((t) => (
              <span key={t} className="text-xs bg-navy/10 text-navy px-2 py-1 rounded-full capitalize font-medium">
                {t}
              </span>
            ))}
          </div>

          {/* Details */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-charcoal mb-2">Product Details</h3>
            <div className="flex flex-wrap gap-2">
              {beer.details.map((detail) => (
                <span key={detail} className="text-xs bg-cream rounded-full px-3 py-1.5 text-charcoal-light">
                  {detail}
                </span>
              ))}
            </div>
          </div>

          {/* Serve style */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-charcoal mb-2">Serve Style</h3>
            <div className="flex flex-wrap gap-2">
              {serveStyles.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedServe(selectedServe === s ? null : s)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
                    selectedServe === s
                      ? 'bg-navy text-white border-navy'
                      : 'bg-white text-charcoal-light border-cream-dark hover:border-navy'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-charcoal mb-2">Add Extras</h3>
            <div className="grid grid-cols-2 gap-2">
              {extras.map((e) => (
                <button
                  key={e.name}
                  onClick={() => toggleExtra(e)}
                  className={`flex items-center justify-between text-xs px-3 py-2.5 rounded-xl border transition-colors cursor-pointer ${
                    selectedExtras.find((se) => se.name === e.name)
                      ? 'bg-navy/10 border-navy text-navy'
                      : 'bg-white border-cream-dark text-charcoal-light hover:border-navy'
                  }`}
                >
                  <span>{e.name}</span>
                  <span className="font-medium">+${e.price.toFixed(2)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price and add to cart */}
          <div className="flex items-center gap-4 flex-wrap">
            {/* Quantity */}
            <div className="flex items-center gap-3 bg-cream rounded-xl px-3 py-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 hover:text-navy transition-colors bg-transparent border-none cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm font-semibold w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 hover:text-navy transition-colors bg-transparent border-none cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              {beer.oldPrice && (
                <span className="text-sm text-warm-gray line-through">${(beer.oldPrice * quantity).toFixed(2)}</span>
              )}
              <span className="text-2xl font-bold text-charcoal">${totalPrice.toFixed(2)}</span>
            </div>

            {/* Add button */}
            <button
              onClick={handleAddToCart}
              className="flex-1 min-w-[160px] bg-navy text-white py-3 px-6 rounded-xl font-medium hover:bg-navy-dark transition-colors text-sm cursor-pointer border-none"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
