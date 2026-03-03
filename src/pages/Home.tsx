import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import CourseCard from '../components/CourseCard';
import Teachers from '../components/Teachers';
import Reviews from '../components/Reviews';
import { Course } from '../types';
import { Zap, Award, CheckCircle } from 'lucide-react';

// ✅ Added Language Imports
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  
  // ✅ Get the current language
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;

  useEffect(() => {
    setCourses([
      {
        id: 'land-flipping',
        title: t.homeCourseData?.landFlipping?.title || 'Global Land Flipping',
        description: t.homeCourseData?.landFlipping?.description || 'Master the art of acquiring under-valued land and flipping for high returns in USA & UAE.',
        image_url: 'https://images.pexels.com/photos/46160/field-clouds-sky-earth-46160.jpeg',
        duration: t.homeCourseData?.landFlipping?.duration || '12 Weeks',
        level: t.homeCourseData?.landFlipping?.level || 'Professional',
        price: 499,
        status: 'active',
        potentialEarnings: '$3k - $8k/mo',
        features: t.homeCourseData?.landFlipping?.features || ['Land sourcing', 'Legal documentation', 'Zoning mastery', 'ROI optimization'],
        created_at: '2024-01-01',
      },
      {
        id: 'trading-pro',
        title: t.homeCourseData?.tradingPro?.title || 'Financial Trading Mastery',
        description: t.homeCourseData?.tradingPro?.description || 'Professional strategies for Forex, Stocks, and Crypto markets with live mentorship.',
        image_url: 'https://images.pexels.com/photos/6770610/pexels-photo-6770610.jpeg',
        duration: t.homeCourseData?.tradingPro?.duration || '8 Weeks',
        level: t.homeCourseData?.tradingPro?.level || 'Intermediate',
        price: 399,
        status: 'active',
        potentialEarnings: '$2k - $5k/mo',
        features: t.homeCourseData?.tradingPro?.features || ['Technical analysis', 'Risk management', 'Live signals', 'Trading psych'],
        created_at: '2024-01-02',
      },
      {
        id: 'shopify-scale',
        title: t.homeCourseData?.shopifyScale?.title || 'E-Commerce & Shopify',
        description: t.homeCourseData?.shopifyScale?.description || 'Build and scale a 7-figure dropshipping brand for the UK and USA markets.',
        image_url: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
        duration: t.homeCourseData?.shopifyScale?.duration || '10 Weeks',
        level: t.homeCourseData?.shopifyScale?.level || 'Beginner',
        price: 299,
        status: 'active',
        potentialEarnings: '$1.5k - $4k/mo',
        features: t.homeCourseData?.shopifyScale?.features || ['Winning products', 'TikTok/FB Ads', 'Scaling secrets', 'Supplier setup'],
        created_at: '2024-01-03',
      },
    ]);
  }, [language, t]);

  // ✅ Certificate Data
  const certificates = [
    { id: 1, title: t.home?.cert1 || 'Property Flipping Master', image: 'https://images.unsplash.com/photo-1589330694653-afa5f81f5f14?auto=format&fit=crop&q=80&w=800' },
    { id: 2, title: t.home?.cert2 || 'Financial Trading Expert', image: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&q=80&w=800' },
    { id: 3, title: t.home?.cert3 || 'E-Commerce Specialist', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <div>
      <Hero onNavigate={onNavigate} />

      {/* Featured Courses Section */}
      <section className="py-28 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16 animate-fadeIn">
            <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-widest mb-4">
              <Zap className="h-4 w-4" /> {t.home?.recommended || "Recommended for You"}
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-gray-100 mb-6 tracking-tight">
              {t.home?.premiumPaths || "Premium Learning Paths"}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t.home?.premiumDesc || "Start your professional journey with our most sought-after expertise."}
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => (
              <div
                key={course.id}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
          
          <div className="mt-20 text-center animate-fadeIn">
             <button 
              onClick={() => onNavigate('courses')}
              className="px-12 py-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl font-bold hover:shadow-xl transition-all hover:-translate-y-1"
             >
               {t.home?.exploreBtn || "Explore All Available Courses"}
             </button>
          </div>
        </div>
      </section>

      {/* ✅ NEW SECTION: Official Certificates */}
      <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fadeIn">
            <Award className="h-12 w-12 text-brand-600 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
              {t.home?.certTitle || "Globally Recognized Certification"}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t.home?.certSubtitle || "Earn an official Uniserve University certificate upon graduation, trusted by industry leaders worldwide."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {certificates.map((cert, index) => (
              <div 
                key={cert.id} 
                className="relative group bg-gray-50 dark:bg-gray-800 p-3 rounded-[2rem] shadow-xl border border-gray-200 dark:border-gray-700 animate-fadeIn" 
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Certificate Styling Wrapper */}
                <div className="relative h-72 w-full rounded-[1.5rem] overflow-hidden border-[6px] border-double border-brand-200 dark:border-brand-900 bg-white dark:bg-gray-900">
                  {/* Background Texture Image */}
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-30 group-hover:scale-110 transition-transform duration-1000" 
                  />
                  
                  {/* Certificate Text Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                     <Award className="h-12 w-12 text-brand-600 mb-3" />
                     <h4 className="text-xs font-black tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-2">
                       {t.home?.officialCert || "Official Certificate"}
                     </h4>
                     <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                       {cert.title}
                     </h3>
                     
                     <div className="w-16 h-1 bg-brand-500 rounded-full mb-4" />
                     
                     <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">
                       {t.home?.presentedBy || "Presented By"}
                     </p>
                     <p className="text-sm font-black text-brand-700 dark:text-brand-500 italic uppercase tracking-tighter">
                       UNISERVE UNIVERSITY
                     </p>
                     
                     {/* Authentic Checkmark */}
                     <div className="absolute bottom-4 right-4 flex items-center gap-1 opacity-60">
                       <CheckCircle className="h-4 w-4 text-green-600" />
                       <span className="text-[8px] font-bold uppercase text-gray-500">Verified</span>
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Teachers />
      <Reviews />
    </div>
  );
}