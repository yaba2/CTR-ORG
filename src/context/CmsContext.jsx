import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { onCmsUpdate, publicGet } from '../lib/api';
import { applyTheme } from '../lib/theme';
import { defaultPages, defaultPosts, defaultSettings, defaultTestimonials, deepMerge } from '../data/cmsDefaults';

const CmsContext = createContext(null);

function formatPost(post) {
  const publishedAt = post.publishedAt;
  return {
    ...post,
    content: Array.isArray(post.content) ? post.content : [],
    publishedDate: publishedAt
      ? new Date(publishedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : '',
  };
}

export function CmsProvider({ children }) {
  const { pathname } = useLocation();
  const [settings, setSettings] = useState(defaultSettings);
  const [pages, setPages] = useState({});
  const [posts, setPosts] = useState(defaultPosts.map(formatPost));
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [loading, setLoading] = useState(true);
  const loadingRef = useRef(false);

  const load = async (silent = false) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    if (!silent) setLoading(true);
    try {
      const [nextSettings, nextPages, nextPosts, nextTestimonials] = await Promise.all([
        publicGet('/settings'),
        publicGet('/pages'),
        publicGet('/posts'),
        publicGet('/testimonials'),
      ]);

      if (nextSettings) setSettings({ ...defaultSettings, ...nextSettings });
      if (Array.isArray(nextPages)) {
        setPages(Object.fromEntries(nextPages.map((page) => [page.slug, page])));
      }
      if (Array.isArray(nextPosts)) {
        setPosts(nextPosts.map(formatPost));
      }
      if (Array.isArray(nextTestimonials)) {
        setTestimonials(nextTestimonials);
      }
    } catch {
      // Keep default content if the API is not running.
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    load(pathname !== '/');
  }, [pathname]);

  useEffect(() => {
    const reload = () => load(true);
    const onVisible = () => {
      if (document.visibilityState === 'visible') reload();
    };
    const unsubscribe = onCmsUpdate(reload);
    window.addEventListener('focus', reload);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      unsubscribe();
      window.removeEventListener('focus', reload);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  useEffect(() => {
    applyTheme(settings);
  }, [settings]);

  const value = useMemo(
    () => ({
      settings,
      pages,
      posts,
      testimonials,
      loading,
      refresh: () => load(true),
      getPage(slug) {
        return deepMerge(defaultPages[slug]?.content, pages[slug]?.content);
      },
      getPost(slug) {
        return posts.find((post) => post.slug === slug) || null;
      },
    }),
    [settings, pages, posts, testimonials, loading]
  );

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCms() {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error('useCms must be used within CmsProvider');
  return ctx;
}

export function usePage(slug) {
  return useCms().getPage(slug);
}
