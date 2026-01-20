import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import CourseCard from '../components/CourseCard';
import Teachers from '../components/Teachers';
import Reviews from '../components/Reviews';
import { Course } from '../types';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    setCourses([
      {
        id: 'property-investment',
        title: 'Property Investment',
        description: 'Learn how to invest in profitable property deals with confidence.',
        image_url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
        duration: '8 Weeks',
        level: 'Beginner',
        price: 499,
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
        id: 'property-flipping',
        title: 'Property Flipping',
        description: 'Buy, renovate, and resell properties for maximum profit.',
        image_url: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg',
        duration: '6 Weeks',
        level: 'Intermediate',
        price: 599,
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
        id: 'rental-income',
        title: 'Rental Income Mastery',
        description: 'Build long-term passive income through rental properties.',
        image_url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
        duration: '10 Weeks',
        level: 'Advanced',
        price: 399,
        status: 'coming_soon',
        features: [
          'Tenant screening',
          'Cash flow analysis',
          'Property management',
          'Scaling strategies',
        ],
        created_at: '2024-01-03',
      },
    ]);
  }, []);

  return (
    <div>
      {/* Hero */}
      <Hero onNavigate={onNavigate} />

      {/* Featured Courses */}
      <section className="py-28 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mb-16 animate-fadeIn">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Our Premium Courses
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Choose the perfect learning path for your property journey
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => (
              <div
                key={course.id}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Teachers />
      <Reviews />
    </div>
  );
}
