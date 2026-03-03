import { useState } from 'react';
import { Upload, CheckCircle, ShieldCheck } from 'lucide-react';
import { Course } from '../types';
import { useCart } from '../context/CartContext';

// ✅ Added Language Imports
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

interface PaymentVerificationProps {
  selectedBank: any;
  totalAmount: number;
  courses: Course[];
  onSuccess: () => void;
}

export default function PaymentVerification({
  selectedBank,
  totalAmount,
  courses,
  onSuccess,
}: PaymentVerificationProps) {
  const { clearCart } = useCart();

  const [email, setEmail] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // ✅ Get the current language
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;

  // ✅ Dynamic Currency Formatter
  const formatPrice = (basePkrAmount: number) => {
    if (language === 'en') return `$${Math.round(basePkrAmount / 280)}`;
    if (language === 'ar') return `${Math.round(basePkrAmount / 76)} AED`;
    if (language === 'pa') return `₹${Math.round(basePkrAmount / 3.3)}`;
    return `Rs ${basePkrAmount.toLocaleString()}`; // Default to UR/PKR
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMessage(t.verification?.errImageOnly || 'Only image files are allowed');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage(t.verification?.errFileSize || 'File must be under 5MB');
      return;
    }
    setScreenshot(file);
    setErrorMessage('');
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!email || !screenshot) {
      setErrorMessage(t.verification?.errProvideDetails || 'Please provide your email and payment screenshot');
      return;
    }
    setIsUploading(true);
    setErrorMessage('');
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      clearCart();
      setUploadSuccess(true);
    } catch {
      setErrorMessage(t.verification?.errServiceBusy || 'Verification service is busy. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  /* SUCCESS STATE (Enhanced Design) */
  if (uploadSuccess) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 transition-colors">
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] p-12 max-w-lg w-full text-center animate-fadeIn border border-gray-100 dark:border-gray-800">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-green-500 blur-2xl opacity-20 animate-pulse" />
            <CheckCircle className="h-24 w-24 text-green-500 relative" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-gray-100 mb-4 tracking-tight uppercase italic">
            {t.verification?.successTitle || "Verification Initiated"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed font-medium">
            {t.verification?.successDesc1 || "Excellent! Your proof of payment has been securely received. Our global audit team (USA/UAE) will verify the transfer and grant your course access within "}
            <span className="text-brand-600 font-bold">{t.verification?.successTime || "24 hours"}</span>.
          </p>
          <button
            onClick={onSuccess}
            className="w-full bg-brand-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-brand-700 transition-all shadow-[0_10px_20px_rgba(37,99,235,0.3)] active:scale-95"
          >
            {t.verification?.btnDashboard || "Go to Student Dashboard"}
          </button>
        </div>
      </div>
    );
  }

  /* UPLOAD FORM (Enhanced Depth) */
  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50 dark:bg-gray-950 px-4 transition-colors">
      <div className="max-w-4xl mx-auto grid lg:grid-cols-5 gap-8 items-start">
        
        {/* Info Sidebar (Global Trust) */}
        <div className="lg:col-span-2 space-y-6 animate-fadeIn">
          <div className="bg-brand-600 rounded-3xl p-8 text-white shadow-xl">
             <ShieldCheck className="h-10 w-10 mb-4 text-brand-300" />
             <h3 className="text-xl font-bold mb-4">{t.verification?.secureTitle || "Secure Verification"}</h3>
             <ul className="space-y-4 text-sm text-brand-100">
               <li className="flex items-center gap-3">
                 <div className="h-1.5 w-1.5 rounded-full bg-white" />
                 {t.verification?.secure1 || "Global Bank Support"}
               </li>
               <li className="flex items-center gap-3">
                 <div className="h-1.5 w-1.5 rounded-full bg-white" />
                 {t.verification?.secure2 || "Encrypted Data Transfer"}
               </li>
               <li className="flex items-center gap-3">
                 <div className="h-1.5 w-1.5 rounded-full bg-white" />
                 {t.verification?.secure3 || "24/7 Audit Team Access"}
               </li>
             </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-lg">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 text-center">
               {t.verification?.finalAmount || "Final Amount Due"}
             </p>
             <div className="flex flex-col items-center justify-center gap-1">
                {/* Main localized amount */}
                <span className="text-3xl font-black text-brand-600" dir="ltr">
                  {formatPrice(totalAmount)}
                </span>
                
                {/* Secondary PKR reference for international users */}
                {language !== 'ur' && (
                  <span className="text-sm font-bold text-gray-500 mt-1" dir="ltr">
                    {t.verification?.approx || "Approx."} Rs {totalAmount.toLocaleString()}
                  </span>
                )}
             </div>
          </div>
        </div>

        {/* Upload Form */}
        <div className="lg:col-span-3 bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl p-10 border border-gray-100 dark:border-gray-800 animate-fadeIn" style={{ animationDelay: '100ms' }}>
          <h1 className="text-3xl font-black text-gray-900 dark:text-gray-100 mb-2 tracking-tight">
            {t.verification?.proofTitle || "PROOFS OF PAYMENT"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-10 text-sm font-medium">
            {t.verification?.proofDesc || "Please provide your details and upload the bank transfer receipt."}
          </p>

          <div className="space-y-8">
            <div className="group">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 transition-colors group-focus-within:text-brand-600">
                {t.verification?.emailLabel || "Email Address"}
              </label>
              <input
                type="email"
                placeholder="registered@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl border-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 transition-all shadow-inner"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
                {t.verification?.screenshotLabel || "Payment Screenshot"}
              </label>
              <div className="relative group">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileSelect} 
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-3xl p-12 text-center transition-all group-hover:border-brand-500 group-hover:bg-brand-50/10">
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4 group-hover:text-brand-500 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-bold text-gray-500 dark:text-gray-400">
                    {screenshot ? screenshot.name : (t.verification?.dropReceipt || 'Drop receipt here or click to browse')}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-2 uppercase font-bold">
                    {t.verification?.maxSize || "Max size: 5MB (PNG/JPG)"}
                  </p>
                </div>
              </div>
            </div>

            {preview && (
              <div className="border rounded-3xl p-4 bg-gray-50 dark:bg-gray-800 animate-fadeIn">
                <p className="text-[10px] font-bold text-gray-400 mb-2 uppercase">
                  {t.verification?.previewLabel || "Screenshot Preview:"}
                </p>
                <img src={preview} alt="Preview" className="w-full rounded-2xl shadow-lg border border-white dark:border-gray-700" />
              </div>
            )}

            {errorMessage && (
              <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-2xl text-xs font-bold flex items-center gap-2">
                 <div className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                 {errorMessage}
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={isUploading}
              className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center shadow-xl transition-all active:scale-[0.98]
                ${isUploading 
                  ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed' 
                  : 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-500/20 hover:shadow-brand-500/40'}`}
            >
              {isUploading ? (
                <div className="flex items-center gap-3">
                   <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                   {t.verification?.verifying || "Verifying..."}
                </div>
              ) : (t.verification?.submitBtn || 'Submit Proof of Payment')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}