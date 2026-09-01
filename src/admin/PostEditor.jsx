import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiGet, apiSend, apiUpload } from '../lib/api';
import { useCms } from '../context/CmsContext';

const emptyPost = {
  title: '',
  slug: '',
  summary: '',
  featuredImage: '',
  published: true,
  publishedAt: new Date().toISOString().slice(0, 10),
  content: '',
};

function toForm(post) {
  return {
    title: post.title || '',
    slug: post.slug || '',
    summary: post.summary || '',
    featuredImage: post.featuredImage || '',
    published: post.published !== false,
    publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString().slice(0, 10) : emptyPost.publishedAt,
    content: Array.isArray(post.content) ? post.content.join('\n\n') : post.content || '',
  };
}

function imageMarkdown(url, alt = 'image') {
  return `![${alt}](${url})`;
}

function contentImages(content) {
  const matches = [...String(content || '').matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)];
  return matches.map((match) => ({ alt: match[1], src: match[2] }));
}

function PreviewImage({ src, alt, className }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    return (
      <div className={`${className} bg-slate-100 flex items-center justify-center text-sm text-ink-500`}>
        {src ? 'Image could not be loaded' : 'No image yet'}
      </div>
    );
  }
  return <img src={src} alt={alt || ''} className={className} onError={() => setFailed(true)} />;
}

export default function PostEditor() {
  const { id } = useParams();
  const isNew = !id || id === 'new';
  const navigate = useNavigate();
  const { refresh } = useCms();
  const [form, setForm] = useState(emptyPost);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploadingFeatured, setUploadingFeatured] = useState(false);
  const [uploadingBody, setUploadingBody] = useState(false);
  const [featuredPreview, setFeaturedPreview] = useState('');
  const [bodyPreviews, setBodyPreviews] = useState({});
  const contentRef = useRef(null);
  const featuredPreviewRef = useRef('');
  const bodyPreviewsRef = useRef({});

  useEffect(() => {
    featuredPreviewRef.current = featuredPreview;
  }, [featuredPreview]);

  useEffect(() => {
    bodyPreviewsRef.current = bodyPreviews;
  }, [bodyPreviews]);

  useEffect(() => {
    return () => {
      const featured = featuredPreviewRef.current;
      if (featured.startsWith('blob:')) URL.revokeObjectURL(featured);
      Object.values(bodyPreviewsRef.current).forEach((url) => {
        if (String(url).startsWith('blob:')) URL.revokeObjectURL(url);
      });
    };
  }, []);

  useEffect(() => {
    if (!isNew) {
      apiGet(`/posts/${id}`).then((post) => setForm(toForm(post)));
    }
  }, [id, isNew]);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const uploadFeatured = async (file) => {
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setFeaturedPreview((current) => {
      if (current.startsWith('blob:')) URL.revokeObjectURL(current);
      return localUrl;
    });
    setUploadingFeatured(true);
    setMessage('');
    try {
      const result = await apiUpload(file);
      update('featuredImage', result.url);
    } catch (err) {
      URL.revokeObjectURL(localUrl);
      setFeaturedPreview('');
      setMessage(err.message);
    } finally {
      setUploadingFeatured(false);
    }
  };

  const insertBodyImage = async (file) => {
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setBodyPreviews((current) => ({ ...current, __pending: localUrl }));
    setUploadingBody(true);
    setMessage('');
    try {
      const result = await apiUpload(file);
      const alt = file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
      const snippet = imageMarkdown(result.url, alt);
      setBodyPreviews((current) => {
        const next = { ...current, [result.url]: localUrl };
        delete next.__pending;
        return next;
      });
      const textarea = contentRef.current;
      const current = form.content || '';
      if (!textarea) {
        update('content', current ? `${current}\n\n${snippet}` : snippet);
        return;
      }
      const start = textarea.selectionStart ?? current.length;
      const end = textarea.selectionEnd ?? current.length;
      const before = current.slice(0, start);
      const after = current.slice(end);
      const prefix = before && !before.endsWith('\n\n') ? (before.endsWith('\n') ? '\n' : '\n\n') : '';
      const suffix = after && !after.startsWith('\n') ? '\n\n' : after.startsWith('\n\n') ? '' : '\n';
      const next = `${before}${prefix}${snippet}${suffix}${after}`;
      update('content', next);
      requestAnimationFrame(() => {
        const cursor = (before + prefix + snippet + suffix).length;
        textarea.focus();
        textarea.setSelectionRange(cursor, cursor);
      });
    } catch (err) {
      URL.revokeObjectURL(localUrl);
      setBodyPreviews((current) => {
        const next = { ...current };
        delete next.__pending;
        return next;
      });
      setMessage(err.message);
    } finally {
      setUploadingBody(false);
    }
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const payload = {
        ...form,
        publishedAt: form.publishedAt,
      };
      if (isNew) {
        const created = await apiSend('/posts', 'POST', payload);
        navigate(`/admin/posts/${created.id}`);
      } else {
        await apiSend(`/posts/${id}`, 'PUT', payload);
      }
      await refresh();
      setMessage('Post saved. The public site will update when you open or return to it.');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={save} className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <Link to="/admin/posts" className="text-sm text-ink-500 hover:text-ink-800">
            ← All posts
          </Link>
          <h1 className="font-serif text-3xl font-bold text-ink-800 mt-1">
            {isNew ? 'New post' : 'Edit post'}
          </h1>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 rounded-lg bg-navy-800 text-white font-semibold hover:bg-navy-700"
        >
          {saving ? 'Saving...' : 'Save post'}
        </button>
      </div>
      {message && <div className="text-sm text-ink-700 bg-navy-50 rounded-lg px-4 py-3">{message}</div>}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <Field label="Title" value={form.title} onChange={(v) => update('title', v)} required />
        <Field label="Slug" value={form.slug} onChange={(v) => update('slug', v)} placeholder="generated-from-title" />
        <Field label="Summary" value={form.summary} onChange={(v) => update('summary', v)} textarea />

        <div>
          <div className="text-sm font-medium text-ink-800 mb-1">Featured image</div>
          <p className="text-xs text-ink-500 mb-3">Upload from this device or paste an image URL. This photo appears on the blog list and at the top of the post. You can see it here before you save.</p>
          <div className="w-full max-w-xl min-h-40 rounded-xl bg-slate-100 mb-3 flex items-center justify-center overflow-hidden border border-slate-200">
            <PreviewImage
              src={featuredPreview || form.featuredImage}
              alt="Featured preview"
              className="max-w-full max-h-64 w-auto h-auto object-contain p-2"
            />
          </div>
          <Field label="Image URL" value={form.featuredImage} onChange={(v) => update('featuredImage', v)} />
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center px-4 py-2.5 rounded-lg bg-navy-800 text-white text-sm font-semibold cursor-pointer hover:bg-navy-700">
              {uploadingFeatured ? 'Uploading...' : 'Upload from device'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploadingFeatured}
                onChange={(e) => {
                  uploadFeatured(e.target.files?.[0]);
                  e.target.value = '';
                }}
              />
            </label>
            {(form.featuredImage || featuredPreview) && (
              <button
                type="button"
                onClick={() => {
                  update('featuredImage', '');
                  setFeaturedPreview((current) => {
                    if (current.startsWith('blob:')) URL.revokeObjectURL(current);
                    return '';
                  });
                }}
                className="text-sm text-red-600 hover:underline"
              >
                Remove image
              </button>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Publish date" type="date" value={form.publishedAt} onChange={(v) => update('publishedAt', v)} />
          <label className="flex items-center gap-2 pt-8 text-sm text-ink-800">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => update('published', e.target.checked)}
            />
            Published
          </label>
        </div>

        <div>
          <span className="block text-sm font-medium text-ink-800 mb-1">Content</span>
          <p className="text-xs text-ink-500 mb-3">
            Write paragraphs separated by a blank line. Place the cursor where you want a photo, then insert an image from this device.
          </p>
          <div className="mb-3">
            <label className="inline-flex items-center px-4 py-2.5 rounded-lg bg-navy-800 text-white text-sm font-semibold cursor-pointer hover:bg-navy-700">
              {uploadingBody ? 'Uploading...' : 'Insert image in content'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploadingBody}
                onChange={(e) => {
                  insertBodyImage(e.target.files?.[0]);
                  e.target.value = '';
                }}
              />
            </label>
          </div>
          {(bodyPreviews.__pending || contentImages(form.content).length > 0) && (
            <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-ink-800 mb-3">Image preview (before save)</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {bodyPreviews.__pending && (
                  <PreviewImage
                    src={bodyPreviews.__pending}
                    alt="Uploading"
                    className="w-full h-32 object-contain rounded-lg bg-white border border-slate-200 p-1"
                  />
                )}
                {contentImages(form.content).map((image, index) => (
                  <PreviewImage
                    key={`${image.src}-${index}`}
                    src={bodyPreviews[image.src] || image.src}
                    alt={image.alt}
                    className="w-full h-32 object-contain rounded-lg bg-white border border-slate-200 p-1"
                  />
                ))}
              </div>
            </div>
          )}
          <textarea
            ref={contentRef}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 resize-y min-h-[280px]"
            rows={14}
            value={form.content}
            onChange={(e) => update('content', e.target.value)}
          />
        </div>
      </div>
    </form>
  );
}

function Field({ label, value, onChange, textarea, rows = 4, type = 'text', placeholder, required }) {
  const classes = 'w-full px-3 py-2 rounded-lg border border-slate-200';
  return (
    <label className="block">
      <span className="block text-sm font-medium text-ink-800 mb-1">{label}</span>
      {textarea ? (
        <textarea className={classes} rows={rows} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} required={required} />
      ) : (
        <input className={classes} type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} required={required} />
      )}
    </label>
  );
}
