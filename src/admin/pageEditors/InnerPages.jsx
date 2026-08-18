import { Field, ItemCard, Section, StringList, updateList } from '../form/Fields';

export function ServicesEditor({ content, onChange }) {
  const hero = content.hero || {};
  const items = content.items || [];
  const cta = content.cta || {};
  const set = (key, value) => onChange({ ...content, [key]: value });

  return (
    <>
      <Section id="hero" number="1" title="Page banner" description="Top of the Services page.">
        <Field label="Small heading" value={hero.eyebrow} onChange={(eyebrow) => set('hero', { ...hero, eyebrow })} />
        <Field label="Page title" value={hero.title} onChange={(title) => set('hero', { ...hero, title })} />
        <Field label="Introduction" value={hero.subtitle} onChange={(subtitle) => set('hero', { ...hero, subtitle })} textarea />
      </Section>

      {items.map((item, index) => (
        <Section
          key={index}
          id={`service-${index + 1}`}
          number={String(index + 2)}
          title={`Service: ${item.title || `Item ${index + 1}`}`}
          description="This service block appears on the Services page with its list of benefits."
        >
          <Field
            label="Service name"
            value={item.title}
            onChange={(title) => set('items', updateList(items, index, { title }))}
          />
          <Field
            label="Full description"
            value={item.description}
            onChange={(description) => set('items', updateList(items, index, { description }))}
            textarea
            rows={5}
          />
          <StringList
            label="Key benefits"
            items={item.benefits}
            onChange={(benefits) => set('items', updateList(items, index, { benefits }))}
            addLabel="Add benefit"
          />
        </Section>
      ))}

      <Section
        id="cta"
        number={String(items.length + 2)}
        title="Bottom call to action"
        description="The dark section at the end of the Services page."
      >
        <Field label="Headline" value={cta.title} onChange={(title) => set('cta', { ...cta, title })} />
        <Field label="Supporting paragraph" value={cta.subtitle} onChange={(subtitle) => set('cta', { ...cta, subtitle })} textarea />
        <Field label="Button text" value={cta.button} onChange={(button) => set('cta', { ...cta, button })} />
      </Section>
    </>
  );
}

export function StudentsEditor({ content, onChange }) {
  const hero = content.hero || {};
  const process = content.process || {};
  const programs = content.programs || {};
  const cta = content.cta || {};
  const steps = process.steps || [];
  const set = (key, value) => onChange({ ...content, [key]: value });
  const setProcess = (patch) => set('process', { ...process, ...patch });

  return (
    <>
      <Section id="hero" number="1" title="Page banner" description="Top of the Students page.">
        <Field label="Small heading" value={hero.eyebrow} onChange={(eyebrow) => set('hero', { ...hero, eyebrow })} />
        <Field label="Page title" value={hero.title} onChange={(title) => set('hero', { ...hero, title })} />
        <Field label="Introduction" value={hero.subtitle} onChange={(subtitle) => set('hero', { ...hero, subtitle })} textarea />
      </Section>

      <Section id="process" number="2" title="Process introduction" description="Heading above the step-by-step research journey.">
        <Field label="Small heading" value={process.eyebrow} onChange={(eyebrow) => setProcess({ eyebrow })} />
        <Field label="Section title" value={process.title} onChange={(title) => setProcess({ title })} />
        <Field label="Section description" value={process.subtitle} onChange={(subtitle) => setProcess({ subtitle })} textarea />
      </Section>

      {steps.map((step, index) => (
        <Section
          key={index}
          id={`step-${index + 1}`}
          number={String(index + 3)}
          title={`Step ${step.number || index + 1}: ${step.title || 'Untitled'}`}
          description="One stage in the student research journey."
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="Step number"
              value={step.number}
              onChange={(number) => setProcess({ steps: updateList(steps, index, { number }) })}
            />
            <Field
              label="Step title"
              value={step.title}
              onChange={(title) => setProcess({ steps: updateList(steps, index, { title }) })}
            />
          </div>
          <Field
            label="Description"
            value={step.description}
            onChange={(description) => setProcess({ steps: updateList(steps, index, { description }) })}
            textarea
          />
          <StringList
            label="What this step includes"
            items={step.details}
            onChange={(details) => setProcess({ steps: updateList(steps, index, { details }) })}
            addLabel="Add detail"
          />
        </Section>
      ))}

      <Section
        id="programs"
        number={String(steps.length + 3)}
        title="Support programs"
        description="The four program cards near the bottom of the Students page."
      >
        <Field label="Small heading" value={programs.eyebrow} onChange={(eyebrow) => set('programs', { ...programs, eyebrow })} />
        <Field label="Section title" value={programs.title} onChange={(title) => set('programs', { ...programs, title })} />
        {(programs.items || []).map((item, index) => (
          <ItemCard key={index} title={`Program ${index + 1}: ${item.title || 'Untitled'}`}>
            <Field
              label="Program name"
              value={item.title}
              onChange={(title) =>
                set('programs', { ...programs, items: updateList(programs.items, index, { title }) })
              }
            />
            <Field
              label="Description"
              value={item.description}
              onChange={(description) =>
                set('programs', { ...programs, items: updateList(programs.items, index, { description }) })
              }
              textarea
            />
          </ItemCard>
        ))}
      </Section>

      <Section
        id="cta"
        number={String(steps.length + 4)}
        title="Bottom call to action"
        description="The dark section at the end of the Students page."
      >
        <Field label="Headline" value={cta.title} onChange={(title) => set('cta', { ...cta, title })} />
        <Field label="Supporting paragraph" value={cta.subtitle} onChange={(subtitle) => set('cta', { ...cta, subtitle })} textarea />
        <Field label="Button text" value={cta.button} onChange={(button) => set('cta', { ...cta, button })} />
      </Section>
    </>
  );
}

export function GovernmentEditor({ content, onChange }) {
  const hero = content.hero || {};
  const services = content.services || {};
  const trust = content.trust || {};
  const cta = content.cta || {};
  const items = services.items || [];
  const set = (key, value) => onChange({ ...content, [key]: value });
  const setServices = (patch) => set('services', { ...services, ...patch });

  return (
    <>
      <Section id="hero" number="1" title="Page banner" description="Top of the Government page.">
        <Field label="Small heading" value={hero.eyebrow} onChange={(eyebrow) => set('hero', { ...hero, eyebrow })} />
        <Field label="Page title" value={hero.title} onChange={(title) => set('hero', { ...hero, title })} />
        <Field label="Introduction" value={hero.subtitle} onChange={(subtitle) => set('hero', { ...hero, subtitle })} textarea />
      </Section>

      <Section id="services-intro" number="2" title="Services introduction" description="Heading above the institutional services.">
        <Field label="Small heading" value={services.eyebrow} onChange={(eyebrow) => setServices({ eyebrow })} />
        <Field label="Section title" value={services.title} onChange={(title) => setServices({ title })} />
        <Field label="Section description" value={services.subtitle} onChange={(subtitle) => setServices({ subtitle })} textarea />
      </Section>

      {items.map((item, index) => (
        <Section
          key={index}
          id={`gov-service-${index + 1}`}
          number={String(index + 3)}
          title={`Service: ${item.title || `Item ${index + 1}`}`}
          description="One institutional service block with its benefits list."
        >
          <Field
            label="Service name"
            value={item.title}
            onChange={(title) => setServices({ items: updateList(items, index, { title }) })}
          />
          <Field
            label="Full description"
            value={item.description}
            onChange={(description) => setServices({ items: updateList(items, index, { description }) })}
            textarea
            rows={5}
          />
          <StringList
            label="Key benefits"
            items={item.benefits}
            onChange={(benefits) => setServices({ items: updateList(items, index, { benefits }) })}
            addLabel="Add benefit"
          />
        </Section>
      ))}

      <Section
        id="trust"
        number={String(items.length + 3)}
        title="Why trust CTR"
        description="The three trust cards on the Government page."
      >
        <Field label="Small heading" value={trust.eyebrow} onChange={(eyebrow) => set('trust', { ...trust, eyebrow })} />
        <Field label="Section title" value={trust.title} onChange={(title) => set('trust', { ...trust, title })} />
        {(trust.items || []).map((item, index) => (
          <ItemCard key={index} title={`Trust point ${index + 1}: ${item.title || 'Untitled'}`}>
            <Field
              label="Title"
              value={item.title}
              onChange={(title) => set('trust', { ...trust, items: updateList(trust.items, index, { title }) })}
            />
            <Field
              label="Description"
              value={item.description}
              onChange={(description) =>
                set('trust', { ...trust, items: updateList(trust.items, index, { description }) })
              }
              textarea
            />
          </ItemCard>
        ))}
      </Section>

      <Section
        id="cta"
        number={String(items.length + 4)}
        title="Bottom call to action"
        description="The dark section at the end of the Government page."
      >
        <Field label="Headline" value={cta.title} onChange={(title) => set('cta', { ...cta, title })} />
        <Field label="Supporting paragraph" value={cta.subtitle} onChange={(subtitle) => set('cta', { ...cta, subtitle })} textarea />
        <Field label="Button text" value={cta.button} onChange={(button) => set('cta', { ...cta, button })} />
      </Section>
    </>
  );
}
