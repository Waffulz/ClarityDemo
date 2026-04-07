import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Star, Minus, Plus, ChevronLeft, Clock, Flame } from 'lucide-react';
import { salads, toppings, dressings } from '../data/salads';
import { useCartStore } from '../stores/cartStore';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const salad = salads.find((s) => s.id === Number(id));
  const addItem = useCartStore((s) => s.addItem);

  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedDressing, setSelectedDressing] = useState(null);

  if (!salad) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-lg text-warm-gray">Salad not found.</p>
        <Link to="/" className="text-sage font-medium hover:underline mt-3 inline-block">
          Back to menu
        </Link>
      </div>
    );
  }

  const toggleTopping = (topping) => {
    setSelectedToppings((prev) =>
      prev.find((t) => t.name === topping.name)
        ? prev.filter((t) => t.name !== topping.name)
        : [...prev, topping]
    );
  };

  const toppingsTotal = selectedToppings.reduce((sum, t) => sum + t.price, 0);
  const totalPrice = (salad.price + toppingsTotal) * quantity;

  const handleAddToCart = () => {
    addItem(salad, quantity, { toppings: selectedToppings, dressing: selectedDressing });
    toast.success(`${quantity}x ${salad.name} added to cart!`);
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm text-warm-gray hover:text-sage transition-colors mb-6 bg-transparent border-none cursor-pointer p-0"
      >
        <ChevronLeft className="w-4 h-4" /> Back to menu
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden bg-cream aspect-square">
          <img
            src={salad.image}
            alt={salad.name}
            className="w-full h-full object-cover"
          />
          {salad.onSale && (
            <div className="absolute top-4 left-4 bg-red-sale text-white text-sm font-bold px-3 py-1.5 rounded-lg uppercase">
              On Sale
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-xs text-warm-gray uppercase tracking-wide mb-1">{salad.category}</p>
              <h1 className="text-3xl font-bold text-charcoal">{salad.name}</h1>
            </div>
            <div className="flex items-center gap-1 bg-cream rounded-lg px-3 py-1.5">
              <Star className="w-4 h-4 text-star fill-star" />
              <span className="text-sm font-semibold text-charcoal">{salad.rating}/5</span>
            </div>
          </div>

          <p className="text-sm text-charcoal-light leading-relaxed mb-4">{salad.description}</p>

          {/* Meta */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1.5 text-sm text-warm-gray">
              <Clock className="w-4 h-4" /> {salad.prepTime}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-warm-gray">
              <Flame className="w-4 h-4" /> {salad.calories} cal
            </div>
            {salad.dietary.map((d) => (
              <span key={d} className="text-xs bg-sage/10 text-sage px-2 py-1 rounded-full capitalize font-medium">
                {d}
              </span>
            ))}
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-charcoal mb-2">Ingredients</h3>
            <div className="flex flex-wrap gap-2">
              {salad.ingredients.map((ing) => (
                <span key={ing} className="text-xs bg-cream rounded-full px-3 py-1.5 text-charcoal-light">
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Dressing */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-charcoal mb-2">Choose Dressing</h3>
            <div className="flex flex-wrap gap-2">
              {dressings.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDressing(selectedDressing === d ? null : d)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
                    selectedDressing === d
                      ? 'bg-sage text-white border-sage'
                      : 'bg-white text-charcoal-light border-cream-dark hover:border-sage'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Extra toppings */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-charcoal mb-2">Add Extra Toppings</h3>
            <div className="grid grid-cols-2 gap-2">
              {toppings.map((t) => (
                <button
                  key={t.name}
                  onClick={() => toggleTopping(t)}
                  className={`flex items-center justify-between text-xs px-3 py-2.5 rounded-xl border transition-colors cursor-pointer ${
                    selectedToppings.find((st) => st.name === t.name)
                      ? 'bg-sage/10 border-sage text-sage'
                      : 'bg-white border-cream-dark text-charcoal-light hover:border-sage'
                  }`}
                >
                  <span>{t.name}</span>
                  <span className="font-medium">+${t.price.toFixed(2)}</span>
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
                className="p-1 hover:text-sage transition-colors bg-transparent border-none cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm font-semibold w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 hover:text-sage transition-colors bg-transparent border-none cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              {salad.oldPrice && (
                <span className="text-sm text-warm-gray line-through">${(salad.oldPrice * quantity).toFixed(2)}</span>
              )}
              <span className="text-2xl font-bold text-charcoal">${totalPrice.toFixed(2)}</span>
            </div>

            {/* Add button */}
            <button
              onClick={handleAddToCart}
              className="flex-1 min-w-[160px] bg-sage text-white py-3 px-6 rounded-xl font-medium hover:bg-sage-dark transition-colors text-sm cursor-pointer border-none"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
