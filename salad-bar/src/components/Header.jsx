import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, Beer, Menu, X } from 'lucide-react';
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
    <header className="bg-navy border-b border-navy-dark sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <Beer className="w-7 h-7 text-gold" strokeWidth={2.5} />
            <span className="text-xl font-bold tracking-tight text-white">CERVEZA IMPORTS</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-white/80 hover:text-gold transition-colors no-underline">
              Shop All
            </Link>
            <Link to="/?category=Lager" className="text-sm font-medium text-white/80 hover:text-gold transition-colors no-underline">
              Lagers
            </Link>
            <Link to="/?category=Pilsner" className="text-sm font-medium text-white/80 hover:text-gold transition-colors no-underline">
              Pilsners
            </Link>
            <Link to="/?category=Dark" className="text-sm font-medium text-white/80 hover:text-gold transition-colors no-underline">
              Dark Beers
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-navy-light transition-colors"
            >
              <Search className="w-5 h-5 text-white/80" />
            </button>

            {/* User */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <User className="w-5 h-5 text-gold" />
                <span className="text-sm font-medium text-white">{user.name}</span>
                <button
                  onClick={logout}
                  className="text-xs text-white/50 hover:text-red-sale transition-colors ml-1"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-1 text-sm font-medium text-white/80 hover:text-gold transition-colors no-underline"
              >
                <User className="w-5 h-5" />
                <span>Login</span>
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 rounded-full hover:bg-navy-light transition-colors no-underline"
            >
              <ShoppingCart className="w-5 h-5 text-white/80" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-navy text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-navy-light transition-colors"
            >
              {menuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
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
                placeholder="Search beers..."
                autoFocus
                className="w-full bg-navy-light rounded-xl px-4 py-3 pl-10 text-sm border-none placeholder-white/40 text-white"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            </div>
          </form>
        )}

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-2">
            <Link to="/" onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium text-white/80 hover:bg-navy-light no-underline">
              Shop All
            </Link>
            <Link to="/?category=Lager" onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium text-white/80 hover:bg-navy-light no-underline">
              Lagers
            </Link>
            <Link to="/?category=Pilsner" onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium text-white/80 hover:bg-navy-light no-underline">
              Pilsners
            </Link>
            <Link to="/?category=Dark" onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium text-white/80 hover:bg-navy-light no-underline">
              Dark Beers
            </Link>
            {!isAuthenticated && (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium text-gold hover:bg-navy-light no-underline">
                Login
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
