import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import OrderConfirmation from './pages/OrderConfirmation';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#fff',
            color: '#2D2D2D',
            borderRadius: '12px',
            fontSize: '14px',
            border: '1px solid #F0EBE3',
          },
          success: {
            iconTheme: { primary: '#4A6741', secondary: '#fff' },
          },
        }}
      />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/salad/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
