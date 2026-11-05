import api from './client';

/**
 * Upload an image file to the server.
 * @param {File} file
 * @returns {Promise<{ url: string, filename: string }>}
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

/** Resolve image path for display (works with /uploads/... and external URLs) */
export function imageSrc(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  // Vite proxies /uploads to backend in dev
  return path.startsWith('/') ? path : `/${path}`;
}
