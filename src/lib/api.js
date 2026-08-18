const jsonHeaders = { 'Content-Type': 'application/json' };

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
  return fetch(`/api/public${path}`).then(parse);
}

export function apiGet(path) {
  return fetch(`/api${path}`, { credentials: 'include' }).then(parse);
}

export function apiSend(path, method, body) {
  return fetch(`/api${path}`, {
    method,
    credentials: 'include',
    headers: jsonHeaders,
    body: body ? JSON.stringify(body) : undefined,
  }).then(parse);
}

export function apiUpload(file) {
  if (file.size > 20 * 1024 * 1024) {
    return Promise.reject(new Error('Image is too large. Please use a file under 20 MB.'));
  }
  const body = new FormData();
  body.append('file', file);
  return fetch('/api/auth/upload', {
    method: 'POST',
    credentials: 'include',
    body,
  }).then(parse);
}
