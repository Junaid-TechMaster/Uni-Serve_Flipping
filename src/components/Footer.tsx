import mono from '../image/monogram.jpeg';
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-16">

          {/* Brand */}
          <div>
            <img
              src={mono}
              alt="UNI SERVE Monogram"
              className="
                h-16 w-24
                object-cover
                rounded-full
                border-2 border-brand-500
                p-1
                mb-4
                shadow-md
              "
            />

            <h1 className="text-xl font-bold text-brand-500 mb-3">
              UNI SERVE FLIPPING
            </h1>

            <p className="text-gray-400 dark:text-gray-500 mb-6 leading-relaxed">
              Empowering aspiring investors with the knowledge and skills to
              succeed in property flipping.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="https://www.facebook.com/share/14RJfthmEQL/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-gray-400 hover:bg-white/10 hover:text-brand-500 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>

              <a
                href="https://www.instagram.com/uniserveuniversity?igsh=MXRocXFmNjZvbWhqbw=="
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-gray-400 hover:bg-white/10 hover:text-brand-500 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>

              <a
                href="https://youtube.com/@uniserveuniversity?si=8iPjYa3h9yuhELhW"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-gray-400 hover:bg-white/10 hover:text-brand-500 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@uniserveuniversity?_r=1&_t=ZS-939ovfLNHXO"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-gray-400 hover:bg-white/10 hover:text-brand-500 transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M16.5 1.5c.7 3.1 2.7 5.6 5.5 6.7v4.3c-2.1 0-4.1-.6-5.5-1.7v6.7c0 3.8-3.1 6.8-6.9 6.8S2.8 21.3 2.8 17.5c0-3.7 3.1-6.8 6.9-6.8.4 0 .9 0 1.3.1v4.5c-.4-.1-.8-.2-1.3-.2-1.4 0-2.5 1.1-2.5 2.4s1.1 2.4 2.5 2.4 2.6-1.1 2.6-2.4V1.5h3.2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['home', 'about', 'courses', 'contact'].map(page => (
                <li key={page}>
                  <button
                    onClick={() => onNavigate(page)}
                    className="text-gray-400 dark:text-gray-500 hover:text-brand-500 transition-colors"
                  >
                    {page === 'home'
                      ? 'Home'
                      : page === 'about'
                      ? 'About Us'
                      : page === 'courses'
                      ? 'Courses'
                      : 'Contact Us'}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Courses</h4>
            <ul className="space-y-3 text-gray-400 dark:text-gray-500">
              <li>Theoretical Course</li>
              <li>Video Lectures Course</li>
              <li>Hybrid Course</li>
              <li>Free Resources</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-400 dark:text-gray-500">
                <MapPin className="h-5 w-5 mr-3 mt-0.5" />
                <span>UAE, Media Center Plaza</span>
              </li>
              <li className="flex items-center text-gray-400 dark:text-gray-500">
                <Phone className="h-5 w-5 mr-3" />
                <span>+92 311 5693431</span>
              </li>
              <li className="flex items-center text-gray-400 dark:text-gray-500">
                <Mail className="h-5 w-5 mr-3" />
                <span>uniserveuniversity@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 dark:border-gray-900 pt-8 text-center text-gray-500 text-sm">
          © 2026 UNI SERVE UNIVERSITY. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
