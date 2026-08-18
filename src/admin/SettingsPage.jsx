import { useEffect, useState } from 'react';
import { apiGet, apiSend } from '../lib/api';
import { FONT_OPTIONS } from '../lib/theme';

const empty = {
  siteName: '',
  tagline: '',
  footerText: '',
  email: '',
  phone: '',
  address: '',
  hours: '',
  primaryColor: '#1a2846',
  accentColor: '#e5a830',
  headingFont: 'Georgia',
  bodyFont: 'Inter',
};

export default function SettingsPage() {
  const [form, setForm] = useState(empty);
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    apiGet('/settings').then((data) => setForm({ ...empty, ...data }));
  }, []);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const saved = await apiSend('/settings', 'PUT', form);
      setForm({ ...empty, ...saved });
      setMessage('Settings saved. Refresh the public site to see theme changes.');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await apiSend('/settings/password', 'PUT', passwords);
      setPasswords({ currentPassword: '', newPassword: '' });
      setMessage('Password updated.');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-navy-800 mb-2">Settings</h1>
        <p className="text-navy-600">Site identity, contact details, colors, and fonts.</p>
      </div>
      {message && <div className="text-sm text-navy-700 bg-navy-50 rounded-lg px-4 py-3">{message}</div>}

      <form onSubmit={save} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <h2 className="font-serif text-xl font-bold text-navy-800">Site & contact</h2>
        <Field label="Site name" value={form.siteName} onChange={(v) => update('siteName', v)} />
        <Field label="Tagline" value={form.tagline} onChange={(v) => update('tagline', v)} />
        <Field label="Footer text" value={form.footerText} onChange={(v) => update('footerText', v)} textarea />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Email" value={form.email} onChange={(v) => update('email', v)} />
          <Field label="Phone" value={form.phone} onChange={(v) => update('phone', v)} />
          <Field label="Address" value={form.address} onChange={(v) => update('address', v)} />
          <Field label="Hours" value={form.hours} onChange={(v) => update('hours', v)} />
        </div>

        <h2 className="font-serif text-xl font-bold text-navy-800 pt-4">Appearance</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="block text-sm font-medium text-navy-800 mb-1">Primary color</span>
            <div className="flex items-center gap-3">
              <input type="color" value={form.primaryColor} onChange={(e) => update('primaryColor', e.target.value)} />
              <input
                value={form.primaryColor}
                onChange={(e) => update('primaryColor', e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-navy-800 mb-1">Accent color</span>
            <div className="flex items-center gap-3">
              <input type="color" value={form.accentColor} onChange={(e) => update('accentColor', e.target.value)} />
              <input
                value={form.accentColor}
                onChange={(e) => update('accentColor', e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-navy-800 mb-1">Heading font</span>
            <select
              value={form.headingFont}
              onChange={(e) => update('headingFont', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white"
            >
              {FONT_OPTIONS.map((font) => (
                <option key={font.id} value={font.id}>
                  {font.id}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-navy-800 mb-1">Body font</span>
            <select
              value={form.bodyFont}
              onChange={(e) => update('bodyFont', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white"
            >
              {FONT_OPTIONS.map((font) => (
                <option key={font.id} value={font.id}>
                  {font.id}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 rounded-lg bg-navy-800 text-white font-semibold hover:bg-navy-700"
        >
          {saving ? 'Saving...' : 'Save settings'}
        </button>
      </form>

      <form onSubmit={changePassword} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <h2 className="font-serif text-xl font-bold text-navy-800">Change password</h2>
        <Field
          label="Current password"
          type="password"
          value={passwords.currentPassword}
          onChange={(v) => setPasswords((p) => ({ ...p, currentPassword: v }))}
        />
        <Field
          label="New password"
          type="password"
          value={passwords.newPassword}
          onChange={(v) => setPasswords((p) => ({ ...p, newPassword: v }))}
        />
        <button type="submit" className="px-5 py-2.5 rounded-lg bg-navy-800 text-white font-semibold hover:bg-navy-700">
          Update password
        </button>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, textarea, type = 'text' }) {
  const classes = 'w-full px-3 py-2 rounded-lg border border-slate-200';
  return (
    <label className="block">
      <span className="block text-sm font-medium text-navy-800 mb-1">{label}</span>
      {textarea ? (
        <textarea className={classes} rows={4} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className={classes} type={type} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}
