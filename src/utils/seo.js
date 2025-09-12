// SEO uyumlu slug oluşturma fonksiyonları

// Türkçe karakterleri düzgün şekilde slug'a çevirme
const toTurkishSlug = (text) => {
  if (!text) return '';
  
  const turkishMap = {
    'ç': 'c', 'Ç': 'c',
    'ğ': 'g', 'Ğ': 'g',
    'ı': 'i', 'I': 'i',
    'İ': 'i', 'i': 'i',
    'ö': 'o', 'Ö': 'o',
    'ş': 's', 'Ş': 's',
    'ü': 'u', 'Ü': 'u'
  };
  
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[çğıöşüÇĞIİÖŞÜ]/g, (match) => turkishMap[match] || match)
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Marka slug'ı oluştur
export const createBrandSlug = (brandName) => {
  if (!brandName) return '';
  return toTurkishSlug(brandName) + '-yedek-parcalari';
};

// Alt kategori slug'ı oluştur
export const createSubCategorySlug = (subCategoryName) => {
  if (!subCategoryName) return '';
  return toTurkishSlug(subCategoryName);
};

// Ürün slug'ı oluştur
export const createProductSlug = (productName) => {
  if (!productName) return '';
  return toTurkishSlug(productName);
};