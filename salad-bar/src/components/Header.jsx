import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, Leaf, Menu, X } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';
import { useState } from 'react';

export default function Header() {
  const itemCount = useCartStore((s) => s.getItemCount());
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white border-b border-cream-dark sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <Leaf className="w-7 h-7 text-sage" strokeWidth={2.5} />
            <span className="text-xl font-bold tracking-tight text-charcoal">SPROUT</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-charcoal-light hover:text-sage transition-colors no-underline">
              Menu
            </Link>
            <Link to="/?category=Bowls" className="text-sm font-medium text-charcoal-light hover:text-sage transition-colors no-underline">
              Bowls
            </Link>
            <Link to="/?category=Signature" className="text-sm font-medium text-charcoal-light hover:text-sage transition-colors no-underline">
              Signature
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-cream transition-colors"
            >
              <Search className="w-5 h-5 text-charcoal-light" />
            </button>

            {/* User */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <User className="w-5 h-5 text-sage" />
                <span className="text-sm font-medium text-charcoal">{user.name}</span>
                <button
                  onClick={logout}
                  className="text-xs text-warm-gray hover:text-red-sale transition-colors ml-1"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-1 text-sm font-medium text-charcoal-light hover:text-sage transition-colors no-underline"
              >
                <User className="w-5 h-5" />
                <span>Login</span>
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 rounded-full hover:bg-cream transition-colors no-underline"
            >
              <ShoppingCart className="w-5 h-5 text-charcoal-light" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-sage text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-cream transition-colors"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <form onSubmit={handleSearch} className="pb-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search salads..."
                autoFocus
                className="w-full bg-cream rounded-xl px-4 py-3 pl-10 text-sm border-none placeholder-warm-gray"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray" />
            </div>
          </form>
        )}

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-2">
            <Link to="/" onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium text-charcoal-light hover:bg-cream no-underline">
              Menu
            </Link>
            <Link to="/?category=Bowls" onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium text-charcoal-light hover:bg-cream no-underline">
              Bowls
            </Link>
            <Link to="/?category=Signature" onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium text-charcoal-light hover:bg-cream no-underline">
              Signature
            </Link>
            {!isAuthenticated && (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium text-sage hover:bg-cream no-underline">
                Login
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
