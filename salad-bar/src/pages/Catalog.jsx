import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import BeerCard from '../components/BeerCard';
import { beers, categories, tagOptions } from '../data/beers';

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get('category') || 'All';
  const urlSearch = searchParams.get('search') || '';

  const [category, setCategory] = useState(urlCategory);
  const [priceRange, setPriceRange] = useState([0, 35]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState('relevancy');
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Sync URL params
  useMemo(() => {
    if (urlCategory !== 'All') setCategory(urlCategory);
  }, [urlCategory]);

  const filteredBeers = useMemo(() => {
    let result = beers.filter((b) => {
      if (category !== 'All' && b.category !== category) return false;
      if (b.price < priceRange[0] || b.price > priceRange[1]) return false;
      if (selectedTags.length > 0 && !selectedTags.some((t) => b.tags.includes(t))) return false;
      if (urlSearch && !b.name.toLowerCase().includes(urlSearch.toLowerCase())) return false;
      return true;
    });

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [category, priceRange, selectedTags, sortBy, urlSearch]);

  const toggleTag = (option) => {
    setSelectedTags((prev) =>
      prev.includes(option) ? prev.filter((t) => t !== option) : [...prev, option]
    );
  };

  const activeFilters = [
    ...(category !== 'All' ? [{ label: category, clear: () => setCategory('All') }] : []),
    ...(priceRange[0] > 0 || priceRange[1] < 35
      ? [{ label: `$${priceRange[0]}-$${priceRange[1]}`, clear: () => setPriceRange([0, 35]) }]
      : []),
    ...selectedTags.map((t) => ({
      label: t,
      clear: () => setSelectedTags((prev) => prev.filter((x) => x !== t)),
    })),
  ];

  const clearAllFilters = () => {
    setCategory('All');
    setPriceRange([0, 35]);
    setSelectedTags([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page header */}
      <div className="mb-6">
        <p className="text-xs text-warm-gray mb-1">Home / Mexican Beers</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-charcoal">
          {urlSearch ? `Results for "${urlSearch}"` : 'Mexican Beer Imports'}
        </h1>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-warm-gray">
          Showing {filteredBeers.length} products
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="md:hidden flex items-center gap-1.5 text-sm font-medium text-charcoal-light bg-white border border-cream-dark rounded-lg px-3 py-2"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-warm-gray hidden sm:inline">Sort by</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm bg-white border border-cream-dark rounded-lg px-3 py-2 text-charcoal"
            >
              <option value="relevancy">Relevancy</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active filter chips */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {activeFilters.map((f) => (
            <span
              key={f.label}
              className="inline-flex items-center gap-1.5 bg-white border border-cream-dark rounded-full px-3 py-1.5 text-xs font-medium text-charcoal"
            >
              {f.label}
              <button onClick={f.clear} className="hover:text-red-sale transition-colors bg-transparent border-none p-0 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <button
            onClick={clearAllFilters}
            className="text-xs text-warm-gray hover:text-red-sale transition-colors underline bg-transparent border-none cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      )}

      <div className="flex gap-8">
        {/* Sidebar filters */}
        <aside className={`${filtersOpen ? 'block' : 'hidden'} md:block w-full md:w-56 shrink-0 ${filtersOpen ? 'fixed inset-0 z-40 bg-white p-6 overflow-auto md:relative md:p-0 md:bg-transparent' : ''}`}>
          {filtersOpen && (
            <div className="flex items-center justify-between mb-4 md:hidden">
              <h2 className="text-lg font-bold text-charcoal">Filters</h2>
              <button onClick={() => setFiltersOpen(false)} className="p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          <h2 className="text-base font-semibold text-charcoal mb-4 hidden md:block">Filter</h2>

          {/* Price */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-charcoal mb-3">Price</h3>
            <input
              type="range"
              min="0"
              max="35"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full accent-navy"
            />
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-warm-gray">From</span>
              <input
                type="number"
                min="0"
                max={priceRange[1]}
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-16 text-xs border border-cream-dark rounded-lg px-2 py-1.5 text-center"
              />
              <span className="text-xs text-warm-gray">To</span>
              <input
                type="number"
                min={priceRange[0]}
                max="35"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-16 text-xs border border-cream-dark rounded-lg px-2 py-1.5 text-center"
              />
            </div>
          </div>

          {/* Category */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-charcoal mb-3">Style</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={category === cat}
                    onChange={() => setCategory(cat)}
                    className="accent-navy w-4 h-4"
                  />
                  <span className="text-sm text-charcoal-light">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-charcoal mb-3">Type</h3>
            <div className="space-y-2">
              {tagOptions.map((option) => (
                <label key={option} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(option)}
                    onChange={() => toggleTag(option)}
                    className="accent-navy w-4 h-4 rounded"
                  />
                  <span className="text-sm text-charcoal-light capitalize">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {filtersOpen && (
            <button
              onClick={() => setFiltersOpen(false)}
              className="w-full mt-4 bg-navy text-white py-3 rounded-xl font-medium md:hidden"
            >
              Apply Filters
            </button>
          )}
        </aside>

        {/* Beer grid */}
        <div className="flex-1">
          {filteredBeers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredBeers.map((beer) => (
                <BeerCard key={beer.id} beer={beer} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-warm-gray">No beers match your filters.</p>
              <button
                onClick={clearAllFilters}
                className="mt-3 text-navy font-medium hover:underline bg-transparent border-none cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
