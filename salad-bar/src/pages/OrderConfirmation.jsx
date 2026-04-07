import { Link } from 'react-router-dom';
import { CheckCircle, Leaf } from 'lucide-react';

export default function OrderConfirmation() {
  const orderNumber = `SPR-${Date.now().toString().slice(-6)}`;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="text-center max-w-md">
        <div className="relative inline-block mb-6">
          <CheckCircle className="w-20 h-20 text-sage" strokeWidth={1.5} />
          <Leaf className="w-6 h-6 text-sage absolute -bottom-1 -right-1" />
        </div>

        <h1 className="text-3xl font-bold text-charcoal mb-2">Order Confirmed!</h1>
        <p className="text-sm text-warm-gray mb-6 leading-relaxed">
          Thank you for your order. We're preparing your fresh salad with love.
          You'll receive a confirmation email shortly.
        </p>

        <div className="bg-white rounded-2xl border border-cream-dark p-6 mb-6">
          <p className="text-xs text-warm-gray mb-1">Order Number</p>
          <p className="text-lg font-bold text-charcoal tracking-wide">{orderNumber}</p>
          <div className="mt-4 flex items-center justify-center gap-6 text-sm text-charcoal-light">
            <div>
              <p className="text-xs text-warm-gray">Estimated Time</p>
              <p className="font-medium">25-35 min</p>
            </div>
            <div className="w-px h-8 bg-cream-dark" />
            <div>
              <p className="text-xs text-warm-gray">Status</p>
              <p className="font-medium text-sage">Preparing</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="bg-sage text-white px-6 py-3 rounded-xl font-medium hover:bg-sage-dark transition-colors no-underline text-sm"
          >
            Back to Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
