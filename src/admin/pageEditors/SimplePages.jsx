import { Link } from 'react-router-dom';
import { Field, ItemCard, Section, updateList } from '../form/Fields';
import TestimonialsManager from '../TestimonialsManager';

export function ContactEditor({ content, onChange }) {
  const hero = content.hero || {};
  const form = content.form || {};
  const set = (key, value) => onChange({ ...content, [key]: value });

  return (
    <>
      <Section id="hero" number="1" title="Page banner" description="Top of the Contact page.">
        <Field label="Small heading" value={hero.eyebrow} onChange={(eyebrow) => set('hero', { ...hero, eyebrow })} />
        <Field label="Page title" value={hero.title} onChange={(title) => set('hero', { ...hero, title })} />
        <Field label="Introduction" value={hero.subtitle} onChange={(subtitle) => set('hero', { ...hero, subtitle })} textarea />
      </Section>

      <Section id="form" number="2" title="Contact form copy" description="Headings around the booking form.">
        <Field label="Form title" value={form.title} onChange={(title) => set('form', { ...form, title })} />
        <Field label="Form description" value={form.subtitle} onChange={(subtitle) => set('form', { ...form, subtitle })} textarea />
        <Field label="Success title" value={form.successTitle} onChange={(successTitle) => set('form', { ...form, successTitle })} />
        <Field
          label="Success message"
          value={form.successMessage}
          onChange={(successMessage) => set('form', { ...form, successMessage })}
          textarea
        />
      </Section>

      <Section
        id="sidebar"
        number="3"
        title="Contact sidebar"
        description="Text beside the form. Email, phone, address, and hours are edited in Settings."
      >
        <Field label="Contact information heading" value={content.infoTitle} onChange={(infoTitle) => set('infoTitle', infoTitle)} />
        <Field
          label="Guarantee heading"
          value={content.guaranteeTitle}
          onChange={(guaranteeTitle) => set('guaranteeTitle', guaranteeTitle)}
        />
        <Field
          label="Guarantee text"
          value={content.guaranteeText}
          onChange={(guaranteeText) => set('guaranteeText', guaranteeText)}
          textarea
        />
        <p className="text-sm text-ink-600">
          To change email, phone, address, or hours, go to{' '}
          <Link to="/admin/settings" className="font-medium text-ink-800 underline">
            Settings
          </Link>
          .
        </p>
      </Section>
    </>
  );
}

export function TestimonialsPageEditor({ content, onChange }) {
  const hero = content.hero || {};
  const stats = content.stats || [];
  const set = (key, value) => onChange({ ...content, [key]: value });

  return (
    <>
      <Section id="hero" number="1" title="Page banner" description="Top of the Testimonials page.">
        <Field label="Small heading" value={hero.eyebrow} onChange={(eyebrow) => set('hero', { ...hero, eyebrow })} />
        <Field label="Page title" value={hero.title} onChange={(title) => set('hero', { ...hero, title })} />
        <Field label="Introduction" value={hero.subtitle} onChange={(subtitle) => set('hero', { ...hero, subtitle })} textarea />
      </Section>

      <Section id="stats" number="2" title="Results numbers" description="The three numbers at the bottom of the Testimonials page.">
        <div className="grid sm:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <ItemCard key={index} title={`Number ${index + 1}`}>
              <Field
                label="Number"
                value={stat.value}
                onChange={(value) => set('stats', updateList(stats, index, { value }))}
              />
              <Field
                label="Label"
                value={stat.label}
                onChange={(label) => set('stats', updateList(stats, index, { label }))}
              />
            </ItemCard>
          ))}
        </div>
      </Section>

      <Section id="quotes" number="3" title="Customer quotes" description="Add, edit, or remove testimonials shown on this page and the homepage.">
        <TestimonialsManager />
      </Section>
    </>
  );
}

export function BlogPageEditor({ content, onChange }) {
  const hero = content.hero || {};
  const set = (key, value) => onChange({ ...content, [key]: value });

  return (
    <>
      <Section id="hero" number="1" title="Blog page heading" description="Title and intro at the top of the Blog page.">
        <Field label="Page title" value={hero.title} onChange={(title) => set('hero', { ...hero, title })} />
        <Field label="Introduction" value={hero.subtitle} onChange={(subtitle) => set('hero', { ...hero, subtitle })} textarea />
      </Section>

      <Section id="posts" number="2" title="Blog articles" description="Individual posts are created and edited separately.">
        <p className="text-sm text-ink-600">
          Create and update articles in{' '}
          <Link to="/admin/posts" className="font-medium text-ink-800 underline">
            Blog posts
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
