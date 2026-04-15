import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Beer } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const { login, signup } = useAuthStore();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      signup(form.name, form.email, form.password);
      window.clarity?.("event", "signUp");
      toast.success('Account created! Welcome to Cerveza Imports.');
    } else {
      login(form.email, form.password);
      window.clarity?.("event", "login");
      toast.success('Welcome back!');
    }
    navigate('/');
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 no-underline">
            <Beer className="w-8 h-8 text-navy" strokeWidth={2.5} />
            <span className="text-2xl font-bold text-charcoal">CERVEZA IMPORTS</span>
          </Link>
          <p className="text-sm text-warm-gray mt-2">
            {isSignup ? 'Create your account' : 'Welcome back'}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-cream-dark p-8"
        >
          {isSignup && (
            <div className="mb-4">
              <label className="text-xs font-medium text-charcoal-light mb-1 block">Name</label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm border border-cream-dark rounded-xl bg-cream/50 placeholder-warm-gray"
                placeholder="Your name"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="text-xs font-medium text-charcoal-light mb-1 block">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm border border-cream-dark rounded-xl bg-cream/50 placeholder-warm-gray"
              placeholder="you@email.com"
            />
          </div>

          <div className="mb-6">
            <label className="text-xs font-medium text-charcoal-light mb-1 block">Password</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm border border-cream-dark rounded-xl bg-cream/50 placeholder-warm-gray"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-navy text-white py-3.5 rounded-xl font-medium hover:bg-navy-dark transition-colors text-sm cursor-pointer border-none"
          >
            {isSignup ? 'Create Account' : 'Sign In'}
          </button>

          <p className="text-center text-sm text-warm-gray mt-4">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="text-navy font-medium hover:underline bg-transparent border-none cursor-pointer p-0"
            >
              {isSignup ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
