import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Globe, Award, TrendingUp } from 'lucide-react';
// Adjust these imports to match where you saved the files above
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // 1. Get the current language from our Context
  const { language } = useLanguage();
  
  // 2. Safely grab the translations for the current language (fallback to English)
  const t = translations[language as keyof typeof translations]?.hero || translations.en.hero;

  // 3. Move slides inside so they re-render when 't' changes
  const slides = [
    {
      image: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: t.slide1Title,
      subtitle: t.slide1Subtitle,
    },
    {
      image: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: t.slide2Title,
      subtitle: t.slide2Subtitle,
    },
    {
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: t.slide3Title,
      subtitle: t.slide3Subtitle,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative min-h-screen pt-32 overflow-hidden">
      {/* Background with 3D Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform scale-105"
        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[75vh]">
          
          {/* CONTENT */}
          <div className="text-white max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-600/20 backdrop-blur-md border border-brand-500/30 text-brand-400 text-xs font-bold mb-6 animate-fadeIn">
              <Globe className="h-3 w-3" /> {t.badge}
            </div>
            <h1
              key={slides[currentSlide].title}
              className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-6 animate-fadeIn tracking-tighter"
            >
              {slides[currentSlide].title}
            </h1>

            <p
              key={slides[currentSlide].subtitle}
              className="text-lg md:text-xl text-gray-200 mb-10 animate-fadeIn leading-relaxed"
              style={{ animationDelay: '150ms' }}
            >
              {slides[currentSlide].subtitle}
            </p>

            <div className="flex flex-wrap gap-4 animate-fadeIn" style={{ animationDelay: '300ms' }}>
              <button
                onClick={() => onNavigate('courses')}
                className="bg-brand-600 text-white px-10 py-4 rounded-2xl text-lg font-bold hover:bg-brand-700 transition-all shadow-[0_20px_40px_rgba(37,99,235,0.3)] hover:scale-105 active:scale-95"
              >
                {t.btnCourses}
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-2xl text-lg font-bold hover:bg-white/20 transition-all"
              >
                {t.btnEcosystem}
              </button>
            </div>
          </div>

          {/* RIGHT 3D GLASS CARD */}
          <div className="hidden lg:flex justify-end perspective-1000">
            <div
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-10 max-w-md text-white shadow-2xl animate-fadeIn transform hover:rotate-y-12 transition-transform duration-700"
              style={{ animationDelay: '400ms' }}
            >
              <Award className="h-10 w-10 text-brand-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4">{t.cardTitle}</h3>
              <p className="text-white/70 mb-8 leading-relaxed">
                {t.cardDesc}
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-brand-600/30 flex items-center justify-center font-bold text-brand-400">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-black italic">{t.successRate}</p>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">{t.practicalImpl}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-12 right-12 flex gap-4">
        <button onClick={prevSlide} className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-2xl border border-white/10 backdrop-blur-md transition-all">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button onClick={nextSlide} className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-2xl border border-white/10 backdrop-blur-md transition-all">
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}