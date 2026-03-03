import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Upload, Send } from 'lucide-react';
import PaymentVerification from '../components/PaymentVerification';

import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

interface CheckoutProps {
  onNavigate: (page: string) => void;
}

interface BankAccount {
  id: string;
  name: string;
  accountNumber: string;
  bankName: string;
}

// ✅ Updated Banks
const bankAccounts: BankAccount[] = [
  {
    id: 'bank1',
    name: 'Mobile Wallet (Easypaisa)',
    accountNumber: 'PK45JSBL9999903293568640',
    bankName: 'Easypaisa',
  },
  {
    id: 'bank2',
    name: 'Digital Wallet (NayaPay)',
    accountNumber: 'dada303@nayapay',
    bankName: 'NayaPay',
  },
  {
    id: 'bank3',
    name: 'Mobile Wallet (JazzCash)',
    accountNumber: '+92 311 5693431',
    bankName: 'JazzCash',
  }
];

export default function Checkout({ onNavigate }: CheckoutProps) {
  const { cart, cartTotal } = useCart();
  const [selectedBank, setSelectedBank] = useState<BankAccount | null>(null);
  const [showVerification, setShowVerification] = useState(false);

  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;

  // ✅ Dynamic Currency Formatter for Cart Display
  const formatPrice = (basePkrAmount: number) => {
    if (language === 'en') return `$${Math.round(basePkrAmount / 280)}`;
    if (language === 'ar') return `${Math.round(basePkrAmount / 76)} AED`;
    if (language === 'pa') return `₹${Math.round(basePkrAmount / 3.3)}`;
    return `Rs ${basePkrAmount.toLocaleString()}`;
  };

  const handleWhatsAppShare = () => {
    const message = `${t.checkout?.waMessage || 'I have completed payment of'} ${formatPrice(cartTotal)}.
${t.checkout?.bank || 'Bank'}: ${selectedBank?.bankName}
${t.checkout?.reference || 'Reference'}: ${Date.now()}`;
    window.open(
      `https://wa.me/923115693431?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  if (showVerification) {
    return (
      <PaymentVerification
        selectedBank={selectedBank}
        totalAmount={cartTotal}
        courses={cart}
        onSuccess={() => onNavigate('home')}
      />
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12 animate-fadeIn">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {t.checkout?.title || "Complete Your Payment"}
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {t.checkout?.subtitle || "Transfer"} {formatPrice(cartTotal)} {t.checkout?.subtitle2 || "using an account below"}
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">
                {t.checkout?.selectMethod || "Select Payment Method"}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {bankAccounts.map(bank => (
                  <div
                    key={bank.id}
                    onClick={() => setSelectedBank(bank)}
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all
                      ${
                        selectedBank?.id === bank.id
                          ? 'border-brand-600 bg-brand-50 dark:bg-brand-900/20'
                          : 'border-gray-200 dark:border-gray-800'
                      }`}
                  >
                    <h3 className="font-semibold">{bank.bankName}</h3>
                  </div>
                ))}
              </div>

              {selectedBank && (
                <div className="mt-8 p-6 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animate-fadeIn">
                  <h3 className="text-lg font-semibold mb-4">
                    {t.checkout?.bankDetails || "Transfer Details"}
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t.checkout?.bankName || "Bank Name"}</span>
                      <span className="font-medium">{selectedBank.bankName}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">{t.checkout?.accNumber || "Account Number"}</span>
                      <span className="font-mono font-medium" dir="ltr">
                        {selectedBank.accountNumber}
                      </span>
                    </div>

                    <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200 dark:border-gray-700">
                      <span>{t.checkout?.amountToPay || "Amount to Pay"}</span>
                      <span className="text-brand-600">
                        {formatPrice(cartTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">{t.checkout?.orderSummary || "Order Summary"}</h2>

              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm mb-2">
                  <span>{item.title}</span>
                  <span>{formatPrice(item.price)}</span>
                </div>
              ))}

              <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4 flex justify-between text-xl font-bold">
                <span>{t.checkout?.total || "Total"}</span>
                <span className="text-brand-600">{formatPrice(cartTotal)}</span>
              </div>

              {selectedBank && (
                <button
                  onClick={handleWhatsAppShare}
                  className="w-full flex items-center justify-center bg-green-500 text-white py-3 mt-6 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  <Send className="h-5 w-5 me-2" />
                  {t.checkout?.notifyWa || "Notify via WhatsApp"}
                </button>
              )}

              <button
                onClick={() => setShowVerification(true)}
                disabled={!selectedBank}
                className={`w-full flex items-center justify-center py-3 mt-4 rounded-lg font-semibold transition-colors
                  ${
                    selectedBank
                      ? 'bg-brand-600 text-white hover:bg-brand-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
              >
                <Upload className="h-5 w-5 me-2" />
                {t.checkout?.uploadProof || "Upload Payment Proof"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}