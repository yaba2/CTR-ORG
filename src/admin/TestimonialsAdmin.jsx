import TestimonialsManager from './TestimonialsManager';

export default function TestimonialsAdmin() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-navy-800 mb-2">Testimonials</h1>
      <p className="text-navy-600 mb-8">Quotes shown on the homepage and testimonials page.</p>
      <TestimonialsManager />
    </div>
  );
}
