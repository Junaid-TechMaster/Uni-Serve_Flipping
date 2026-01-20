import { useEffect, useState } from 'react';
import { Teacher } from '../types';
import { Award } from 'lucide-react';

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    // Mock teachers data (frontend-only)
    const mockTeachers: Teacher[] = [
      {
        id: 1,
        name: 'Ahmed Khan',
        title: 'Senior Property Investor',
        bio: 'Over 15 years of experience in residential and commercial property investments.',
        experience: '15+ Years Experience',
        image_url: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e',
        created_at: '2023-01-01',
      },
      {
        id: 2,
        name: 'Sarah Malik',
        title: 'Real Estate Strategist',
        bio: 'Specialist in buy-to-let strategies and long-term portfolio growth.',
        experience: '10+ Years Experience',
        image_url: 'https://images.unsplash.com/photo-1554151228-14d9def656e4',
        created_at: '2023-01-02',
      },
      {
        id: 3,
        name: 'Usman Raza',
        title: 'Property Development Expert',
        bio: 'Expert in flipping, renovation, and high-yield property projects.',
        experience: '12+ Years Experience',
        image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
        created_at: '2023-01-03',
      },
      {
        id: 4,
        name: 'Ayesha Ali',
        title: 'Commercial Property Advisor',
        bio: 'Advises investors on scaling into commercial and mixed-use properties.',
        experience: '8+ Years Experience',
        image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
        created_at: '2023-01-04',
      },
    ];

    setTeachers(mockTeachers);
  }, []);

  return (
    <section className="py-28 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="max-w-3xl mb-16 animate-fadeIn">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Meet Our Expert Instructors
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Learn from seasoned professionals who have successfully flipped hundreds of properties
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {teachers.map((teacher, index) => (
            <div
              key={teacher.id}
              className="
                bg-white/80 dark:bg-gray-900/80 backdrop-blur-md
                border border-gray-200/60 dark:border-gray-800/60
                rounded-2xl overflow-hidden
                shadow-md hover:shadow-2xl
                transition-all duration-500 ease-out
                transform hover:-translate-y-2 hover:scale-[1.02]
                animate-fadeIn
              "
              style={{ animationDelay: `${index * 120}ms` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={teacher.image_url}
                  alt={teacher.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {teacher.name}
                  </h3>
                  <p className="text-xs text-gray-200">
                    {teacher.title}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 line-clamp-3">
                  {teacher.bio}
                </p>

                <div className="flex items-center text-brand-600 text-sm font-semibold">
                  <Award className="h-5 w-5 mr-2" />
                  {teacher.experience}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
