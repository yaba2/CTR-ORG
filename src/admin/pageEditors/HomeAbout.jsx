import { Field, ImageField, ImageList, ItemCard, Section, StringList, updateList } from '../form/Fields';
import TestimonialsManager from '../TestimonialsManager';

export function HomeEditor({ content, onChange }) {
  const hero = content.hero || {};
  const services = content.services || {};
  const grandOpening = content.grandOpening || {};
  const testimonials = content.testimonials || {};
  const cta = content.cta || {};
  const blog = content.blog || {};

  const set = (key, value) => onChange({ ...content, [key]: value });
  const setHero = (patch) => set('hero', { ...hero, ...patch });
  const setServices = (patch) => set('services', { ...services, ...patch });

  return (
    <>
      <Section
        id="hero"
        number="1"
        title="Hero banner"
        description="The first section visitors see on the homepage. Upload a background photo here, then edit the headline and buttons."
      >
        <div className="rounded-xl border-2 border-navy-200 bg-navy-50 p-5">
          <ImageField
            label="Hero background image"
            hint="This is the photo behind the homepage headline. Click Upload from device, then Save changes at the top of this page."
            value={hero.backgroundImage || ''}
            onChange={(backgroundImage) => setHero({ backgroundImage })}
          />
        </div>
        <Field label="Small badge text" value={hero.badge} onChange={(badge) => setHero({ badge })} />
        <Field label="Headline" value={hero.title} onChange={(title) => setHero({ title })} textarea rows={2} />
        <Field
          label="Highlighted words in the headline"
          hint="This part of the headline appears in the gold accent color."
          value={hero.titleHighlight}
          onChange={(titleHighlight) => setHero({ titleHighlight })}
        />
        <Field label="Supporting paragraph" value={hero.subtitle} onChange={(subtitle) => setHero({ subtitle })} textarea />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Primary button" value={hero.primaryCta} onChange={(primaryCta) => setHero({ primaryCta })} />
          <Field label="Secondary button" value={hero.secondaryCta} onChange={(secondaryCta) => setHero({ secondaryCta })} />
        </div>
        <div className="pt-2">
          <div className="text-sm font-semibold text-ink-800 mb-3">Homepage stats</div>
          <div className="grid sm:grid-cols-3 gap-4">
            {(hero.stats || []).map((stat, index) => (
              <ItemCard key={index} title={`Stat ${index + 1}`}>
                <Field
                  label="Number"
                  value={stat.value}
                  onChange={(value) => setHero({ stats: updateList(hero.stats, index, { value }) })}
                />
                <Field
                  label="Label"
                  value={stat.label}
                  onChange={(label) => setHero({ stats: updateList(hero.stats, index, { label }) })}
                />
              </ItemCard>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="services"
        number="2"
        title="Services overview"
        description="The four service cards in the middle of the homepage."
      >
        <Field label="Small heading" value={services.eyebrow} onChange={(eyebrow) => setServices({ eyebrow })} />
        <Field label="Section title" value={services.title} onChange={(title) => setServices({ title })} />
        <Field label="Section description" value={services.subtitle} onChange={(subtitle) => setServices({ subtitle })} textarea />
        {(services.items || []).map((item, index) => (
          <ItemCard key={index} title={`Service card ${index + 1}: ${item.title || 'Untitled'}`}>
            <Field
              label="Service name"
              value={item.title}
              onChange={(title) => setServices({ items: updateList(services.items, index, { title }) })}
            />
            <Field
              label="Short description"
              value={item.description}
              onChange={(description) => setServices({ items: updateList(services.items, index, { description }) })}
              textarea
            />
          </ItemCard>
        ))}
      </Section>

      <Section
        id="grand-opening"
        number="3"
        title="Grand opening"
        description="Heading and photos for the homepage slideshow. Upload, add, or remove images here."
      >
        <Field label="Small heading" value={grandOpening.eyebrow} onChange={(eyebrow) => set('grandOpening', { ...grandOpening, eyebrow })} />
        <Field label="Section title" value={grandOpening.title} onChange={(title) => set('grandOpening', { ...grandOpening, title })} />
        <Field
          label="Section description"
          value={grandOpening.subtitle}
          onChange={(subtitle) => set('grandOpening', { ...grandOpening, subtitle })}
          textarea
        />
        <ImageList
          images={grandOpening.images}
          onChange={(images) => set('grandOpening', { ...grandOpening, images })}
        />
      </Section>

      <Section
        id="testimonials"
        number="4"
        title="Testimonials"
        description="Homepage heading plus the quotes themselves. Add, edit, or delete testimonials here."
      >
        <Field label="Small heading" value={testimonials.eyebrow} onChange={(eyebrow) => set('testimonials', { ...testimonials, eyebrow })} />
        <Field label="Section title" value={testimonials.title} onChange={(title) => set('testimonials', { ...testimonials, title })} />
        <Field
          label="Section description"
          value={testimonials.subtitle}
          onChange={(subtitle) => set('testimonials', { ...testimonials, subtitle })}
          textarea
        />
        <TestimonialsManager />
      </Section>

      <Section
        id="cta"
        number="5"
        title="Call to action"
        description="The dark band near the bottom of the homepage with the consultation buttons."
      >
        <Field label="Headline" value={cta.title} onChange={(title) => set('cta', { ...cta, title })} />
        <Field label="Supporting paragraph" value={cta.subtitle} onChange={(subtitle) => set('cta', { ...cta, subtitle })} textarea />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Consultation button" value={cta.primaryCta} onChange={(primaryCta) => set('cta', { ...cta, primaryCta })} />
          <Field label="Phone button" value={cta.phoneCta} onChange={(phoneCta) => set('cta', { ...cta, phoneCta })} />
        </div>
      </Section>

      <Section
        id="blog"
        number="6"
        title="Blog intro"
        description="Heading above the latest posts on the homepage. Manage articles under Blog posts."
      >
        <Field label="Section title" value={blog.title} onChange={(title) => set('blog', { ...blog, title })} />
        <Field label="Section description" value={blog.subtitle} onChange={(subtitle) => set('blog', { ...blog, subtitle })} />
      </Section>
    </>
  );
}

export function AboutEditor({ content, onChange }) {
  const hero = content.hero || {};
  const story = content.story || {};
  const mission = content.mission || {};
  const values = content.values || {};
  const set = (key, value) => onChange({ ...content, [key]: value });

  return (
    <>
      <Section id="hero" number="1" title="Page banner" description="Top of the About page.">
        <Field label="Small heading" value={hero.eyebrow} onChange={(eyebrow) => set('hero', { ...hero, eyebrow })} />
        <Field label="Page title" value={hero.title} onChange={(title) => set('hero', { ...hero, title })} />
        <Field label="Introduction" value={hero.subtitle} onChange={(subtitle) => set('hero', { ...hero, subtitle })} textarea />
      </Section>

      <Section id="story" number="2" title="Our story" description="The story section with paragraphs and the four numbers.">
        <Field label="Small heading" value={story.eyebrow} onChange={(eyebrow) => set('story', { ...story, eyebrow })} />
        <Field label="Section title" value={story.title} onChange={(title) => set('story', { ...story, title })} />
        <StringList
          label="Story paragraphs"
          items={story.paragraphs}
          onChange={(paragraphs) => set('story', { ...story, paragraphs })}
          addLabel="Add paragraph"
        />
        <div className="grid sm:grid-cols-2 gap-4">
          {(story.stats || []).map((stat, index) => (
            <ItemCard key={index} title={`Number ${index + 1}`}>
              <Field
                label="Number"
                value={stat.value}
                onChange={(value) => set('story', { ...story, stats: updateList(story.stats, index, { value }) })}
              />
              <Field
                label="Label"
                value={stat.label}
                onChange={(label) => set('story', { ...story, stats: updateList(story.stats, index, { label }) })}
              />
            </ItemCard>
          ))}
        </div>
      </Section>

      <Section id="mission" number="3" title="Mission & vision" description="The two cards in the Mission & Vision section.">
        <Field label="Small heading" value={mission.eyebrow} onChange={(eyebrow) => set('mission', { ...mission, eyebrow })} />
        <Field label="Section title" value={mission.title} onChange={(title) => set('mission', { ...mission, title })} />
        <Field label="Mission card title" value={mission.missionTitle} onChange={(missionTitle) => set('mission', { ...mission, missionTitle })} />
        <Field label="Mission text" value={mission.mission} onChange={(text) => set('mission', { ...mission, mission: text })} textarea rows={5} />
        <Field label="Vision card title" value={mission.visionTitle} onChange={(visionTitle) => set('mission', { ...mission, visionTitle })} />
        <Field label="Vision text" value={mission.vision} onChange={(vision) => set('mission', { ...mission, vision })} textarea rows={5} />
      </Section>

      <Section id="values" number="4" title="Our values" description="The four value cards at the bottom of the About page.">
        <Field label="Small heading" value={values.eyebrow} onChange={(eyebrow) => set('values', { ...values, eyebrow })} />
        <Field label="Section title" value={values.title} onChange={(title) => set('values', { ...values, title })} />
        {(values.items || []).map((item, index) => (
          <ItemCard key={index} title={`Value ${index + 1}: ${item.title || 'Untitled'}`}>
            <Field
              label="Value name"
              value={item.title}
              onChange={(title) => set('values', { ...values, items: updateList(values.items, index, { title }) })}
            />
            <Field
              label="Description"
              value={item.description}
              onChange={(description) => set('values', { ...values, items: updateList(values.items, index, { description }) })}
              textarea
            />
          </ItemCard>
        ))}
      </Section>
    </>
  );
}
