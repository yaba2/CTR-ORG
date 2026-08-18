import { useEffect, useState } from 'react';
import { apiGet, apiSend } from '../lib/api';
import { useCms } from '../context/CmsContext';
import { Field } from './form/Fields';

const empty = { name: '', role: '', text: '', rating: 5 };

export default function TestimonialsManager() {
  const { refresh } = useCms();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const next = await apiGet('/testimonials');
    setItems(next);
    await refresh();
  };

  useEffect(() => {
    apiGet('/testimonials').then(setItems).catch(() => {});
  }, []);

  const save = async () => {
    if (!form.name.trim() || !form.text.trim()) {
      setMessage('Name and quote are required.');
      return;
    }
    setSaving(true);
    setMessage('');
    try {
      if (editingId) {
        await apiSend(`/testimonials/${editingId}`, 'PUT', form);
      } else {
        await apiSend('/testimonials', 'POST', form);
      }
      setForm(empty);
      setEditingId(null);
      await load();
      setMessage(editingId ? 'Testimonial updated.' : 'Testimonial added.');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    await apiSend(`/testimonials/${id}`, 'DELETE');
    await load();
  };

  return (
    <div className="space-y-5">
      {message && <div className="text-sm text-navy-800 bg-navy-50 rounded-lg px-4 py-3">{message}</div>}

      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <h3 className="font-semibold text-navy-800">{editingId ? 'Edit testimonial' : 'Add a new testimonial'}</h3>
        <Field label="Name" value={form.name} onChange={(name) => setForm({ ...form, name })} />
        <Field label="Role / title" value={form.role} onChange={(role) => setForm({ ...form, role })} />
        <Field label="Quote" value={form.text} onChange={(text) => setForm({ ...form, text })} textarea rows={4} />
        <Field
          label="Star rating (1-5)"
          value={String(form.rating)}
          onChange={(rating) => setForm({ ...form, rating: Number(rating) || 5 })}
        />
        <div className="flex gap-3">
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="px-5 py-2.5 rounded-lg bg-navy-800 text-white font-semibold hover:bg-navy-700"
          >
            {saving ? 'Saving...' : editingId ? 'Update testimonial' : 'Add testimonial'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(empty);
              }}
              className="px-5 py-2.5 rounded-lg border border-slate-200"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div className="font-semibold text-navy-800">{item.name}</div>
            <div className="text-sm text-navy-500 mb-2">{item.role}</div>
            <p className="text-navy-700 text-sm mb-3">"{item.text}"</p>
            <div className="text-xs text-navy-500 mb-3">{item.rating || 5} / 5 stars</div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setEditingId(item.id);
                  setForm({
                    name: item.name,
                    role: item.role,
                    text: item.text,
                    rating: item.rating || 5,
                  });
                }}
                className="text-sm font-medium text-navy-800 hover:underline"
              >
                Edit
              </button>
              <button type="button" onClick={() => remove(item.id)} className="text-sm text-red-600 hover:underline">
                Delete
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-navy-500">No testimonials yet. Add the first one above.</p>}
      </div>
    </div>
  );
}
