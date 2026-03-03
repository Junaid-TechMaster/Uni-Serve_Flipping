import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext'; // ✅ Import LanguageProvider
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import CoursesPage from './pages/Courses';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PageTransition from './components/PageTransition';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // ✅ Language state and RTL useEffect have been removed! 
  // The LanguageProvider now handles all of that automatically.

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'about':
        return <About />;
      case 'courses':
        return <CoursesPage />;
      case 'contact':
        return <Contact />;
      case 'cart':
        return <Cart onNavigate={setCurrentPage} />;
      case 'checkout':
        return <Checkout onNavigate={handleNavigate}  />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LanguageProvider> {/* ✅ Wrap everything inside LanguageProvider */}
      <CartProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          <Navbar 
            currentPage={currentPage} 
            onNavigate={handleNavigate} 
            // ✅ Removed currentLanguage and onLanguageChange props
          />

          <main className="pt-0">
            <PageTransition pageKey={currentPage}>
              {renderPage()}
            </PageTransition>
          </main>

          <Footer onNavigate={handleNavigate} />
        </div>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;