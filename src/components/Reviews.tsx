import { useEffect, useState } from 'react';
import { Review } from '../types';
import { Star, Quote } from 'lucide-react';

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Mock reviews data (frontend-only)
    const mockReviews: Review[] = [
      {
        id: 1,
        customer_name: 'Ahmed Khan',
        rating: 5,
        comment: 'This course completely changed how I invest in property. Highly recommended.',
        created_at: '2024-01-12',
      },
      {
        id: 2,
        customer_name: 'Sarah Ali',
        rating: 4,
        comment: 'Very practical and easy to follow. The examples were extremely helpful.',
        created_at: '2024-01-08',
      },
      {
        id: 3,
        customer_name: 'Usman Raza',
        rating: 5,
        comment: 'Clear explanations and real-world insights. Worth every penny.',
        created_at: '2024-01-03',
      },
      {
        id: 4,
        customer_name: 'Ayesha Malik',
        rating: 5,
        comment: 'Excellent support and well-structured content. I gained real confidence.',
        created_at: '2023-12-28',
      },
      {
        id: 5,
        customer_name: 'Bilal Ahmed',
        rating: 4,
        comment: 'Good pacing and solid fundamentals. Would recommend to beginners.',
        created_at: '2023-12-20',
      },
    ];

    setReviews(mockReviews);
  }, []);

  return (
    <section className="py-28 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="max-w-3xl mb-16 animate-fadeIn">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Join thousands of successful property investors who transformed their careers with us
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="
                relative
                bg-white/80 dark:bg-gray-900/80 backdrop-blur-md
                border border-gray-200/60 dark:border-gray-800/60
                rounded-2xl p-8
                shadow-md hover:shadow-2xl
                transition-all duration-500 ease-out
                transform hover:-translate-y-2 hover:scale-[1.02]
                animate-fadeIn
              "
              style={{ animationDelay: `${index * 120}ms` }}
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 h-10 w-10 text-gray-200 dark:text-gray-700" />

              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm leading-relaxed italic">
                “{review.comment}”
              </p>

              {/* User */}
              <div className="flex items-center pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="h-11 w-11 rounded-full bg-brand-600 flex items-center justify-center text-white font-semibold text-base">
                  {review.customer_name.charAt(0)}
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                    {review.customer_name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Verified Student
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
