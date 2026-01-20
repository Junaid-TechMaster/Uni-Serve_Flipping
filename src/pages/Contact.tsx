import { MapPin, Phone, Mail, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleWhatsApp = () => {
    window.open(
      'https://wa.me/15551234567?text=Hello, I would like to know more about your courses',
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
                Get In Touch
              </h1>
              <p className="text-lg text-gray-200">
                Have questions? We're here to help you start your property flipping journey
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-28 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-16 md:grid-cols-2">

            {/* Contact Info */}
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Contact Information
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-10">
                Reach out to us through any of the following channels. We're available to
                answer your questions and provide guidance on choosing the right course for
                you.
              </p>

              <div className="space-y-8 mb-10">
                {[
                  {
                    icon: MapPin,
                    title: 'Address',
                    value: 'UAE, Media Center Plaza',
                    color: 'bg-brand-100 text-brand-600',
                  },
                  {
                    icon: Phone,
                    title: 'Phone',
                    value: '+92 311 5693431',
                    sub: 'Mon–Fri 9:00 AM – 6:00 PM EST',
                    color: 'bg-green-100 text-green-600',
                  },
                  {
                    icon: Mail,
                    title: 'Email',
                    value: 'uniserveuniversity@gmail.com',
                    sub: "We'll respond within 24 hours",
                    color: 'bg-red-100 text-red-600',
                  },
                ].map((item, index) => (
                  <div
                    key={item.title}
                    style={{ animationDelay: `${index * 120}ms` }}
                    className="flex items-start animate-fadeIn"
                  >
                    <div className={`rounded-full p-3 mr-4 ${item.color}`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {item.value}
                      </p>
                      {item.sub && (
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                          {item.sub}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                {/* WhatsApp */}
                <div className="flex items-start animate-fadeIn">
                  <div className="bg-green-100 rounded-full p-3 mr-4">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      WhatsApp
                    </h3>
                    <button
                      onClick={handleWhatsApp}
                      className="text-brand-600 hover:text-brand-700 font-medium transition-colors"
                    >
                      Chat with us on WhatsApp
                    </button>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Quick responses during business hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200/60 dark:border-gray-800/60 rounded-2xl shadow-lg p-8 transition-all hover:shadow-2xl">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Office Hours
                </h3>
                <div className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                  <p className="flex justify-between">
                    <span>Monday – Friday:</span>
                    <span className="font-medium">9:00 AM – 6:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-medium">10:00 AM – 4:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-medium">Closed</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-fadeIn">
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200/60 dark:border-gray-800/60 rounded-2xl shadow-lg p-10 transition-all hover:shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                  Send Us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { label: 'Your Name', value: 'name', type: 'text', placeholder: 'Enter Your Name' },
                    { label: 'Email Address', value: 'email', type: 'email', placeholder: 'john@example.com' },
                    { label: 'Subject', value: 'subject', type: 'text', placeholder: 'Course Inquiry' },
                  ].map((field) => (
                    <div key={field.value}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        required
                        value={(formData as any)[field.value]}
                        onChange={(e) =>
                          setFormData({ ...formData, [field.value]: e.target.value })
                        }
                        className="
                          w-full px-4 py-3 rounded-lg
                          bg-white dark:bg-gray-950
                          border border-gray-300 dark:border-gray-700
                          text-gray-900 dark:text-gray-100
                          focus:ring-2 focus:ring-brand-500 focus:outline-none
                          transition-colors
                        "
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="
                        w-full px-4 py-3 rounded-lg
                        bg-white dark:bg-gray-950
                        border border-gray-300 dark:border-gray-700
                        text-gray-900 dark:text-gray-100
                        focus:ring-2 focus:ring-brand-500 focus:outline-none
                        transition-colors
                      "
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="
                      w-full bg-brand-600 text-white py-4 rounded-lg font-semibold
                      hover:bg-brand-700 transition-all
                      flex items-center justify-center
                      active:scale-95
                    "
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
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
