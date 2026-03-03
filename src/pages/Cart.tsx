import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

// ✅ Added Language Imports
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

interface CartProps {
  onNavigate: (page: string) => void;
}

export default function Cart({ onNavigate }: CartProps) {
  const { cart, removeFromCart, clearCart, cartTotal } = useCart();
  
  // ✅ Get the current language
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;

  // ✅ Dynamic Currency Formatter
  const formatPrice = (basePkrAmount: number) => {
    if (basePkrAmount === 0) {
      if (language === 'en') return '$0';
      if (language === 'ar') return '0 AED';
      if (language === 'pa') return '₹0';
      return 'Rs 0';
    }
    if (language === 'en') return `$${Math.round(basePkrAmount / 280)}`;
    if (language === 'ar') return `${Math.round(basePkrAmount / 76)} AED`;
    if (language === 'pa') return `₹${Math.round(basePkrAmount / 3.3)}`;
    return `Rs ${basePkrAmount.toLocaleString()}`; // Default to UR/PKR
  };

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
              {t.cart?.emptyTitle || "Your Cart is Empty"}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
              {t.cart?.emptyDesc || "Looks like you haven't added any courses yet"}
            </p>
            <button
              onClick={() => onNavigate('courses')}
              className="inline-flex items-center bg-brand-600 text-white px-8 py-4 rounded-lg
                          font-semibold hover:bg-brand-700 transition-all active:scale-95"
            >
              <ArrowLeft className="h-5 w-5 me-2 rtl:rotate-180" /> {/* Added rtl:rotate-180 so arrow points correctly in Arabic/Urdu */}
              {t.cart?.browseBtn || "Browse Courses"}
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
            <ArrowLeft className="h-5 w-5 me-2 rtl:rotate-180" />
            {t.cart?.continueShopping || "Continue Shopping"}
          </button>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
            {t.cart?.pageTitle || "Shopping Cart"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {cart.length} {t.cart?.itemsInCart || "course(s) in your cart"}
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

                      {/* ✅ Dynamically formatted price */}
                      <span className="text-xl font-bold text-brand-600" dir="ltr">
                        {formatPrice(item.price)}
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
              <Trash2 className="h-5 w-5 me-2" />
              {t.cart?.clearCart || "Clear Cart"}
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
                {t.cart?.orderSummary || "Order Summary"}
              </h2>

              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>{t.cart?.subtotal || "Subtotal"}</span>
                  <span className="font-medium" dir="ltr">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>{t.cart?.tax || "Tax"}</span>
                  <span className="font-medium" dir="ltr">{formatPrice(0)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-gray-100">
                  <span>{t.cart?.total || "Total"}</span>
                  <span className="text-brand-600" dir="ltr">
                    {formatPrice(cartTotal)}
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
                {t.cart?.checkoutBtn || "Proceed to Checkout"}
              </button>

              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                {t.cart?.secureInfo || "Secure payment via bank transfer"}
              </p>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                <h3 className="font-semibold text-green-900 dark:text-green-400 mb-2">
                  {t.cart?.benefitsTitle || "Course Benefits"}
                </h3>
                <ul className="text-sm text-green-800 dark:text-green-300 space-y-1">
                  <li>✓ {t.cart?.benefit1 || "Lifetime access to all content"}</li>
                  <li>✓ {t.cart?.benefit2 || "Certificate of completion"}</li>
                  <li>✓ {t.cart?.benefit3 || "Community forum access"}</li>
                  <li>✓ {t.cart?.benefit4 || "30-day money-back guarantee"}</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}