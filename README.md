# 🚗 Yönel Yedek Parça - Modern React E-ticaret Sitesi

Modern, responsive ve performanslı bir e-ticaret sitesi. Foton, Iveco, Karataş traktör yedek parçaları ve Mutlu Akü ürünleri için özel olarak tasarlanmış.

## ✨ Özellikler

### 🎨 **Modern Tasarım**
- Material-UI ile modern ve responsive tasarım
- Mobil uyumlu arayüz
- Kullanıcı dostu navigasyon
- Profesyonel görsel tasarım

### 🛍️ **E-ticaret Özellikleri**
- Ürün kataloğu ve detay sayfaları
- Kategori ve alt kategori filtreleme
- Arama ve sıralama özellikleri
- Sayfalama (pagination)
- Ürün görselleri ve açıklamaları

### 🔧 **Admin Paneli**
- Ürün yönetimi (CRUD işlemleri)
- Kategori yönetimi
- Slider yönetimi
- Güvenli giriş sistemi
- Dashboard ve istatistikler

### 📱 **Teknoloji Stack**
- **Frontend**: React 18 + Vite
- **UI Library**: Material-UI (MUI)
- **Routing**: React Router DOM
- **State Management**: React Hooks
- **HTTP Client**: Axios
- **Styling**: Material-UI + CSS
- **Build Tool**: Vite
- **Linting**: ESLint

### 🚀 **Performans Optimizasyonları**
- Lazy loading ile kod bölme
- Görsel optimizasyonu
- Bundle boyutu optimizasyonu
- SEO optimizasyonu
- Service Worker ile offline destek
- Performance monitoring

### 🔗 **Entegrasyonlar**
- WhatsApp iletişim entegrasyonu
- SEO meta tagları
- Social media optimizasyonu
- Analytics hazırlığı

## 🛠️ Kurulum

### Gereksinimler
- Node.js (v16 veya üzeri)
- npm veya yarn

### Adımlar

1. **Repository'yi klonlayın:**
```bash
git clone https://github.com/KULLANICI_ADINIZ/yonel-yedek-parca-frontend.git
cd yonel-yedek-parca-frontend
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Environment dosyasını oluşturun:**
```bash
cp env.example .env
```

4. **Environment değişkenlerini düzenleyin:**
```env
VITE_API_BASE_URL=https://api.yonel.com
VITE_WHATSAPP_NUMBER=905551234567
```

5. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

6. **Production build oluşturun:**
```bash
npm run build
```

## 📁 Proje Yapısı

```
src/
├── components/          # Yeniden kullanılabilir bileşenler
│   ├── AdminLayout.jsx
│   ├── Breadcrumb.jsx
│   ├── FAQ.jsx
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   └── WhatsAppFloatButton.jsx
├── pages/              # Sayfa bileşenleri
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── ProductDetail.jsx
│   └── Admin/          # Admin paneli sayfaları
├── utils/              # Yardımcı fonksiyonlar
│   ├── api.js
│   ├── performance.js
│   └── seo.js
├── assets/             # Statik dosyalar
└── config.js           # Konfigürasyon
```

## 🎯 Kullanım

### Ürün Yönetimi
- Admin paneline giriş yapın
- Ürün ekleme, düzenleme, silme
- Kategori yönetimi
- Görsel yükleme

### Müşteri Deneyimi
- Ürün arama ve filtreleme
- Kategori bazlı gezinme
- Ürün detay sayfaları
- WhatsApp ile iletişim

## 🔧 Geliştirme

### Kod Kalitesi
- ESLint ile kod kontrolü
- Prettier ile kod formatlama
- Component-based mimari
- Clean code prensipleri

### Performance
- Bundle analizi
- Lazy loading
- Image optimization
- Caching stratejileri

## 📱 Responsive Tasarım

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🌐 SEO Özellikleri

- Meta tag optimizasyonu
- Structured data
- Sitemap.xml
- Robots.txt
- Open Graph tags
- Twitter Cards

## 📞 İletişim

- **Website**: [yönel.com](https://yönel.com)
- **WhatsApp**: +90 555 123 45 67
- **Email**: info@yönel.com

## 📄 Lisans

Bu proje özel mülkiyettir. Tüm hakları saklıdır.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

---

**Yönel Yedek Parça** - Güvenilir yedek parça çözümleri için tercih edilen adres! 🚗✨