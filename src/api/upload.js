import api from './client';

/**
 * Upload an image file to the server.
 * @param {File} file
 * @returns {Promise<{ url: string, relativeUrl: string, filename: string }>}
 */
export async function uploadImage(file) {
  if (!file) throw new Error('No file selected');
  const isImage = file.type.startsWith('image/');
  const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  if (!isImage && !isPdf) throw new Error('Please select a valid image (JPG, PNG, WebP) or PDF document');
  if (file.size > 15 * 1024 * 1024) throw new Error('File size must be under 15 MB');

  const form = new FormData();
  form.append('image', file);

  const { data } = await api.post('/upload', form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
}

/** Resolve image path for display (works with absolute URLs, /uploads/..., and external URLs) */
export function imageSrc(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }

  // If in production and API baseURL is a full URL, prepend backend base URL
  const apiBase = import.meta.env.VITE_API_URL || '';
  if (apiBase.startsWith('http://') || apiBase.startsWith('https://')) {
    const backendOrigin = apiBase.replace(/\/api\/?$/, '');
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${backendOrigin}${cleanPath}`;
  }

  // Relative path (dev proxy or monolithic setup)
  return path.startsWith('/') ? path : `/${path}`;
}
