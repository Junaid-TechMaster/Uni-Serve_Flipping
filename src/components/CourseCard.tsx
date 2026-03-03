import { CheckCircle, ShoppingCart, ShieldCheck } from 'lucide-react';
import { Course } from '../types';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

// ✅ Import Language Context and Translations
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const { addToCart, cart } = useCart();
  const [selectedTier, setSelectedTier] = useState<'Basic' | 'Gold' | 'Premium'>('Basic');
  const [isHovered, setIsHovered] = useState(false);

  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;

  // ✅ Dynamic Currency Formatter
  const formatPrice = (basePkrAmount: number) => {
    if (language === 'en') {
      return `$${Math.round(basePkrAmount / 280)}`;
    }
    if (language === 'ar') {
      return `${Math.round(basePkrAmount / 76)} AED`;
    }
    if (language === 'pa') {
      return `₹${Math.round(basePkrAmount / 3.3)}`;
    }
    return `Rs ${basePkrAmount.toLocaleString()}`; // Default to UR/PKR
  };

  // ✅ Get raw PKR price based on tier
  const getRawPrice = () => {
    // Assuming the base 'course.price' passed in is now 25000
    if (selectedTier === 'Gold') return 35000;
    if (selectedTier === 'Premium') return 50000;
    return 25000; // Basic
  };

  const isInCart = cart.some(item => item.id === `${course.id}-${selectedTier}`);

  const handleAddToCart = () => {
    const courseWithTier = { 
      ...course, 
      id: `${course.id}-${selectedTier}`, 
      price: getRawPrice(), // Store base PKR in cart
      title: `${course.title} (${selectedTier})`,
      selectedTier 
    };
    addToCart(courseWithTier);
  };

  return (
    <div
      className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200/60 dark:border-gray-800/60 rounded-3xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-brand-500/10 transform hover:-translate-y-2 animate-fadeIn group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={course.image_url}
          alt={course.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-green-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
          {t.courseCard?.roiFocused || 'ROI Focused'}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-6 rtl:left-auto rtl:right-6">
          <h3 className="text-xl font-bold text-white">{course.title}</h3>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-2">{course.description}</p>

        {/* TIER SELECTION BUTTONS */}
        <div className="mb-6">
          <label className="text-[10px] font-black text-gray-400 uppercase mb-3 block tracking-widest">
            {t.courseCard?.selectPlan || "Select Plan"}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['Basic', 'Gold', 'Premium'] as const).map((tier) => {
              // Map tier to correct base PKR price
              const tierPricePkr = tier === 'Basic' ? 25000 : tier === 'Gold' ? 35000 : 50000;
              
              return (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`flex flex-col items-center p-2 rounded-xl border-2 transition-all duration-300 ${
                    selectedTier === tier 
                    ? 'border-brand-600 bg-brand-50 dark:bg-brand-900/20 scale-105 shadow-md' 
                    : 'border-gray-100 dark:border-gray-800 bg-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <span className="text-[9px] font-black uppercase">
                    {tier === 'Basic' ? (t.courseCard?.basic || "Basic") : tier === 'Gold' ? (t.courseCard?.gold || "Gold") : (t.courseCard?.premium || "Premium")}
                  </span>
                  <span className="text-xs font-bold">{formatPrice(tierPricePkr)}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Benefits Display based on Tier */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 mb-6 border border-gray-100 dark:border-gray-800">
           <div className="flex items-center gap-2 mb-2 text-brand-600">
             <ShieldCheck className="h-4 w-4" />
             <span className="text-xs font-bold uppercase tracking-tighter">{t.courseCard?.planIncludes || "Plan Includes:"}</span>
           </div>
           <ul className="space-y-1.5">
             <li className="flex items-center text-[11px] text-gray-500 dark:text-gray-400">
               <CheckCircle className="h-3 w-3 me-2 text-green-500" /> {t.courseCard?.coreAccess || "Core Curriculum Access"}
             </li>
             {selectedTier !== 'Basic' && (
               <li className="flex items-center text-[11px] text-brand-600 dark:text-brand-400 font-semibold">
                 <CheckCircle className="h-3 w-3 me-2 text-brand-500" /> {t.courseCard?.supportAccess || "24/7 Chat & Call Support"}
               </li>
             )}
             {selectedTier === 'Premium' && (
               <li className="flex items-center text-[11px] text-yellow-600 dark:text-yellow-400 font-semibold">
                 <CheckCircle className="h-3 w-3 me-2 text-yellow-500" /> {t.courseCard?.mentorAccess || "Priority 1-on-1 Mentorship"}
               </li>
             )}
           </ul>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          <div>
            <span className="text-2xl font-black text-brand-600">{formatPrice(getRawPrice())}</span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isInCart}
            className={`flex items-center px-6 py-3 rounded-2xl text-sm font-bold transition-all ${
              isInCart 
              ? 'bg-green-500 text-white' 
              : 'bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-500/20'
            }`}
          >
            <ShoppingCart className="h-4 w-4 me-2" />
            {isInCart ? (t.courseCard?.inCart || "In Cart") : (t.courseCard?.enrollNow || "Enroll Now")}
          </button>
        </div>
      </div>
    </div>
  );
}