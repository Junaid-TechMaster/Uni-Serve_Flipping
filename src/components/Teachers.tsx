import { useEffect, useState } from 'react';
import { Teacher } from '../types';
import { Award, Globe2 } from 'lucide-react';

// ✅ Added Language Imports
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  // ✅ Get the current language
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;

  useEffect(() => {
    // ✅ Replaced hardcoded text with multi-language setups & updated images
    const mockTeachers: Teacher[] = [
      {
        id: 1,
        name: t.teachers?.t1Name || 'Sarah Jenkins',
        title: t.teachers?.t1Title || 'English - Growth Expert',
        bio: t.teachers?.t1Bio || 'Scaled multiple 7-figure brands globally. Leads our English medium E-commerce training.',
        experience: t.teachers?.t1Exp || '10+ Years Experience',
        image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
        created_at: '2026-12-06',
      },
      {
        id: 2,
        name: t.teachers?.t2Name || 'Ali Rehman',
        title: t.teachers?.t2Title || 'Urdu - Property Strategist',
        bio: t.teachers?.t2Bio || 'Leading expert in land flipping across Pakistan. Directs our Urdu real estate curriculum.',
        experience: t.teachers?.t2Exp || '15+ Years Experience',
        image_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
        created_at: '2026-12-06',
      },
      {
        id: 3,
        name: t.teachers?.t3Name || 'Fatima Al-Zahra',
        title: t.teachers?.t3Title || 'Arabic - Trading Analyst',
        bio: t.teachers?.t3Bio || 'Expert technical analyst for UAE markets. Head of our Arabic financial trading program.',
        experience: t.teachers?.t3Exp || '12+ Years Experience',
        image_url: 'https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?auto=format&fit=crop&q=80&w=800',
        created_at: '2026-12-06',
      },
      {
        id: 4,
        name: t.teachers?.t4Name || 'Gurpreet Singh',
        title: t.teachers?.t4Title || 'Hindi/Punjabi - Marketing',
        bio: t.teachers?.t4Bio || 'Creative lead for South Asian campaigns. Specializes in Hindi and Punjabi digital marketing.',
        experience: t.teachers?.t4Exp || '8+ Years Experience',
        image_url: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?auto=format&fit=crop&q=80&w=800',
        created_at: '2026-12-06',
      },
    ];
    setTeachers(mockTeachers);
  }, [language, t]); // ✅ Updates when language changes

  return (
    <section className="py-28 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 text-xs font-bold mb-4">
            <Globe2 className="h-3 w-3" /> {t.teachers?.badge || "UNISERVE GLOBAL FACULTY"}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t.teachers?.title || "Our Elite Instructors"}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t.teachers?.subtitle || "Industry veterans operating in Pakistan, USA, UK, and UAE."}
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {teachers.map((teacher, index) => (
            <div key={teacher.id} style={{ animationDelay: `${index * 120}ms` }} className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200/60 dark:border-gray-800/60 rounded-2xl overflow-hidden shadow-md depth-card animate-fadeIn">
              <div className="relative h-64 overflow-hidden">
                <img src={teacher.image_url} alt={teacher.name} className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4">
                  <h3 className="text-lg font-bold text-white">{teacher.name}</h3>
                  <p className="text-xs text-brand-300 font-bold">{teacher.title}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 leading-relaxed italic">"{teacher.bio}"</p>
                <div className="flex items-center text-brand-600 text-xs font-black uppercase tracking-tighter">
                  <Award className="h-4 w-4 me-2" /> {teacher.experience}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}