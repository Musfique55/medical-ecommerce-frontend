import { Shield, Award, Lock, HeartPulse } from 'lucide-react';

const badges = [
  {
    icon: Shield,
    title: 'FDA Licensed',
    description: 'Fully certified pharmacy',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Award,
    title: 'NABP Accredited',
    description: 'Verified by national board',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Lock,
    title: 'Secure Checkout',
    description: '256-bit SSL encryption',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: HeartPulse,
    title: 'Licensed Pharmacists',
    description: 'Expert health support',
    color: 'from-red-500 to-pink-600'
  }
];

export function TrustBadges() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Why Trust HealthHub
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your safety and wellbeing are our top priorities. We maintain the highest standards in pharmaceutical care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="relative bg-gradient-to-br from-blue-50 to-sky-50 rounded-3xl p-8 text-center hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 border border-blue-100 group"
            >
              <div className={`bg-gradient-to-br ${badge.color} size-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <badge.icon className="size-8 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                {badge.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {badge.description}
              </p>
            </div>
          ))}
        </div>

        {/* Certification Logos */}
        <div className="mt-16 pt-12 border-t border-blue-100">
          <p className="text-center text-sm text-gray-500 mb-8 font-medium">
            CERTIFIED & RECOGNIZED BY
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            {['FDA', 'NABP', 'HIPAA', 'VIPPS', 'BBB A+'].map((cert) => (
              <div
                key={cert}
                className="text-2xl font-bold text-gray-400"
              >
                {cert}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}