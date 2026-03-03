import { MapPin, Phone, Mail, MessageCircle, Send, Globe } from 'lucide-react';
import { useState } from 'react';

// ✅ Added Language Imports
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // ✅ Get the current language
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ✅ Translate the success alert message
    alert(t.contact?.alertSuccess || 'Thank you for your message! Our global support team will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleWhatsApp = () => {
    // ✅ Translate the default WhatsApp message
    const waMessage = encodeURIComponent(t.contact?.waDefaultMsg || 'Hello Uniserve University, I would like to know more about your courses.');
    window.open(
      `https://wa.me/923115693431?text=${waMessage}`,
      '_blank'
    );
  };

  return (
    <div className="pt-28">
      {/* Page Hero */}
      <section className="relative h-[360px] sm:h-[420px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1600)',
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl text-white animate-fadeIn">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                {t.contact?.heroTitle || "Global Support"}
              </h1>
              <p className="text-lg text-gray-200 italic">
                {t.contact?.heroSub || "Uniserve University: Connecting students from Pakistan, USA, UK, and UAE to world-class expertise."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-28 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-16 md:grid-cols-2">
            
            {/* Contact Info Cards with 3D Depth */}
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                {t.contact?.reachUs || "Reach Our Experts"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                {t.contact?.reachDesc || "Whether you are a beginner or a professional, our team is here to guide your transition from the University to the Flipping platform."}
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                {[
                  { icon: Globe, title: t.contact?.box1Title || 'Global Reach', value: t.contact?.box1Value || 'PK, USA, UK, UAE', color: 'bg-blue-100 text-blue-600' },
                  { icon: Phone, title: t.contact?.box2Title || 'WhatsApp/Call', value: '+92 311 5693431', color: 'bg-green-100 text-green-600' },
                  { icon: Mail, title: t.contact?.box3Title || 'Official Email', value: 'uniserveuniversity@gmail.com', color: 'bg-red-100 text-red-600' },
                  { icon: MapPin, title: t.contact?.box4Title || 'HQ Address', value: t.contact?.box4Value || 'UAE, Media Center Plaza', color: 'bg-brand-100 text-brand-600' },
                ].map((item, index) => (
                  <div key={item.title} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 transform transition-all hover:-translate-y-2 hover:shadow-xl">
                    <div className={`rounded-xl p-3 w-fit mb-4 ${item.color}`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400" dir={item.icon === Phone ? 'ltr' : 'auto'}>{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-brand-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
                <MessageCircle className="absolute -right-4 -bottom-4 rtl:-left-4 rtl:-right-auto h-32 w-32 text-white/10 transform rotate-12 transition-transform group-hover:scale-110" />
                <h3 className="text-xl font-bold mb-2">
                  {t.contact?.quickAnswerTitle || "Need a Quick Answer?"}
                </h3>
                <p className="text-brand-100 text-sm mb-6">
                  {t.contact?.quickAnswerDesc || "Join our international student community on WhatsApp for real-time guidance."}
                </p>
                <button onClick={handleWhatsApp} className="bg-white text-brand-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-brand-50 transition-colors">
                  {t.contact?.openWa || "Open WhatsApp Chat"}
                </button>
              </div>
            </div>

            {/* Contact Form with Depth */}
            <div className="animate-fadeIn">
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-10 border border-gray-100 dark:border-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                  {t.contact?.formTitle || "Consult Our Admissions"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                        {t.contact?.fName || "Name"}
                      </label>
                      <input 
                        type="text" 
                        required 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-brand-500 text-sm" 
                        placeholder={t.contact?.pName || "Full Name"} 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                        {t.contact?.fEmail || "Email"}
                      </label>
                      <input 
                        type="email" 
                        required 
                        value={formData.email} 
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-brand-500 text-sm" 
                        placeholder="email@example.com" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                      {t.contact?.fSubject || "Subject"}
                    </label>
                    <input 
                      type="text" 
                      required 
                      value={formData.subject} 
                      onChange={(e) => setFormData({...formData, subject: e.target.value})} 
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-brand-500 text-sm" 
                      placeholder={t.contact?.pSubject || "Course or Platform Inquiry"} 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                      {t.contact?.fMessage || "Message"}
                    </label>
                    <textarea 
                      required 
                      rows={4} 
                      value={formData.message} 
                      onChange={(e) => setFormData({...formData, message: e.target.value})} 
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-brand-500 text-sm" 
                      placeholder={t.contact?.pMessage || "Tell us how we can help you..."} 
                    />
                  </div>
                  <button type="submit" className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-brand-500/30 hover:bg-brand-700 transition-all flex items-center justify-center gap-2">
                    <Send className="h-4 w-4 me-2" /> 
                    {t.contact?.btnSend || "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}