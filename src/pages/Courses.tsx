import { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import CourseCardSkeleton from '../components/CourseCardSkeleton';
import { Course } from '../types';
import { BookOpen } from 'lucide-react';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Frontend-only static data (matches CourseCard requirements)
    const data: Course[] = [
      {
        id: 'property',
        title: 'Property Investment',
        description: 'Learn how to invest in profitable property deals.',
        price: 499,
        image_url:
          'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
        duration: '8 Weeks',
        level: 'Beginner',
        status: 'active',
        features: [
          'Market analysis',
          'Deal sourcing',
          'Risk management',
          'Portfolio building',
        ],
        created_at: '2024-01-01',
      },
      {
        id: 'flipping',
        title: 'Property Flipping',
        description: 'Buy, renovate, and resell properties for profit.',
        price: 599,
        image_url:
          'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg',
        duration: '6 Weeks',
        level: 'Intermediate',
        status: 'active',
        features: [
          'Renovation planning',
          'Cost control',
          'Resale strategies',
          'Profit optimization',
        ],
        created_at: '2024-01-02',
      },
      {
        id: 'rental',
        title: 'Rental Income',
        description: 'Build long-term passive income through rentals.',
        price: 399,
        image_url:
          'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
        duration: '10 Weeks',
        level: 'Advanced',
        status: 'coming_soon',
        features: [
          'Tenant screening',
          'Cash flow analysis',
          'Property management',
          'Scaling strategies',
        ],
        created_at: '2024-01-03',
      },
    ];

    const finalCourses =
      data.length >= 3
        ? [
            ...data,
            {
              ...data[0],
              id: 'digital-marketing',
              title: 'Digital Marketing',
              description:
                'Learn SEO, social media marketing, paid advertising, analytics, and growth strategies.',
            },
            {
              ...data[1],
              id: 'shopify',
              title: 'Shopify',
              description:
                'Create, launch, and scale high-converting Shopify eCommerce stores from scratch.',
            },
            {
              ...data[2],
              id: 'amazon',
              title: 'Amazon',
              description:
                'Master Amazon FBA, product research, listing optimization, branding, and scaling.',
            },
          ]
        : data;

    // Simulate API delay for skeleton UX
    setTimeout(() => {
      setCourses(finalCourses);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="pt-28">

      {/* Page Hero */}
      <section className="relative h-[360px] sm:h-[420px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=1600)',
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl text-white animate-fadeIn">
              <BookOpen className="h-14 w-14 mb-4 text-white/90" />
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Our Courses
              </h1>
              <p className="text-lg text-gray-200">
                Comprehensive training programs designed to take you from beginner to expert
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-24 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section Header */}
          <div className="max-w-3xl mb-16 animate-fadeIn">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Select the course that best fits your goals and learning style
            </p>
          </div>

          {/* Courses */}
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    style={{ animationDelay: `${index * 120}ms` }}
                    className="animate-fadeIn"
                  >
                    <CourseCardSkeleton />
                  </div>
                ))
              : courses.map((course, index) => (
                  <div
                    key={course.id}
                    style={{ animationDelay: `${index * 120}ms` }}
                    className="animate-fadeIn"
                  >
                    <CourseCard course={course} />
                  </div>
                ))}
          </div>
        </div>
      </section>
    </div>
  );
}
