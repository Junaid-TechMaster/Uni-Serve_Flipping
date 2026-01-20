import { Clock, TrendingUp, CheckCircle, ShoppingCart } from 'lucide-react';
import { Course } from '../types';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const { addToCart, cart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const isInCart = cart.some(item => item.id === course.id);
  const isComingSoon = course.status === 'coming_soon';

  const handleAddToCart = () => {
    if (!isComingSoon && !isInCart) {
      addToCart(course);
    }
  };

  return (
    <div
      className="
        bg-white/80 dark:bg-gray-900/80 backdrop-blur-md
        border border-gray-200/60 dark:border-gray-800/60
        rounded-2xl overflow-hidden
        shadow-md hover:shadow-2xl
        transition-all duration-500 ease-out
        transform hover:-translate-y-2 hover:scale-[1.015]
        animate-fadeIn
      "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={course.image_url}
          alt={course.title}
          className={`
            w-full h-full object-cover
            transition-transform duration-700 ease-out
            ${isHovered ? 'scale-110' : 'scale-100'}
          `}
        />

        {isComingSoon && (
          <div className="absolute top-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-md">
            Coming Soon
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white leading-tight">
            {course.title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-2">
          {course.description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between mb-4 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            <span>{course.level}</span>
          </div>
        </div>

        {/* Features */}
        <div className="mb-5">
          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-sm">
            What you’ll learn
          </h4>
          <ul className="space-y-1">
            {course.features.slice(0, 3).map((feature, index) => (
              <li
                key={index}
                className="flex items-start text-xs text-gray-600 dark:text-gray-400"
              >
                <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
          <span className="text-2xl font-bold text-brand-600">
            ${course.price}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={isComingSoon || isInCart}
            className={`
              flex items-center px-5 py-2.5 rounded-full text-sm font-semibold
              transition-all duration-300
              active:scale-95
              ${
                isComingSoon
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : isInCart
                  ? 'bg-green-500 text-white cursor-default'
                  : 'bg-brand-600 text-white hover:bg-brand-700 hover:scale-105'
              }
            `}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isComingSoon ? 'Coming Soon' : isInCart ? 'In Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
