const jsonHeaders = { 'Content-Type': 'application/json' };
const CMS_EVENT = 'cms-updated';
const CMS_CHANNEL = 'ctr-cms';

export function notifyCmsUpdate() {
  window.dispatchEvent(new Event(CMS_EVENT));
  try {
    const channel = new BroadcastChannel(CMS_CHANNEL);
    channel.postMessage({ type: CMS_EVENT });
    channel.close();
  } catch {
    // BroadcastChannel is unavailable in some browsers.
  }
}

export function onCmsUpdate(handler) {
  window.addEventListener(CMS_EVENT, handler);
  let channel;
  try {
    channel = new BroadcastChannel(CMS_CHANNEL);
    channel.onmessage = handler;
  } catch {
    channel = null;
  }
  return () => {
    window.removeEventListener(CMS_EVENT, handler);
    channel?.close();
  };
}

const noStore = { cache: 'no-store' };

function withBust(path) {
  const join = path.includes('?') ? '&' : '?';
  return `${path}${join}_=${Date.now()}`;
}

async function parse(res) {
  const text = await res.text();
  let data = {};
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = {};
    }
  }
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

export function publicGet(path) {
  return fetch(withBust(`/api/public${path}`), noStore).then(parse);
}

export function apiGet(path) {
  return fetch(withBust(`/api${path}`), { ...noStore, credentials: 'include' }).then(parse);
}

export function apiSend(path, method, body) {
  return fetch(`/api${path}`, {
    method,
    credentials: 'include',
    cache: 'no-store',
    headers: jsonHeaders,
    body: body ? JSON.stringify(body) : undefined,
  })
    .then(parse)
    .then((data) => {
      notifyCmsUpdate();
      return data;
    });
}

export function apiUpload(file) {
  const maxBytes = 3 * 1024 * 1024;
  if (file.size > maxBytes) {
    return Promise.reject(new Error('Image is too large. Please use a file under 3 MB on the live site.'));
  }

  const form = new FormData();
  form.append('file', file, file.name || 'image.jpg');

  return fetch('/api/auth/upload', {
    method: 'POST',
    credentials: 'include',
    cache: 'no-store',
    body: form,
  })
    .then(parse)
    .then((data) => {
      notifyCmsUpdate();
      return data;
    });
}
