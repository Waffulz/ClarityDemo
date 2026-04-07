import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  login: (email, password) => {
    const name = email.split('@')[0];
    // Tag this session in Clarity so you can filter by user
    window.clarity?.('identify', email, null, null, name);
    set({
      user: { name, email },
      isAuthenticated: true,
    });
  },

  signup: (name, email, password) => {
    window.clarity?.('identify', email, null, null, name);
    set({
      user: { name, email },
      isAuthenticated: true,
    });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));
