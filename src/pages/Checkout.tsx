import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Copy, CheckCircle, Upload, Send } from 'lucide-react';
import PaymentVerification from '../components/PaymentVerification';

interface CheckoutProps {
  onNavigate: (page: string) => void;
}

interface BankAccount {
  id: string;
  name: string;
  accountNumber: string;
  routingNumber: string;
  accountHolder: string;
  bankName: string;
  accountType: string;
}

const bankAccounts: BankAccount[] = [
  {
    id: 'bank1',
    name: 'Primary Business Account',
    accountNumber: '1234567890',
    routingNumber: '021000021',
    accountHolder: 'FlipMaster Academy Inc.',
    bankName: 'Chase Bank',
    accountType: 'Business Checking',
  },
  {
    id: 'bank2',
    name: 'Secondary Account',
    accountNumber: '0987654321',
    routingNumber: '011000015',
    accountHolder: 'FlipMaster Education LLC',
    bankName: 'Bank of America',
    accountType: 'Business Savings',
  },
  {
    id: 'bank3',
    name: 'International Transfers',
    accountNumber: '5555666677',
    routingNumber: '031000503',
    accountHolder: 'FlipMaster Global',
    bankName: 'Citibank',
    accountType: 'Business Checking',
  },
  {
    id: 'bank4',
    name: 'Premium Partner Account',
    accountNumber: '7777888899',
    routingNumber: '011000015',
    accountHolder: 'FlipMaster Partners Inc.',
    bankName: 'Wells Fargo',
    accountType: 'Business Premium',
  },
];

export default function Checkout({ onNavigate }: CheckoutProps) {
  const { cart, cartTotal } = useCart();
  const [selectedBank, setSelectedBank] = useState<BankAccount | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showVerification, setShowVerification] = useState(false);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleWhatsAppShare = () => {
    const message = `I have completed payment of $${cartTotal.toFixed(2)}.
Bank: ${selectedBank?.bankName}
Reference: ${Date.now()}`;
    window.open(
      `https://wa.me/15551234567?text=${encodeURIComponent(message)}`,
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
          Complete Your Payment
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Transfer ${cartTotal.toFixed(2)} using a bank account below
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">
                Select Payment Method
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
                    <h3 className="font-semibold">{bank.name}</h3>
                    <p className="text-sm text-gray-500">{bank.bankName}</p>
                  </div>
                ))}
              </div>

              {/* ✅ BANK DETAILS (NEW, SAFE ADDITION) */}
              {selectedBank && (
                <div className="mt-8 p-6 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animate-fadeIn">
                  <h3 className="text-lg font-semibold mb-4">
                    Bank Transfer Details
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Bank Name</span>
                      <span className="font-medium">{selectedBank.bankName}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">Account Number</span>
                      <span className="font-mono font-medium">
                        {selectedBank.accountNumber}
                      </span>
                    </div>

                    <div className="flex justify-between text-lg font-bold pt-3 border-t">
                      <span>Amount to Pay</span>
                      <span className="text-brand-600">
                        ${cartTotal.toFixed(2)}
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
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm mb-2">
                  <span>{item.title}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}

              <div className="border-t mt-4 pt-4 flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-brand-600">${cartTotal.toFixed(2)}</span>
              </div>

              {selectedBank && (
                <button
                  onClick={handleWhatsAppShare}
                  className="w-full bg-green-500 text-white py-3 mt-6 rounded-lg font-semibold"
                >
                  <Send className="h-5 w-5 mr-2 inline" />
                  Notify via WhatsApp
                </button>
              )}

              <button
                onClick={() => setShowVerification(true)}
                disabled={!selectedBank}
                className={`w-full py-3 mt-4 rounded-lg font-semibold
                  ${
                    selectedBank
                      ? 'bg-brand-600 text-white'
                      : 'bg-gray-300 text-gray-500'
                  }`}
              >
                <Upload className="h-5 w-5 mr-2 inline" />
                Upload Payment Proof
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
