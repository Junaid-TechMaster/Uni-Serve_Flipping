import { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import CourseCardSkeleton from '../components/CourseCardSkeleton';
import { Course } from '../types';
import { BookOpen, TrendingUp } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;

  // ✅ Helper to format price for the extra UI block below the card
  const formatPrice = (basePkrAmount: number) => {
    if (language === 'en') return `$${Math.round(basePkrAmount / 280)}`;
    if (language === 'ar') return `${Math.round(basePkrAmount / 76)} AED`;
    if (language === 'pa') return `₹${Math.round(basePkrAmount / 3.3)}`;
    return `Rs ${basePkrAmount.toLocaleString()}`;
  };

  useEffect(() => {
    setLoading(true);

    const data: Course[] = [
      {
        id: 'land-flipping',
        title: t.courseData?.landFlipping?.title || 'Advanced Land Flipping',
        description: t.courseData?.landFlipping?.description || 'Master the art of acquiring under-valued land and flipping for high returns.',
        price: 25000, // ✅ Set base to 25000
        image_url: 'https://images.pexels.com/photos/46160/field-clouds-sky-earth-46160.jpeg',
        duration: t.courseData?.landFlipping?.duration || '12 Weeks',
        level: t.courseData?.landFlipping?.level || 'Professional',
        status: 'active',
        features: t.courseData?.landFlipping?.features || [],
        created_at: '2024-01-01',
      },
      {
        id: 'trading-mastery',
        title: t.courseData?.tradingMastery?.title || 'Global Trading Mastery',
        description: t.courseData?.tradingMastery?.description || 'Comprehensive strategies for Forex, Crypto, and Stock markets.',
        price: 25000,
        image_url: 'https://images.pexels.com/photos/6770610/pexels-photo-6770610.jpeg',
        duration: t.courseData?.tradingMastery?.duration || '8 Weeks',
        level: t.courseData?.tradingMastery?.level || 'Intermediate',
        status: 'active',
        features: t.courseData?.tradingMastery?.features || [],
        created_at: '2024-01-02',
      },
      {
        id: 'ecom-shopify',
        title: t.courseData?.ecomShopify?.title || 'E-Commerce & Shopify',
        description: t.courseData?.ecomShopify?.description || 'Build and scale a global dropshipping brand from scratch.',
        price: 25000,
        image_url: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
        duration: t.courseData?.ecomShopify?.duration || '10 Weeks',
        level: t.courseData?.ecomShopify?.level || 'Beginner',
        status: 'active',
        features: t.courseData?.ecomShopify?.features || [],
        created_at: '2024-01-03',
      }
    ];

    setTimeout(() => {
      setCourses(data);
      setLoading(false);
    }, 800);
  }, [language, t]);

  return (
    <div className="pt-28">
      <section className="relative h-[360px] sm:h-[420px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg)' }}>
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl text-white animate-fadeIn">
              <BookOpen className="h-14 w-14 mb-4 text-brand-400" />
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                {t.coursesPage?.heroTitle || "Elevate Your Expertise"}
              </h1>
              <p className="text-lg text-gray-200">
                {t.coursesPage?.heroSub || "From Learning to Earning: Professional paths in Property, Trading, and Marketing."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16 animate-fadeIn">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t.coursesPage?.sectionTitle || "Choose Your Path"}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t.coursesPage?.sectionSub || "All courses now available. Select the tier that matches your ambition."}
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {loading ? Array.from({ length: 3 }).map((_, i) => <CourseCardSkeleton key={i} />) : 
              courses.map((course) => (
                <div key={course.id} className="space-y-6">
                  <CourseCard course={course} />
                  
                  {/* 3-Tier Pricing Model UI Extension */}
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-xl depth-card">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-brand-600" />
                      {t.coursesPage?.pricingTitle || "Pricing Tiers & Support"}
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="font-bold uppercase">{t.courseCard?.basic || "BASIC"}</span>
                        <span className="text-brand-600">{formatPrice(25000)}</span>
                      </div>
                      <div className="flex justify-between text-xs p-2 bg-brand-50 dark:bg-brand-900/20 rounded-lg border border-brand-200">
                        <span className="font-bold text-brand-700 uppercase">{t.coursesPage?.goldSupport || "GOLD (24/7 Support)"}</span>
                        <span className="text-brand-600">{formatPrice(35000)}</span>
                      </div>
                      <div className="flex justify-between text-xs p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200">
                        <span className="font-bold text-yellow-700 uppercase">{t.coursesPage?.premiumPriority || "PREMIUM (Priority)"}</span>
                        <span className="text-brand-600">{formatPrice(50000)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}