import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartProps {
  onNavigate: (page: string) => void;
}

export default function Cart({ onNavigate }: CartProps) {
  const { cart, removeFromCart, clearCart, cartTotal } = useCart();

  const handleCheckout = () => {
    onNavigate('checkout');
  };

  /* Empty State */
  if (cart.length === 0) {
    return (
      <div className="pt-28 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-28">
          <div className="text-center max-w-md mx-auto animate-fadeIn">
            <ShoppingBag className="h-24 w-24 text-gray-300 dark:text-gray-700 mx-auto mb-6" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
              Looks like you haven't added any courses yet
            </p>
            <button
              onClick={() => onNavigate('courses')}
              className="inline-flex items-center bg-brand-600 text-white px-8 py-4 rounded-lg
                         font-semibold hover:bg-brand-700 transition-all active:scale-95"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Browse Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-12 max-w-3xl animate-fadeIn">
          <button
            onClick={() => onNavigate('courses')}
            className="flex items-center text-brand-600 hover:text-brand-700 font-medium mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Continue Shopping
          </button>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Shopping Cart
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {cart.length} course(s) in your cart
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div
              className="
                bg-white/80 dark:bg-gray-900/80 backdrop-blur-md
                border border-gray-200/60 dark:border-gray-800/60
                rounded-2xl shadow-lg overflow-hidden
                transition-all
              "
            >
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="
                    p-6 border-b last:border-b-0
                    border-gray-200 dark:border-gray-800
                    hover:bg-gray-50/60 dark:hover:bg-gray-800/40
                    transition-colors
                  "
                >
                  <div className="flex items-start gap-5">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-32 h-24 object-cover rounded-xl flex-shrink-0"
                    />

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {item.duration} • {item.level}
                          </p>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="
                            text-red-500 hover:text-red-700
                            p-2 rounded-lg
                            hover:bg-red-50 dark:hover:bg-red-900/20
                            transition-colors
                          "
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                        {item.description}
                      </p>

                      <span className="text-xl font-bold text-brand-600">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 font-medium flex items-center transition-colors"
            >
              <Trash2 className="h-5 w-5 mr-2" />
              Clear Cart
            </button>
          </div>

          {/* Summary */}
          <div>
            <div
              className="
                bg-white/80 dark:bg-gray-900/80 backdrop-blur-md
                border border-gray-200/60 dark:border-gray-800/60
                rounded-2xl shadow-lg p-8
                sticky top-28
                transition-all
              "
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax</span>
                  <span className="font-medium">$0.00</span>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-gray-100">
                  <span>Total</span>
                  <span className="text-brand-600">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="
                  w-full bg-brand-600 text-white py-4 rounded-lg font-semibold
                  hover:bg-brand-700 transition-all
                  transform hover:scale-105 active:scale-95 mb-4
                "
              >
                Proceed to Checkout
              </button>

              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                Secure payment via bank transfer
              </p>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                <h3 className="font-semibold text-green-900 dark:text-green-400 mb-2">
                  Course Benefits
                </h3>
                <ul className="text-sm text-green-800 dark:text-green-300 space-y-1">
                  <li>✓ Lifetime access to all content</li>
                  <li>✓ Certificate of completion</li>
                  <li>✓ Community forum access</li>
                  <li>✓ 30-day money-back guarantee</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
