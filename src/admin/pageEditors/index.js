import { HomeEditor, AboutEditor } from './HomeAbout';
import { GovernmentEditor, ServicesEditor, StudentsEditor } from './InnerPages';
import { BlogPageEditor, ContactEditor, TestimonialsPageEditor } from './SimplePages';

export const pageEditors = {
  home: HomeEditor,
  about: AboutEditor,
  services: ServicesEditor,
  students: StudentsEditor,
  government: GovernmentEditor,
  contact: ContactEditor,
  testimonials: TestimonialsPageEditor,
  blog: BlogPageEditor,
};

export const pageOutlines = {
  home: [
    { id: 'hero', label: 'Hero banner' },
    { id: 'services', label: 'Services overview' },
    { id: 'grand-opening', label: 'Grand opening' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'cta', label: 'Call to action' },
    { id: 'blog', label: 'Blog intro' },
  ],
  about: [
    { id: 'hero', label: 'Page banner' },
    { id: 'story', label: 'Our story' },
    { id: 'mission', label: 'Mission & vision' },
    { id: 'values', label: 'Our values' },
  ],
  services: [
    { id: 'hero', label: 'Page banner' },
    { id: 'service-1', label: 'Research & Development' },
    { id: 'service-2', label: 'Academic Support' },
    { id: 'service-3', label: 'Consultation Services' },
    { id: 'service-4', label: 'Therapy & Support' },
    { id: 'cta', label: 'Call to action' },
  ],
  students: [
    { id: 'hero', label: 'Page banner' },
    { id: 'process', label: 'Process introduction' },
    { id: 'step-1', label: 'Step 1: Topic selection' },
    { id: 'step-2', label: 'Step 2: Proposal writing' },
    { id: 'step-3', label: 'Step 3: Methodology' },
    { id: 'step-4', label: 'Step 4: Data analysis' },
    { id: 'step-5', label: 'Step 5: Thesis preparation' },
    { id: 'programs', label: 'Support programs' },
    { id: 'cta', label: 'Call to action' },
  ],
  government: [
    { id: 'hero', label: 'Page banner' },
    { id: 'services-intro', label: 'Services introduction' },
    { id: 'gov-service-1', label: 'Policy Research' },
    { id: 'gov-service-2', label: 'Strategic Planning' },
    { id: 'gov-service-3', label: 'Data-Driven Solutions' },
    { id: 'trust', label: 'Why trust CTR' },
    { id: 'cta', label: 'Call to action' },
  ],
  contact: [
    { id: 'hero', label: 'Page banner' },
    { id: 'form', label: 'Form copy' },
    { id: 'sidebar', label: 'Contact sidebar' },
  ],
  testimonials: [
    { id: 'hero', label: 'Page banner' },
    { id: 'stats', label: 'Results numbers' },
    { id: 'quotes', label: 'Customer quotes' },
  ],
  blog: [
    { id: 'hero', label: 'Blog heading' },
    { id: 'posts', label: 'Blog articles' },
  ],
};

export const publicPath = {
  home: '/',
  about: '/about',
  services: '/services',
  students: '/students',
  government: '/government',
  contact: '/contact',
  testimonials: '/testimonials',
  blog: '/blog',
};
