import { Target, Users, Award, TrendingUp, Globe, BookOpen, Rocket } from "lucide-react";

// ✅ Added Language Imports
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

interface AboutProps {
  onNavigate: (page: string) => void;
}

export default function About({ onNavigate }: AboutProps) {
  // ✅ Get the current language
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;

  // ✅ Moved stats array inside the component so it translates dynamically
  const stats = [
    {
      icon: Globe,
      value: "4+",
      label: t.about?.stat1 || "Operational Countries (PK, USA, UK, UAE)",
      color: "bg-blue-600",
    },
    {
      icon: Award,
      value: "100%",
      label: t.about?.stat2 || "Practical Skill Focus",
      color: "bg-green-600",
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: t.about?.stat3 || "Earning Potential Success",
      color: "bg-yellow-600",
    },
    {
      icon: Users,
      value: "5,000+",
      label: t.about?.stat4 || "Global Active Students",
      color: "bg-red-600",
    },
  ];

  return (
    <div className="pt-28">
      {/* Page Hero */}
      <section className="relative h-[360px] sm:h-[420px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1600)",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-3xl text-white animate-fadeIn">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg">
                {t.about?.heroTitle || "The Future of Global Investment"}
              </h1>
              <p className="text-lg text-gray-200">
                {t.about?.heroSub || "Uniserve University & Uniserve Flipping: Where world-class education meets practical real-world wealth creation."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-28 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          {/* The Relationship / Student Journey */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-28">
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                {t.about?.ecoTitle || "Our Integrated Ecosystem"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                <strong>{t.about?.uniName || "Uniserve University"}</strong> {t.about?.ecoPara1 || "is a global powerhouse in high-impact online education. We transform beginners into market professionals across Property Flipping, Land Flipping, E-commerce, and Trading."}
              </p>
              
              <div className="bg-white dark:bg-gray-900 border-s-4 border-brand-600 p-6 mb-6 rounded-e-xl shadow-xl transform transition-transform hover:-translate-y-1">
                <p className="text-gray-800 dark:text-gray-200 font-semibold italic">
                  "{t.about?.quote1 || "The Journey: Students master elite skills at the University, then immediately apply that expertise via the"} <strong>{t.about?.flipName || "Uniserve Flipping"}</strong> {t.about?.quote2 || "platform to execute real-world projects and generate income."}"
                </p>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                {t.about?.ecoPara2 || "With operations spanning"} <strong>{t.about?.countries || "Pakistan, USA, UK, and the UAE"}</strong>, {t.about?.ecoPara3 || "our courses are designed for everyone—from absolute beginners to seasoned professionals seeking global reach."}
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate("courses")}
                  className="bg-brand-600 text-white px-8 py-3 rounded-full font-bold shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-brand-500/50 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <BookOpen className="h-5 w-5" />
                  {t.about?.btn1 || "Start Your Real Estate Journey"}
                </button>
                <button
                  onClick={() => onNavigate("contact")}
                  className="bg-white dark:bg-gray-800 text-brand-600 dark:text-brand-400 px-8 py-3 rounded-full font-bold shadow-lg border border-brand-100 dark:border-gray-700 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <Rocket className="h-5 w-5" />
                  {t.about?.btn2 || "Apply Skills on Flipping Platform"}
                </button>
              </div>
            </div>

            <div className="animate-fadeIn relative">
              <div className="absolute -inset-4 bg-brand-500/10 rounded-3xl blur-2xl" />
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Global Business Team"
                className="relative rounded-2xl shadow-2xl border border-white/20 transform transition-transform hover:rotate-1"
              />
            </div>
          </div>

          {/* Stats - Global Scope */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 mb-28">
            {stats.map((stat, index) => (
              <div
                key={index}
                style={{ animationDelay: `${index * 120}ms` }}
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200/60 dark:border-gray-800/60 rounded-2xl p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fadeIn"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 ${stat.color} text-white rounded-full mb-4 shadow-inner`}>
                  <stat.icon className="h-7 w-7" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Why Choose Section with 3D Depth */}
          <div className="bg-gradient-to-br from-brand-600 to-brand-800 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-14 text-white animate-fadeIn shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
            <h2 className="text-3xl font-bold mb-10 text-center">
              {t.about?.whyTitle || "Why Choose UNISERVE UNIVERSITY?"}
            </h2>

            <div className="grid md:grid-cols-3 gap-10 text-center">
              <div className="p-4 rounded-xl hover:bg-white/5 transition-colors">
                <h3 className="text-xl font-semibold mb-3">{t.about?.why1Title || "Global Accessibility"}</h3>
                <p className="text-blue-100 dark:text-gray-300 text-sm">
                  {t.about?.why1Desc || "Courses available in English, Arabic, Urdu, and Punjabi to serve students worldwide."}
                </p>
              </div>

              <div className="p-4 rounded-xl hover:bg-white/5 transition-colors">
                <h3 className="text-xl font-semibold mb-3">{t.about?.why2Title || "Real-World Income"}</h3>
                <p className="text-blue-100 dark:text-gray-300 text-sm">
                  {t.about?.why2Desc || "We don't just teach theory. We provide the platform to flip land and property in real markets."}
                </p>
              </div>

              <div className="p-4 rounded-xl hover:bg-white/5 transition-colors">
                <h3 className="text-xl font-semibold mb-3">{t.about?.why3Title || "Continuous Mentorship"}</h3>
                <p className="text-blue-100 dark:text-gray-300 text-sm">
                  {t.about?.why3Desc || "From Basic training to Premium 1-on-1 guidance, we stay with you until you succeed."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}