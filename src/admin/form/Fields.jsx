import { useState } from 'react';
import { apiUpload } from '../../lib/api';

export function Section({ id, number, title, description, children }) {
  return (
    <section id={id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden scroll-mt-28">
      <header className="px-6 py-5 border-b border-slate-200 bg-gradient-to-r from-navy-50 to-white">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-500 mb-1">
          Section {number}
        </p>
        <h2 className="font-serif text-2xl font-bold text-ink-800">{title}</h2>
        {description && <p className="text-sm text-ink-600 mt-1 max-w-2xl">{description}</p>}
      </header>
      <div className="p-6 space-y-5">{children}</div>
    </section>
  );
}

export function Field({ label, hint, value, onChange, textarea = false, rows = 4, placeholder }) {
  const classes =
    'w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-ink-800 outline-none focus:border-navy-500 focus:ring-2 focus:ring-navy-500/15';
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-ink-800 mb-1.5">{label}</span>
      {hint && <span className="block text-xs text-ink-500 mb-1.5">{hint}</span>}
      {textarea ? (
        <textarea
          className={`${classes} resize-y min-h-[96px]`}
          rows={rows}
          value={value ?? ''}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className={classes}
          value={value ?? ''}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

export function ImageField({ label, hint, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const upload = async (file) => {
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const result = await apiUpload(file);
      onChange(result.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="text-sm font-semibold text-ink-800 mb-1.5">{label}</div>
      {hint && <p className="text-xs text-ink-500 mb-3">{hint}</p>}
      {error && <div className="text-sm text-red-600 mb-3">{error}</div>}
      {value ? (
        <div className="mb-3 w-full max-w-xl h-40 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
          <img src={value} alt="" className="max-w-full max-h-full object-contain" />
        </div>
      ) : (
        <div className="mb-3 w-full max-w-xl h-28 rounded-xl bg-slate-100 flex items-center justify-center text-sm text-ink-500">
          No image yet
        </div>
      )}
      <Field label="Image URL" value={value || ''} onChange={onChange} placeholder="https:// or /uploads/..." />
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <label className="inline-flex items-center px-4 py-2.5 rounded-lg bg-navy-800 text-white text-sm font-semibold cursor-pointer hover:bg-navy-700">
          {uploading ? 'Uploading...' : 'Upload from device'}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              upload(e.target.files?.[0]);
              e.target.value = '';
            }}
          />
        </label>
        {value && (
          <button type="button" onClick={() => onChange('')} className="text-sm text-red-600 hover:underline">
            Remove image
          </button>
        )}
      </div>
    </div>
  );
}

export function ItemCard({ title, onRemove, children }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="font-semibold text-ink-800">{title}</h3>
        {onRemove && (
          <button type="button" onClick={onRemove} className="text-sm text-red-600 hover:underline">
            Remove
          </button>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export function StringList({ label, items = [], onChange, placeholder, addLabel = 'Add item' }) {
  const list = Array.isArray(items) ? items : [];
  return (
    <div>
      <div className="text-sm font-semibold text-ink-800 mb-2">{label}</div>
      <div className="space-y-2">
        {list.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              value={item}
              onChange={(e) => onChange(list.map((current, i) => (i === index ? e.target.value : current)))}
              placeholder={placeholder}
              className="flex-1 px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white outline-none focus:border-navy-500"
            />
            <button
              type="button"
              onClick={() => onChange(list.filter((_, i) => i !== index))}
              className="px-3 text-sm text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...list, ''])}
        className="mt-3 text-sm font-medium text-ink-800 hover:underline"
      >
        + {addLabel}
      </button>
    </div>
  );
}

export function updateList(list, index, patch) {
  return list.map((item, i) => (i === index ? { ...item, ...patch } : item));
}

export function ImageList({ images = [], onChange }) {
  const list = Array.isArray(images) ? images : [];
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const uploadFiles = async (fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;
    setUploading(true);
    setError('');
    try {
      const uploaded = [];
      for (const file of files) {
        const result = await apiUpload(file);
        uploaded.push({
          src: result.url,
          alt: file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
        });
      }
      onChange([...list, ...uploaded]);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="text-sm font-semibold text-ink-800 mb-2">Slideshow images</div>
      <p className="text-xs text-ink-500 mb-3">Upload photos or paste an image URL. Existing photos appear below so you can edit or remove them.</p>
      {error && <div className="text-sm text-red-600 mb-3">{error}</div>}
      <div className="space-y-4">
        {list.map((image, index) => (
          <div key={`${image.src}-${index}`} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {image.src ? (
                <img src={image.src} alt={image.alt || ''} className="w-full sm:w-40 h-28 object-cover rounded-lg bg-white" />
              ) : (
                <div className="w-full sm:w-40 h-28 rounded-lg bg-slate-200 flex items-center justify-center text-xs text-ink-500">
                  No image
                </div>
              )}
              <div className="flex-1 space-y-3">
                <Field
                  label="Image URL"
                  value={image.src}
                  onChange={(src) => onChange(updateList(list, index, { src }))}
                />
                <Field
                  label="Alt text"
                  value={image.alt}
                  onChange={(alt) => onChange(updateList(list, index, { alt }))}
                />
                <button
                  type="button"
                  onClick={() => onChange(list.filter((_, i) => i !== index))}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove image
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <label className="inline-flex items-center px-4 py-2.5 rounded-lg bg-navy-800 text-white text-sm font-semibold cursor-pointer hover:bg-navy-700">
          {uploading ? 'Uploading...' : 'Upload images'}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              uploadFiles(e.target.files);
              e.target.value = '';
            }}
          />
        </label>
        <button
          type="button"
          onClick={() => onChange([...list, { src: '', alt: '' }])}
          className="text-sm font-medium text-ink-800 hover:underline"
        >
          + Add image URL
        </button>
      </div>
    </div>
  );
}
