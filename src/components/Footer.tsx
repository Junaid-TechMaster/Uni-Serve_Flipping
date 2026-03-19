import mono from '../image/monogram.jpeg';
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Globe,
} from 'lucide-react';

// ✅ Added Language Imports
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  // ✅ Get the current language
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white transition-colors border-t border-gray-800 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-16">

          {/* Brand & Social Links */}
          <div className="animate-fadeIn">
            <img 
              src={mono} 
              alt="Uniserve University" 
              // ✅ ADDED: bg-white and a dark mode glow so it stays visible
              className="h-16 w-24 object-cover rounded-full border-2 border-brand-500 p-1 mb-6 shadow-xl bg-white dark:shadow-[0_0_15px_rgba(255,255,255,0.15)]" 
            />
            {/* ✅ Added translation with safe fallback */}
            <h1 className="text-xl font-black text-brand-500 mb-4 tracking-tighter italic uppercase">
              {t.global?.university || "UNISERVE UNIVERSITY"}
            </h1>
            <p className="text-gray-400 dark:text-gray-500 text-sm leading-relaxed mb-6">
              {t.footer?.description || "Empowering global investors with professional online education and a practical platform for real-world property flipping and wealth creation."}
            </p>

            {/* Social Links Restoration */}
            <div className="flex items-center space-x-3">
              <a
                href="https://www.facebook.com/share/14RJfthmEQL/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-gray-800 hover:bg-brand-600 transition-all text-gray-400 hover:text-white"
              >
                <Facebook className="h-5 w-5" />
              </a>

              <a
                href="https://www.instagram.com/uniserveuniversity?igsh=MXRocXFmNjZvbWhqbw=="
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-gray-800 hover:bg-brand-600 transition-all text-gray-400 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </a>

              <a
                href="https://youtube.com/@uniserveuniversity?si=8iPjYa3h9yuhELhW"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-gray-800 hover:bg-brand-600 transition-all text-gray-400 hover:text-white"
              >
                <Youtube className="h-5 w-5" />
              </a>

              <a
                href="https://www.tiktok.com/@uniserveuniversity?_r=1&_t=ZS-939ovfLNHXO"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-gray-800 hover:bg-brand-600 transition-all text-gray-400 hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M16.5 1.5c.7 3.1 2.7 5.6 5.5 6.7v4.3c-2.1 0-4.1-.6-5.5-1.7v6.7c0 3.8-3.1 6.8-6.9 6.8S2.8 21.3 2.8 17.5c0-3.7 3.1-6.8 6.9-6.8.4 0 .9 0 1.3.1v4.5c-.4-.1-.8-.2-1.3-.2-1.4 0-2.5 1.1-2.5 2.4s1.1 2.4 2.5 2.4 2.6-1.1 2.6-2.4V1.5h3.2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-brand-400 mb-8">
              {t.footer?.navigation || "Navigation"}
            </h4>
            <ul className="space-y-4">
              {[
                { name: t.nav?.home || 'Home', path: 'home' },
                { name: t.nav?.about || 'About Us', path: 'about' },
                { name: t.nav?.courses || 'Courses', path: 'courses' },
                { name: t.nav?.contact || 'Contact Us', path: 'contact' },
              ].map(link => (
                <li key={link.path}>
                  <button 
                    onClick={() => onNavigate(link.path)} 
                    className="text-gray-400 hover:text-brand-500 transition-colors text-sm font-medium"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Categories */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-brand-400 mb-8">
              {t.footer?.expertise || "Expertise"}
            </h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              <li className="hover:text-white cursor-default">{t.footer?.exp1 || "Property & Land Flipping"}</li>
              <li className="hover:text-white cursor-default">{t.footer?.exp2 || "Global Financial Trading"}</li>
              <li className="hover:text-white cursor-default">{t.footer?.exp3 || "Shopify & E-Commerce"}</li>
              <li className="hover:text-white cursor-default">{t.footer?.exp4 || "Digital Marketing Mastery"}</li>
            </ul>
          </div>

          {/* Global Operations */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-brand-400 mb-8">
              {t.footer?.globalReach || "Global Reach"}
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start text-gray-400 text-sm">
                <Globe className="h-5 w-5 mr-3 text-brand-500 flex-shrink-0" />
                <span>{t.footer?.locations || "Pakistan • USA • UK • UAE"}</span>
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <Phone className="h-5 w-5 mr-3 text-brand-500 flex-shrink-0" />
                <span dir="ltr">+92 311 5693431</span>
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <Mail className="h-5 w-5 mr-3 text-brand-500 flex-shrink-0" />
                <span className="break-all">uniserveuniversity@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs font-bold uppercase tracking-widest">
          <p>{t.footer?.rights || "© 2026 UNISERVE UNIVERSITY. ALL RIGHTS RESERVED."}</p>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-white transition-colors">{t.footer?.privacy || "Privacy Policy"}</span>
            <span className="cursor-pointer hover:text-white transition-colors">{t.footer?.terms || "Terms of Service"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}