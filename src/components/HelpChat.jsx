import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Send, X } from 'lucide-react';
import { useCms } from '../context/CmsContext';

function answerQuestion(raw, { settings, getPage }) {
  const q = String(raw || '').toLowerCase().trim();
  const services = getPage('home')?.services?.items || [];
  const serviceList = services.map((item) => `• ${item.title}: ${item.description}`).join('\n');
  const email = settings.email || 'info@ctr.org';
  const phone = settings.phone || '+252 95865637';
  const address = settings.address || 'Galkayo - Puntland, Somalia';
  const hours = settings.hours || 'Mon - Fri: 9:00 AM - 6:00 PM';

  const reply = (text, links = []) => ({ text, links });

  if (!q || /^(hi|hello|hey|salam|salaam|good (morning|afternoon|evening))\b/.test(q)) {
    return reply(
      `Hello. I am the CTR helper. I can answer basic questions about Center for Training & Research, our services, students, government work, and how to contact us.`,
      [
        { label: 'Our services', to: '/services' },
        { label: 'Contact us', to: '/contact' },
      ]
    );
  }

  if (/(hour|open|time|when.*open|working)/.test(q)) {
    return reply(`Our hours are ${hours}. You can also send a message any time on the Contact page.`, [
      { label: 'Contact page', to: '/contact' },
    ]);
  }

  if (/(where|location|address|office|galkay|galkio|puntland|somalia)/.test(q)) {
    return reply(`CTR is based in ${address}.`, [{ label: 'Contact & location', to: '/contact' }]);
  }

  if (/(phone|call|whatsapp|number|email|mail|contact)/.test(q)) {
    return reply(`You can reach CTR at ${phone} or ${email}. For a consultation, use the Contact page.`, [
      { label: 'Book a consultation', to: '/contact' },
    ]);
  }

  if (/(phd|master|masters|thesis|dissertation|student|academic|coursework|publication)/.test(q)) {
    return reply(
      `We support Master's and PhD students from topic selection to thesis defense. Help includes proposals, methodology, data analysis, writing, and publication support.`,
      [{ label: 'Student support', to: '/students' }]
    );
  }

  if (/(government|policy|institution|organization|ministry|strategic)/.test(q)) {
    return reply(
      `For governments and organizations we offer policy research, strategic planning, and data-driven solutions with confidential, measurable work.`,
      [{ label: 'Government services', to: '/government' }]
    );
  }

  if (/(research|r&d|development)/.test(q)) {
    return reply(
      `Research & Development: evidence-based studies, data collection and analysis, and policy insights for governments and organizations.`,
      [{ label: 'Services', to: '/services' }]
    );
  }

  if (/(consult)/.test(q)) {
    return reply(
      `Consultation covers strategic planning, policy development, program evaluation, and organizational transformation. Book a free consultation on the Contact page.`,
      [{ label: 'Book a consultation', to: '/contact' }]
    );
  }

  if (/(therap|counsel|mental|wellness|stress)/.test(q)) {
    return reply(
      `Therapy & Support includes professional counseling, stress and burnout support, and team wellness. Sessions are confidential.`,
      [{ label: 'Services', to: '/services' }]
    );
  }

  if (/(service|offer|do you|what can|help with|provide)/.test(q)) {
    return reply(
      `CTR offers:\n${serviceList || 'Research, academic support, consultation, and therapy.'}\n\nTell me if you are a student, an institution, or looking for consultation.`,
      [
        { label: 'All services', to: '/services' },
        { label: 'For students', to: '/students' },
      ]
    );
  }

  if (/(about|who are|what is ctr|rdc)/.test(q)) {
    return reply(
      `CTR (Center for Training & Research) supports students, professionals, and institutions with research, academic mentoring, consultation, and therapy. We are based in ${address}.`,
      [{ label: 'About CTR', to: '/about' }]
    );
  }

  if (/(blog|news|article)/.test(q)) {
    return reply(`You can read CTR news and articles on the Blog page.`, [{ label: 'Blog', to: '/blog' }]);
  }

  if (/(testimonial|review|success)/.test(q)) {
    return reply(`See what students and institutions say about CTR on the Testimonials page.`, [
      { label: 'Testimonials', to: '/testimonials' },
    ]);
  }

  if (/(price|cost|fee|pay|charge)/.test(q)) {
    return reply(
      `Fees depend on the project. Share your needs on the Contact page or call ${phone} for a consultation.`,
      [{ label: 'Contact us', to: '/contact' }]
    );
  }

  if (/(book|appoint|meet|consult)/.test(q)) {
    return reply(`You can book a consultation on the Contact page. We usually respond within 24 business hours.`, [
      { label: 'Contact form', to: '/contact' },
    ]);
  }

  return reply(
    `I can help with CTR services, student support, government work, location, hours, and contact details. For a specific request, please use the Contact page or call ${phone}.`,
    [
      { label: 'Services', to: '/services' },
      { label: 'Contact', to: '/contact' },
    ]
  );
}

const suggestions = ['What services do you offer?', 'Help for Master\'s or PhD', 'How can I contact CTR?'];

export default function HelpChat() {
  const cms = useCms();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'Hello. I am the CTR helper. Ask me about our services, student support, or how to get in touch.',
      links: [],
    },
  ]);
  const listRef = useRef(null);

  useEffect(() => {
    listRef.current?.scrollTo(0, listRef.current.scrollHeight);
  }, [messages, open]);

  const send = (text) => {
    const question = String(text || '').trim();
    if (!question) return;
    const reply = answerQuestion(question, cms);
    setMessages((current) => [...current, { role: 'user', text: question, links: [] }, { role: 'bot', ...reply }]);
    setInput('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      {open && (
        <div className="w-[min(100vw-2rem,380px)] h-[min(70vh,520px)] bg-white rounded-2xl shadow-2xl border border-navy-100 flex flex-col overflow-hidden">
          <div className="bg-navy-800 text-white px-4 py-3 flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm">CTR Help</p>
              <p className="text-xs text-navy-200">Questions about our website and services</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-white/10" aria-label="Close chat">
              <X size={18} />
            </button>
          </div>

          <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-navy-50/40">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm whitespace-pre-wrap ${
                    message.role === 'user' ? 'bg-navy-800 text-white' : 'bg-white text-ink-800 border border-navy-100'
                  }`}
                >
                  {message.text}
                  {message.links?.length > 0 && (
                    <div className="mt-2 flex flex-col gap-1">
                      {message.links.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          onClick={() => setOpen(false)}
                          className="text-navy-800 font-medium underline"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="px-3 pt-2 flex flex-wrap gap-2">
            {suggestions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => send(item)}
                className="text-xs px-2.5 py-1 rounded-full bg-navy-50 text-ink-800 hover:bg-navy-100"
              >
                {item}
              </button>
            ))}
          </div>

          <form
            className="p-3 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about CTR..."
              className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-navy-500"
            />
            <button type="submit" className="px-3 rounded-lg bg-navy-800 text-white hover:bg-navy-700" aria-label="Send">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="w-14 h-14 rounded-full bg-navy-800 text-white shadow-xl flex items-center justify-center hover:bg-navy-700"
        aria-label={open ? 'Close help chat' : 'Open help chat'}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
