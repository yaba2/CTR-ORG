import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { useCms, usePage } from '../context/CmsContext';

const serviceOptions = [
  'Research & Development',
  'Academic Support',
  'Consultation Services',
  'Therapy & Support',
  'Other',
];

const formEndpoint = 'https://formspree.io/f/mvzyqjqd';

export default function Contact() {
  const page = usePage('contact');
  const { settings } = useCms();
  const contactInfo = [
    { icon: Mail, label: 'Email', value: settings.email, href: `mailto:${settings.email}` },
    { icon: Phone, label: 'Phone', value: settings.phone, href: `tel:${settings.phone.replace(/\s/g, '')}` },
    { icon: MapPin, label: 'Address', value: settings.address, href: null },
    { icon: Clock, label: 'Hours', value: settings.hours, href: null },
  ];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: 'New Consultation Booking',
          recipient: 'yabaa2019@gmail.com',
        }),
      });

      if (!response.ok) {
        throw new Error('Unable to send your booking right now.');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', service: '', message: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24">
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-navy-800 to-navy-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-gold-400 rounded-full blur-3xl" />
        </div>
        <div className="relative site-container">
          <ScrollReveal>
            <span className="text-gold-400 font-semibold text-sm tracking-wide uppercase">{page.hero.eyebrow}</span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4 sm:mb-6">
              {page.hero.title}
            </h1>
            <p className="text-navy-200 text-base sm:text-lg max-w-3xl leading-relaxed">
              {page.hero.subtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="site-container">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <ScrollReveal>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-800 mb-2">
                  {page.form.title}
                </h2>
                <p className="text-gray-600 mb-8">
                  {page.form.subtitle}
                </p>

                {submitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
                    <CheckCircle size={48} className="text-emerald-500 mx-auto mb-4" />
                    <h3 className="font-serif font-bold text-ink-800 text-xl mb-2">{page.form.successTitle}</h3>
                    <p className="text-gray-600">{page.form.successMessage}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm">
                        {error}
                      </div>
                    )}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-ink-800 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20 outline-none transition-all text-gray-800"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-ink-800 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20 outline-none transition-all text-gray-800"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-ink-800 mb-2">
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20 outline-none transition-all text-gray-800 bg-white"
                      >
                        <option value="">Select a service</option>
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-ink-800 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20 outline-none transition-all text-gray-800 resize-none"
                        placeholder="Tell us about your needs..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-navy-800 text-white rounded-lg font-semibold hover:bg-navy-700 transition-all shadow-sm hover:shadow-md w-full sm:w-auto justify-center"
                    >
                      <Send size={18} />
                      {submitting ? 'Sending...' : 'Book a Consultation'}
                    </button>
                  </form>
                )}
              </ScrollReveal>
            </div>

            <div className="lg:col-span-2">
              <ScrollReveal delay={200}>
                <div className="bg-gray-50 rounded-2xl p-8">
                  <h3 className="font-serif font-bold text-ink-800 text-lg mb-6">{page.infoTitle}</h3>
                  <div className="space-y-6">
                    {contactInfo.map((ci) => (
                      <div key={ci.label} className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-navy-800 text-gold-400 rounded-lg flex items-center justify-center shrink-0">
                          <ci.icon size={18} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-ink-800">{ci.label}</div>
                          {ci.href ? (
                            <a href={ci.href} className="text-gray-600 text-sm hover:text-ink-700 transition-colors">
                              {ci.value}
                            </a>
                          ) : (
                            <div className="text-gray-600 text-sm">{ci.value}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-ink-800 text-sm mb-3">{page.guaranteeTitle}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {page.guaranteeText}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
