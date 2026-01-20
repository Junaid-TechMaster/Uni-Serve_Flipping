import { useState } from 'react';
import { Upload, CheckCircle } from 'lucide-react';
import { Course } from '../types';
import { useCart } from '../context/CartContext';

interface PaymentVerificationProps {
  selectedBank: any;
  totalAmount: number;
  courses: Course[];
  onSuccess: () => void; // ✅ renamed intent
}

export default function PaymentVerification({
  selectedBank,
  totalAmount,
  courses,
  onSuccess,
}: PaymentVerificationProps) {
  const { clearCart } = useCart(); // ✅ clear cart after success

  const [email, setEmail] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Only image files are allowed');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('File must be under 5MB');
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
      setErrorMessage('Please fill all fields');
      return;
    }

    setIsUploading(true);
    setErrorMessage('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log({
        email,
        totalAmount,
        selectedBank,
        courses,
        screenshotName: screenshot.name,
      });

      clearCart(); // ✅ remove uploaded products from cart
      setUploadSuccess(true);
    } catch {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  /* SUCCESS STATE */
  if (uploadSuccess) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 transition-colors">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-10 max-w-md w-full text-center animate-fadeIn">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Payment Submitted
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Thank you. Our team will verify your payment within 24 hours and grant course access.
          </p>
          <button
            onClick={onSuccess} // ✅ go to Home
            className="w-full bg-brand-600 text-white py-4 rounded-lg font-semibold
                       hover:bg-brand-700 transition-all active:scale-95"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  /* UPLOAD FORM */
  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-950 px-4 transition-colors">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-10 animate-fadeIn">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Upload Payment Proof
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Please upload a screenshot of your bank transfer confirmation.
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                         focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upload Screenshot
            </label>
            <input type="file" accept="image/*" onChange={handleFileSelect} />
          </div>

          {preview && (
            <div className="border rounded-xl p-4 bg-gray-50 dark:bg-gray-800">
              <img src={preview} alt="Preview" className="w-full rounded-lg" />
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-4 rounded-lg">
              {errorMessage}
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={isUploading}
            className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center
              ${isUploading ? 'bg-gray-400' : 'bg-brand-600 hover:bg-brand-700'} text-white`}
          >
            <Upload className="h-5 w-5 mr-2" />
            {isUploading ? 'Submitting...' : 'Submit Payment Proof'}
          </button>
        </div>
      </div>
    </div>
  );
}
