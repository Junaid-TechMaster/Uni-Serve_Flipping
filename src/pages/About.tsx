import { Target, Users, Award, TrendingUp } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-28">

      {/* Page Hero */}
      <section className="relative h-[360px] sm:h-[420px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1600)',
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl text-white animate-fadeIn">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                About UNI SERVE FLIPPING
              </h1>
              <p className="text-lg text-gray-200">
                Empowering investors worldwide with expert knowledge in property flipping
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-28 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">

          {/* Our Story */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-28">
            <div className="animate-fadeIn">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Our Story
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                UNI SERVE FLIPPING was founded in 2015 by a team of successful property investors who
                recognized the need for comprehensive, practical education in the real estate flipping
                industry. What started as small workshops has grown into a leading online platform serving
                thousands of students worldwide.
              </p>

              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Our mission is to democratize access to high-quality property investment education,
                providing aspiring investors with the tools, knowledge, and confidence they need to
                succeed in the competitive world of property flipping.
              </p>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                With a combined experience of over 50 years in real estate investment and education, our
                team has successfully flipped over 500 properties, generating millions in profits. Now,
                we're dedicated to helping you achieve similar success.
              </p>
            </div>

            <div className="animate-fadeIn">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Team meeting"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 mb-28">
            {[
              {
                icon: Users,
                value: '5,000+',
                label: 'Students Worldwide',
                color: 'bg-blue-600',
              },
              {
                icon: Award,
                value: '500+',
                label: 'Properties Flipped',
                color: 'bg-green-600',
              },
              {
                icon: TrendingUp,
                value: '95%',
                label: 'Success Rate',
                color: 'bg-yellow-600',
              },
              {
                icon: Target,
                value: '50+',
                label: 'Years Combined Experience',
                color: 'bg-red-600',
              },
            ].map((stat, index) => (
              <div
                key={index}
                style={{ animationDelay: `${index * 120}ms` }}
                className="
                  bg-white/80 dark:bg-gray-900/80 backdrop-blur-md
                  border border-gray-200/60 dark:border-gray-800/60
                  rounded-2xl p-8 text-center shadow-lg
                  transition-all duration-300
                  hover:-translate-y-2 hover:shadow-2xl
                  animate-fadeIn
                "
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 ${stat.color} text-white rounded-full mb-4`}
                >
                  <stat.icon className="h-7 w-7" />
                </div>

                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Why Choose */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-14 text-white animate-fadeIn">
            <h2 className="text-3xl font-bold mb-10 text-center">
              Why Choose UNI SERVE FLIPPING?
            </h2>

            <div className="grid md:grid-cols-3 gap-10 text-center">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Expert Instructors
                </h3>
                <p className="text-blue-100 dark:text-gray-300 text-sm">
                  Learn from professionals with proven track records in property flipping
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Practical Approach
                </h3>
                <p className="text-blue-100 dark:text-gray-300 text-sm">
                  Real-world strategies and case studies you can apply immediately
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Ongoing Support
                </h3>
                <p className="text-blue-100 dark:text-gray-300 text-sm">
                  Join a community of investors and get continuous mentorship
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
