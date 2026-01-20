import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroProps {
  onNavigate: (page: string) => void;
}

const slides = [
  {
    image: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=1600',
    title: 'Master the Art of Property Flipping',
    subtitle: 'Learn from industry experts and transform your real estate career',
  },
  {
    image: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1600',
    title: 'Turn Houses Into Profits',
    subtitle: 'Comprehensive courses designed for success in property investment',
  },
  {
    image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1600',
    title: 'Your Path to Financial Freedom',
    subtitle: 'Start your property flipping journey today with expert guidance',
  },
];

export default function Hero({ onNavigate }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative min-h-screen pt-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          
          {/* LEFT CONTENT */}
          <div className="text-white max-w-xl">
            <h1
              key={slides[currentSlide].title}
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 animate-fadeIn"
            >
              {slides[currentSlide].title}
            </h1>

            <p
              key={slides[currentSlide].subtitle}
              className="text-lg md:text-xl text-gray-200 mb-8 animate-fadeIn"
              style={{ animationDelay: '120ms' }}
            >
              {slides[currentSlide].subtitle}
            </p>

            <button
              onClick={() => onNavigate('courses')}
              className="
                bg-brand-600 text-white
                px-8 py-4 rounded-full
                text-base sm:text-lg font-semibold
                hover:bg-brand-700
                transition-all duration-300
                shadow-lg
                hover:scale-105 active:scale-95
                animate-fadeIn
              "
              style={{ animationDelay: '220ms' }}
            >
              Explore Courses
            </button>
          </div>

          {/* RIGHT GLASS CARD */}
          <div className="hidden lg:flex justify-end">
            <div
              className="
                bg-white/10 backdrop-blur-md
                border border-white/20
                rounded-2xl p-6 max-w-md text-white
                shadow-xl
                animate-fadeIn
              "
              style={{ animationDelay: '300ms' }}
            >
              <h3 className="text-xl font-semibold mb-3">
                Your Partner in Business Growth
              </h3>
              <p className="text-sm text-white/80 mb-4">
                Structured learning, expert mentorship, and practical strategies
                to help you scale confidently.
              </p>

              <div className="flex gap-6">
                <div>
                  <p className="text-2xl font-bold">472+</p>
                  <p className="text-xs text-white/70">Successful Students</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">597+</p>
                  <p className="text-xs text-white/70">Courses Enrolled</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-all hover:scale-110"
      >
        <ChevronLeft className="h-7 w-7" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-all hover:scale-110"
      >
        <ChevronRight className="h-7 w-7" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all ${
              index === currentSlide ? 'w-8 bg-white' : 'w-3 bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
