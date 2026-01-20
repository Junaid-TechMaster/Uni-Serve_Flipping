import { createContext, useContext, useState } from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = 'info') => {
    const id = Date.now();

    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Stack */}
      <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className="relative overflow-hidden flex items-start gap-3 px-4 py-3 rounded-lg shadow-xl
                       bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800
                       animate-fadeIn min-w-[260px]"
          >
            {/* Icon */}
            {toast.type === 'success' && (
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            )}
            {toast.type === 'error' && (
              <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
            )}
            {toast.type === 'info' && (
              <Info className="h-5 w-5 text-brand-500 mt-0.5" />
            )}

            {/* Message */}
            <span className="text-sm text-gray-800 dark:text-gray-200">
              {toast.message}
            </span>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-200 dark:bg-gray-800">
              <div
                className={`h-full ${
                  toast.type === 'success'
                    ? 'bg-green-500'
                    : toast.type === 'error'
                    ? 'bg-red-500'
                    : 'bg-brand-500'
                } animate-toast-progress`}
              />
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
