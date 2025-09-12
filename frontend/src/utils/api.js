export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem('token');
  const isFormData = options.body instanceof FormData;
  
  // HTTPS kontrolü (production'da)
  if (!import.meta.env.DEV && !url.startsWith('https://')) {
    console.warn('Production ortamında HTTPS kullanılmalıdır:', url);
  }
  
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(isFormData ? {} : { 'Content-Type': options.body ? 'application/json' : undefined }),
    'Accept': 'application/json',
    'User-Agent': 'YonelFrontend/1.0',
    // Güvenlik başlıkları
    'X-Requested-With': 'XMLHttpRequest',
  };
  
  
  try {
    const response = await fetch(url, {
      ...options,
      headers,
      mode: 'cors',
      credentials: 'omit',
      // Güvenlik için ek ayarlar
      cache: 'no-cache',
      redirect: 'follow',
    });
    
    // HTTP durum kodları kontrolü
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response;
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
} 