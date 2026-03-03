import { ShoppingCart, Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import mono from '../image/mono.png';
// ✅ Import from our new Language Context and translations file
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  // Note: currentLanguage and onLanguageChange were removed because we use Context now!
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();

  // ✅ Get the language and setter from Context
  const { language, setLanguage } = useLanguage();

  // ✅ Safely get the translation dictionary for the current language
  const t = translations[language as keyof typeof translations] || translations.en;

  // ✅ Use the translations for the links
  const navLinks = [
    { name: t.nav.home, path: 'home' },
    { name: t.nav.about, path: 'about' },
    { name: t.nav.courses, path: 'courses' },
    { name: t.nav.contact, path: 'contact' },
  ];

  // ✅ Match codes with our Context types ('en', 'ar', 'ur', 'pa')
  const languages = [
    { name: 'English', code: 'en' },
    { name: 'العربية', code: 'ar' },
    { name: 'اردو', code: 'ur' },
    { name: 'ਪੰਜਾਬੀ', code: 'pa' },
  ];

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <nav className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200/60 dark:border-gray-800/60 rounded-full shadow-lg transition-all duration-300 hover:shadow-brand-500/10">
        <div className="px-6 sm:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div
              className="cursor-pointer flex items-center gap-3 group"
              onClick={() => onNavigate('home')}
            >
              <img
                src={mono}
                alt="UNI SERVE Monogram"
                className="h-10 w-16 rounded-full object-cover border border-brand-200 dark:border-brand-800 transition-transform group-hover:scale-110"
              />
              {/* ✅ Translated University Name */}
              <h1 className="text-lg sm:text-xl font-black text-brand-600 tracking-tighter uppercase italic hidden sm:block">
                {t.global.university} 
              </h1>
            </div>

            {/* Desktop Links & Tools */}
            <div className="hidden lg:flex items-center space-x-6 rtl:space-x-reverse">
              {navLinks.map(link => (
                <button
                  key={link.path}
                  onClick={() => onNavigate(link.path)}
                  className={`text-xs font-bold uppercase tracking-widest transition-all relative
                    ${
                      currentPage === link.path
                        ? 'text-brand-600'
                        : 'text-gray-700 dark:text-gray-300 hover:text-brand-600'
                    }
                  `}
                >
                  {link.name}
                  {currentPage === link.path && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-600 rounded-full animate-fadeIn" />
                  )}
                </button>
              ))}

              <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-800 mx-2" />

              {/* Language Selector */}
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Globe className="h-4 w-4 text-brand-500" />
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                  className="bg-transparent text-xs font-bold border-none focus:ring-0 cursor-pointer outline-none"
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white uppercase">
                      {lang.code}
                    </option>
                  ))}
                </select>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full transition-all hover:bg-brand-50 dark:hover:bg-gray-800 hover:scale-110"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4 text-yellow-400" />
                ) : (
                  <Moon className="h-4 w-4 text-gray-700" />
                )}
              </button>

              {/* Cart */}
              <button
                onClick={() => onNavigate('cart')}
                className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-brand-600 transition-all hover:scale-110"
              >
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black rounded-full h-4 w-4 flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center gap-2">
               <button
                onClick={() => onNavigate('cart')}
                className="relative p-2 text-gray-700 dark:text-gray-300"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black rounded-full h-4 w-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-brand-600 transition-transform active:scale-90"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200/60 dark:border-gray-800/60 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-b-[2rem] shadow-2xl animate-fadeIn">
            <div className="px-6 py-8 space-y-4">
              {navLinks.map(link => (
                <button
                  key={link.path}
                  onClick={() => {
                    onNavigate(link.path);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-start px-4 py-3 rounded-2xl text-sm font-bold tracking-widest uppercase transition-all
                    ${
                      currentPage === link.path
                        ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-gray-800'
                    }
                  `}
                >
                  {link.name}
                </button>
              ))}
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                 <button onClick={toggleTheme} className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gray-100 dark:bg-gray-800 font-bold text-xs">
                    {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    {t.nav.theme} {/* ✅ Translated Theme Button */}
                 </button>
                 <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gray-100 dark:bg-gray-800 font-bold text-xs">
                    <Globe className="h-4 w-4 text-brand-500" />
                    <select 
                      value={language}
                      onChange={(e) => setLanguage(e.target.value as any)}
                      className="bg-transparent border-none outline-none focus:ring-0 uppercase"
                    >
                       <option value="en">EN</option>
                       <option value="ar">AR</option>
                       <option value="ur">UR</option>
                       <option value="pa">PA</option>
                    </select>
                 </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}