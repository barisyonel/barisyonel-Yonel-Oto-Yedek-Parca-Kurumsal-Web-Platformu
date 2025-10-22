import { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Box,
  Paper,
  Chip,
  Stack,
  Tooltip,
  Divider,
  Pagination,
  Fab,
  Drawer,
  IconButton,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import config from '../config';
import { apiFetch } from '../utils/api';
import Sidebar from '../components/Sidebar';
import { createBrandSlug, createSubCategorySlug, createProductSlug } from '../utils/seo';
import WhatsAppFloatButton from '../components/WhatsAppFloatButton';
import Breadcrumb from '../components/Breadcrumb';

// Slider için import'lar
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const API_BASE_URL = config.API_BASE_URL;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();


  // Sayfa değiştirme fonksiyonu
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    setSearchParams(newParams);
  };

  // Kategori ve alt kategori sluglarını dinamik olarak oluşturmak için mapler
  const CATEGORY_SLUGS = useMemo(() => {
    const map = {};
    categories.forEach(cat => {
      map[cat.id] = createBrandSlug(cat.name);
    });
    return map;
  }, [categories]);

  // Kategorileri yükle
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiFetch(`${API_BASE_URL}/Categories`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories || data);
        }
      } catch (err) {
        console.error('Kategoriler yüklenirken hata:', err);
      }
    };
    fetchCategories();
  }, []);

  // URL parametrelerini kontrol et
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const subCategoryParam = searchParams.get('subCategory');
    const pageParam = searchParams.get('page');

    // Slug'dan ID'ye dönüşüm için kategori map'i oluştur
    const categorySlugToIdMap = {};
    categories.forEach(cat => {
      categorySlugToIdMap[createBrandSlug(cat.name)] = cat.id.toString();
    });

    if (categoryParam) {
      const categoryId = categorySlugToIdMap[categoryParam] || 'all';
      setSelectedBrand(categoryId);
      
      // Alt kategori slug'ını normal isme çevir
      if (subCategoryParam && categoryId !== 'all') {
        const category = categories.find(cat => cat.id.toString() === categoryId);
        if (category && category.subCategories) {
          const subCategory = category.subCategories.find(sub => {
            const subName = typeof sub === 'string' ? sub : sub.name;
            return createSubCategorySlug(subName) === subCategoryParam;
          });
          if (subCategory) {
            const subName = typeof subCategory === 'string' ? subCategory : subCategory.name;
            setSelectedSubCategory(subName);
          } else {
            setSelectedSubCategory('all');
          }
        } else {
          setSelectedSubCategory('all');
        }
      } else {
        setSelectedSubCategory('all');
      }
    } else {
      setSelectedBrand('all');
      setSelectedSubCategory('all');
    }

    if (pageParam) {
      setCurrentPage(parseInt(pageParam) || 1);
    }
  }, [searchParams, categories]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // URL'den kategori ve alt kategori bilgilerini al
      const categoryParam = searchParams.get('category');
      const subCategoryParam = searchParams.get('subCategory');
      const page = searchParams.get('page') || 1;

      // Slug'dan kategori ID'sini bul
      let categoryId = '';
      let subCategoryName = '';
      
      if (categoryParam && categories.length > 0) {
        const foundCategory = categories.find(cat => createBrandSlug(cat.name) === categoryParam);
        if (foundCategory) {
          categoryId = foundCategory.id.toString();
          
          if (subCategoryParam && foundCategory.subCategories) {
            const foundSubCategory = foundCategory.subCategories.find(sub => {
              const subName = typeof sub === 'string' ? sub : sub.name;
              return createSubCategorySlug(subName) === subCategoryParam;
            });
            if (foundSubCategory) {
              subCategoryName = typeof foundSubCategory === 'string' ? foundSubCategory : foundSubCategory.name;
            }
          }
        }
      }

      let url = `${API_BASE_URL}/Products?page=${page}&limit=12`;
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }
      if (categoryId) {
        url += `&category=${categoryId}`;
      }
      if (subCategoryName && subCategoryName !== 'all') {
        url += `&subCategory=${encodeURIComponent(subCategoryName)}`;
      }

      const response = await apiFetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      setProducts(data.products || data);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error('Ürünler çekilirken hata oluştu:', err);
      setError('Ürünler yüklenemedi.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, searchParams, categories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);


  // Kategori seçildiğinde
  const handleCategorySelect = (categoryId) => {
    const newParams = new URLSearchParams();
    if (categoryId !== 'all') {
      const categorySlug = CATEGORY_SLUGS[categoryId] || categoryId;
      newParams.set('category', categorySlug);
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
    setSelectedBrand(categoryId);
    setSelectedSubCategory('all');
  };

  // Alt kategori seçildiğinde
  const handleSubCategorySelect = (categoryId, subCategory) => {
    const newParams = new URLSearchParams();
    const categorySlug = CATEGORY_SLUGS[categoryId] || categoryId;
    newParams.set('category', categorySlug);
    if (subCategory && subCategory !== 'all') {
      newParams.set('subCategory', createSubCategorySlug(subCategory));
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
    setSelectedSubCategory(subCategory || 'all');
  };

  // Arama fonksiyonu
  const handleSearch = (query) => {
    setSearchQuery(query);
    const newParams = new URLSearchParams();
    if (query) {
      newParams.set('search', query);
    }
    if (selectedBrand !== 'all') {
      const categorySlug = CATEGORY_SLUGS[selectedBrand] || selectedBrand;
      newParams.set('category', categorySlug);
    }
    if (selectedSubCategory !== 'all') {
      newParams.set('subCategory', selectedSubCategory);
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
    setCurrentPage(1);
  };

  // Arama değişikliği
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    
    // Debounce için timeout
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      handleSearch(value);
    }, 500);
  };

  // Custom arrow components - Modern Design
  const PrevArrow = ({ onClick }) => {
    return (
      <Box
        onClick={onClick}
        sx={{
          position: 'absolute',
          left: { xs: 10, sm: 20, md: 40 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          cursor: 'pointer',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '12px',
          width: { xs: 45, sm: 55, md: 65 },
          height: { xs: 45, sm: 55, md: 65 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#e74c3c',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255,255,255,0.3)',
          '&:hover': {
            backgroundColor: '#e74c3c',
            color: 'white',
            transform: 'translateY(-50%) scale(1.1) translateX(-5px)',
            boxShadow: '0 12px 32px rgba(231,76,60,0.4)',
            border: '2px solid #e74c3c',
          },
          '&:active': {
            transform: 'translateY(-50%) scale(0.95)',
          }
        }}
      >
        <ArrowBackIosNewIcon sx={{ 
          fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
          ml: 0.5
        }} />
      </Box>
    );
  };

  const NextArrow = ({ onClick }) => {
    return (
      <Box
        onClick={onClick}
        sx={{
          position: 'absolute',
          right: { xs: 10, sm: 20, md: 40 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          cursor: 'pointer',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '12px',
          width: { xs: 45, sm: 55, md: 65 },
          height: { xs: 45, sm: 55, md: 65 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#e74c3c',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255,255,255,0.3)',
          '&:hover': {
            backgroundColor: '#e74c3c',
            color: 'white',
            transform: 'translateY(-50%) scale(1.1) translateX(5px)',
            boxShadow: '0 12px 32px rgba(231,76,60,0.4)',
            border: '2px solid #e74c3c',
          },
          '&:active': {
            transform: 'translateY(-50%) scale(0.95)',
          }
        }}
      >
        <ArrowForwardIosIcon sx={{ 
          fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' } 
        }} />
      </Box>
    );
  };

  // Slider ayarları - Enhanced Settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    dotsClass: 'slick-dots custom-dots',
    cssEase: 'ease-in-out',
    pauseOnHover: true,
    pauseOnFocus: true,
    swipeToSlide: true,
    touchThreshold: 10,
    lazyLoad: 'progressive',
    adaptiveHeight: false,
  };

  // Slider görselleri - SEO Optimized
  const sliderImages = [
    {
      imageUrl: '/gorsel.png',
      title: 'Iveco Daily Yedek Parçaları - 120-14, 85-12, 65-9, 50NC Modelleri',
      description: 'Iveco Daily yedek parçaları: 120-14, 85-12, 65-9, 50NC modelleri için fren balata, filtre, hidrolik silindir ve tüm orijinal yedek parçalar. Hızlı teslimat, uygun fiyat.',
      alt: 'Iveco Daily 120-14, 85-12, 65-9, 50NC yedek parçaları - Fren balata, filtre ve ağır vasıta parçaları'
    },
    {
      imageUrl: '/gorsel1.png',
      title: 'Foton ve Karataş Traktör Yedek Parçaları',
      description: 'Foton, Karataş traktör yedek parçaları ve Mutlu Akü ürünleri. Fren balata, yağ filtresi, hava filtresi ve 2000+ çeşit orijinal yedek parça. Türkiye geneli kargo.',
      alt: 'Foton ve Karataş traktör yedek parçaları - Orijinal parçalar ve Mutlu Akü'
    },
    {
      imageUrl: '/gorsel2.png',
      title: 'Ağır Vasıta Yedek Parçaları - Iveco Daily ve Ducato',
      description: 'Iveco Daily, Fiat Ducato ağır vasıta yedek parçaları. Hidrolik silindir, fren kaliperi, stop lambası, balata ve tüm profesyonel çözümler. Garantili ürünler, uzman destek.',
      alt: 'Ağır vasıta yedek parçaları - Iveco Daily ve Fiat Ducato hidrolik ve fren sistemleri'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Iveco Daily Yedek Parçaları - 120-14, 85-12, 65-9, 50NC Modelleri | Foton, Karataş Traktör Parçaları | Yönel Oto</title>
        <meta name="description" content="Iveco Daily yedek parçaları (120-14, 85-12, 65-9, 50NC), Foton, Karataş traktör yedek parçaları ve Mutlu Akü. 2000+ orijinal ürün, hızlı teslimat, Türkiye geneli kargo. Fren balata, filtre, hidrolik silindir ve tüm ağır vasıta parçaları." />
        <meta name="keywords" content="iveco yedek parçaları, iveco daily yedek parça, iveco 120-14, iveco 85-12, iveco 65-9, iveco 50nc, daily yedek parçaları, iveco fren balata, iveco filtre, foton yedek parça, karataş traktör parça, mutlu akü, traktör yedek parça, ağır vasıta yedek parça, hidrolik silindir" />
        
        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Iveco Daily Yedek Parçaları - 120-14, 85-12, 65-9, 50NC | Yönel Oto" />
        <meta property="og:description" content="Iveco Daily yedek parçaları (120-14, 85-12, 65-9, 50NC), Foton ve Karataş traktör parçaları. 2000+ orijinal ürün, hızlı teslimat." />
        <meta property="og:url" content="https://yonelotoyedekparca.com/products" />
        <meta property="og:image" content="https://yonelotoyedekparca.com/og-image.jpg" />
        <meta property="og:locale" content="tr_TR" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Iveco Daily Yedek Parçaları - 120-14, 85-12, 65-9, 50NC | Yönel Oto" />
        <meta name="twitter:description" content="Iveco Daily yedek parçaları (120-14, 85-12, 65-9, 50NC), Foton ve Karataş traktör parçaları. 2000+ orijinal ürün." />
        <meta name="twitter:image" content="https://yonelotoyedekparca.com/twitter-image.jpg" />
        
        {/* Additional SEO Tags */}
        <meta name="author" content="Yönel Oto Yedek Parça" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://yonelotoyedekparca.com/products" />
        
        {/* Structured Data - Product Category */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Iveco Daily Yedek Parçaları - 120-14, 85-12, 65-9, 50NC Modelleri",
            "description": "Iveco Daily yedek parçaları (120-14, 85-12, 65-9, 50NC), Foton, Karataş traktör yedek parçaları ve Mutlu Akü ürünleri",
            "url": "https://yonelotoyedekparca.com/products",
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": "2000+",
              "itemListElement": [
                {
                  "@type": "Product",
                  "name": "Iveco Daily 120-14 Yedek Parçaları",
                  "category": "Ağır Vasıta Yedek Parça"
                },
                {
                  "@type": "Product",
                  "name": "Iveco Daily 85-12 Yedek Parçaları",
                  "category": "Ağır Vasıta Yedek Parça"
                },
                {
                  "@type": "Product",
                  "name": "Iveco Daily 65-9 Yedek Parçaları",
                  "category": "Ağır Vasıta Yedek Parça"
                },
                {
                  "@type": "Product",
                  "name": "Iveco Daily 50NC Yedek Parçaları",
                  "category": "Ağır Vasıta Yedek Parça"
                }
              ]
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Ana Sayfa",
                  "item": "https://yonelotoyedekparca.com/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Ürünler",
                  "item": "https://yonelotoyedekparca.com/products"
                }
              ]
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://yonelotoyedekparca.com/products?search={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
        
        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoPartsStore",
            "name": "Yönel Oto Yedek Parça",
            "description": "Iveco Daily, Foton, Karataş Traktör Yedek Parçaları ve Mutlu Akü Satışı",
            "url": "https://yonelotoyedekparca.com",
            "telephone": "+90-XXX-XXX-XXXX",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Türkiye",
              "addressCountry": "TR"
            },
            "priceRange": "$$",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "250"
            }
          })}
        </script>
      </Helmet>

      <WhatsAppFloatButton />

      {/* Hero Slider - Enhanced Modern Design */}
      <Box sx={{ 
        mb: { xs: 4, md: 6 },
        mt: 0,
        maxWidth: '100%',
        width: '100%',
        mx: 0,
        px: 0,
        backgroundColor: '#000',
        borderRadius: 0,
        overflow: 'hidden',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        position: 'relative',
        minHeight: { xs: '280px', sm: '400px', md: '520px', lg: '560px' },
        '& .slick-slider': {
          width: '100%',
          height: '100%',
          margin: 0,
          padding: 0,
        },
        '& .slick-list': {
          width: '100%',
          height: '100%',
          margin: 0,
          padding: 0,
          overflow: 'hidden',
        },
        '& .slick-track': {
          display: 'flex',
          alignItems: 'stretch',
          margin: 0,
          height: '100%',
        },
        '& .slick-slide': {
          height: 'inherit',
          '& > div': {
            height: '100%',
          }
        },
        '& .slick-dots': {
          bottom: { xs: '20px', sm: '30px', md: '40px' },
          zIndex: 10,
          display: 'flex !important',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          '& li': {
            margin: 0,
            width: 'auto',
            height: 'auto',
          },
          '& li button': {
            width: { xs: '30px', sm: '40px', md: '50px' },
            height: { xs: '4px', sm: '5px', md: '6px' },
            padding: 0,
            '&:before': {
              content: '""',
              width: '100%',
              height: '100%',
              borderRadius: '10px',
              backgroundColor: 'rgba(255,255,255,0.5)',
              opacity: 1,
              transition: 'all 0.3s ease',
            }
          },
          '& li.slick-active button:before': {
            backgroundColor: '#e74c3c',
            opacity: 1,
            boxShadow: '0 0 10px rgba(231,76,60,0.6)',
          },
          '& li:hover button:before': {
            backgroundColor: 'rgba(255,255,255,0.8)',
          }
        }
      }}>
        <Slider {...sliderSettings}>
          {sliderImages.map((image, index) => (
            <Box key={index} sx={{ 
              position: 'relative', 
              height: { xs: '280px', sm: '400px', md: '520px', lg: '560px' },
              width: '100vw',
              maxWidth: '100%',
              margin: 0,
              padding: 0,
              backgroundColor: '#000',
              display: 'block',
              overflow: 'hidden',
            }}>
              {/* Background Image with Parallax Effect */}
              <Box
                component="img"
                src={image.imageUrl || image.src}
                alt={image.alt || image.title}
                title={image.title}
                loading={index === 0 ? "eager" : "lazy"}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  display: 'block',
                  margin: 0,
                  padding: 0,
                  filter: 'brightness(0.85)',
                }}
                onError={(e) => {
                  console.error('Image load error:', image.imageUrl);
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="600"%3E%3Crect width="1200" height="600" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23fff" font-size="24"%3EImage Not Found%3C/text%3E%3C/svg%3E';
                }}
              />
              
              {/* Gradient Overlay - Multi-layer */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.9) 100%)',
                  zIndex: 1,
                }}
              />
              
              {/* Content Container */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 2,
                  p: { xs: 3, sm: 4, md: 6, lg: 8 },
                  maxWidth: '1400px',
                  mx: 'auto',
                  width: '100%',
                }}
              >
                <Box
                  sx={{
                    maxWidth: { xs: '100%', sm: '90%', md: '80%', lg: '70%' },
                    animation: 'slideInUp 0.8s ease-out',
                    '@keyframes slideInUp': {
                      from: {
                        opacity: 0,
                        transform: 'translateY(30px)',
                      },
                      to: {
                        opacity: 1,
                        transform: 'translateY(0)',
                      },
                    },
                  }}
                >
                  {/* Title */}
                  <Typography 
                    variant="h2" 
                    sx={{ 
                      fontWeight: 800, 
                      mb: { xs: 1.5, sm: 2, md: 3 },
                      fontSize: { xs: '1.5rem', sm: '2rem', md: '2.75rem', lg: '3.5rem' },
                      color: 'white',
                      lineHeight: 1.2,
                      textShadow: '0 4px 12px rgba(0,0,0,0.5)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {image.title}
                  </Typography>
                  
                  {/* Description */}
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.95)',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem', lg: '1.4rem' },
                      lineHeight: 1.7,
                      mb: { xs: 0, md: 2 },
                      textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                      display: { xs: 'none', sm: 'block' },
                      fontWeight: 400,
                      maxWidth: '900px',
                    }}
                  >
                    {image.description}
                  </Typography>
                  
                  {/* Decorative Line */}
                  <Box
                    sx={{
                      width: { xs: '60px', md: '80px' },
                      height: { xs: '3px', md: '4px' },
                      backgroundColor: '#e74c3c',
                      borderRadius: '2px',
                      mt: { xs: 2, md: 3 },
                      boxShadow: '0 0 15px rgba(231,76,60,0.5)',
                      animation: 'expandWidth 0.8s ease-out 0.3s both',
                      '@keyframes expandWidth': {
                        from: {
                          width: 0,
                        },
                        to: {
                          width: { xs: '60px', md: '80px' },
                        },
                      },
                    }}
                  />
                </Box>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>

      <Breadcrumb />
      
      <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, md: 3 } }}>
        {/* Başlık - SEO Optimized H1 */}
        <Typography 
          variant="h1" 
          component="h1" 
          gutterBottom 
          align="center" 
          sx={{ 
            mb: 3,
            fontWeight: 800,
            color: 'primary.main',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' }
          }}
        >
          Iveco Daily Yedek Parçaları (120-14, 85-12, 65-9, 50NC) | Foton, Karataş Traktör Yedek Parçaları ve Mutlu Akü
        </Typography>
        
        {/* Alt başlık - SEO Optimized H2 */}
        <Typography 
          variant="h2" 
          component="h2" 
          align="center" 
          sx={{ 
            mb: 4,
            fontWeight: 600,
            color: 'text.secondary',
            fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' }
          }}
        >
          2000+ Çeşit Orijinal Yedek Parça - Iveco Daily Fren Balata, Filtre, Hidrolik Silindir - Hızlı Teslimat - Türkiye Geneli Kargo
        </Typography>

        {/* Arama Alanı */}
        <Box sx={{ 
          mb: 4, 
          p: 3, 
          bgcolor: '#f8f9fa', 
          borderRadius: 3,
          border: '1px solid #e9ecef',
          maxWidth: '800px',
          mx: 'auto'
        }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            gap: 2, 
            alignItems: { xs: 'stretch', sm: 'center' },
            justifyContent: 'space-between'
          }}>
            <Box sx={{ flex: 1, maxWidth: { sm: '400px', md: '500px' } }}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Ürün Ara"
                InputProps={{
                  startAdornment: (
                    <Box sx={{ mr: 1, color: 'text.secondary' }}>
                      🔍
                    </Box>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    height: { xs: '48px', sm: '52px' },
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    backgroundColor: 'white',
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Aktif Filtreler */}
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {selectedBrand !== 'all' && (
              <Chip
                label={`Marka: ${categories.find(cat => cat.id.toString() === selectedBrand)?.name || 'Seçili Marka'}`}
                color="secondary"
                onDelete={() => handleCategorySelect('all')}
                size="small"
              />
            )}
            {selectedSubCategory !== 'all' && selectedBrand !== 'all' && (
              <Chip
                label={`Alt Kategori: ${selectedSubCategory}`}
                color="primary"
                onDelete={() => handleSubCategorySelect(selectedBrand, 'all')}
                size="small"
              />
            )}
          </Stack>
        </Box>

        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
          {/* Kategoriler Sidebar */}
          <Box sx={{ 
            display: { xs: 'none', md: 'block' },
            width: { md: '320px' },
            flexShrink: 0,
            minWidth: { md: '320px' }
          }}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                position: 'sticky',
                top: '80px',
                maxHeight: 'calc(100vh - 120px)',
                overflowY: 'auto',
                borderRadius: 3,
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                Kategoriler
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Sidebar
                categories={categories}
                selectedBrand={selectedBrand}
                selectedSubCategory={selectedSubCategory}
                setSelectedBrand={setSelectedBrand}
                setSelectedSubCategory={setSelectedSubCategory}
                onBrandSelect={handleCategorySelect}
                onSubCategorySelect={handleSubCategorySelect}
                onSearch={handleSearch}
                searchQuery={searchQuery}
              />
            </Paper>
          </Box>
          
          {/* Mobile Filtrele Butonu */}
          <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<FilterListIcon />}
              onClick={() => setDrawerOpen(true)}
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600
              }}
            >
              Filtrele ve Ara
            </Button>
          </Box>

          {/* Mobile Drawer */}
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            sx={{
              '& .MuiDrawer-paper': {
                width: { xs: '100%', sm: 400 },
                p: 2
              }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                Filtrele ve Ara
              </Typography>
              <IconButton onClick={() => setDrawerOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Sidebar
              categories={categories}
              selectedBrand={selectedBrand}
              selectedSubCategory={selectedSubCategory}
              setSelectedBrand={setSelectedBrand}
              setSelectedSubCategory={setSelectedSubCategory}
              onBrandSelect={(categoryId) => {
                handleCategorySelect(categoryId);
                setDrawerOpen(false);
              }}
              onSubCategorySelect={(categoryId, subCategory) => {
                handleSubCategorySelect(categoryId, subCategory);
                setDrawerOpen(false);
              }}
              onSearch={handleSearch}
              searchQuery={searchQuery}
            />
          </Drawer>

          {/* Ürünler Ana İçerik */}
          <Box sx={{ flex: 1 }}>
            {/* Sonuç sayısı */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-start', 
              alignItems: 'center', 
              mb: 3
            }}>
              <Typography variant="body1" color="text.secondary">
                {loading ? 'Yükleniyor...' : `${products.length} ürün bulundu`}
              </Typography>
            </Box>

            {loading ? (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                minHeight: '400px',
                flexDirection: 'column',
                gap: 2
              }}>
                <CircularProgress size={60} thickness={4} />
                <Typography variant="body1" color="text.secondary">
                  Ürünler yükleniyor...
                </Typography>
              </Box>
            ) : products.length === 0 ? (
              <Box sx={{ 
                textAlign: 'center', 
                py: 8,
                px: 3
              }}>
                <Box sx={{ 
                  fontSize: '4rem', 
                  mb: 2,
                  opacity: 0.3
                }}>
                  🔍
                </Box>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  Ürün bulunamadı
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Arama kriterlerinizi değiştirerek tekrar deneyin
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {products.map((product) => (
                  <Grid 
                    item 
                    xs={12} 
                    sm={6} 
                    md={4} 
                    key={product.id}
                    sx={{
                      width: { xs: '100%', sm: '50%', md: '33.333%' },
                      maxWidth: { xs: '100%', sm: '50%', md: '33.333%' },
                      flexBasis: { xs: '100%', sm: '50%', md: '33.333%' }
                    }}
                  >
                    <Paper
                      elevation={2}
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 3,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                          '& .product-image': {
                            transform: 'scale(1.05)'
                          }
                        }
                      }}
                    >
                      {/* Ürün Resmi */}
                      <Box sx={{
                        position: 'relative',
                        height: 200,
                        overflow: 'hidden',
                        backgroundColor: '#f8f9fa'
                      }}>
                        <img
                          className="product-image"
                          src={(() => {
                            const imageUrl = product.imageUrl || product.ImageUrl || product.image;
                            if (!imageUrl) return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==';
                            if (imageUrl.startsWith('http')) return imageUrl;
                            return `${API_BASE_URL}/${imageUrl.replace(/^\//, '')}`;
                          })()}
                          alt={`${product.name} - ${product.brand || categories.find(cat => cat.id === product.categoryId)?.name || 'Yedek Parça'}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            objectPosition: 'center',
                            transition: 'transform 0.3s ease'
                          }}
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==';
                          }}
                        />
                      </Box>

                      {/* Ürün Bilgileri - Yeni Tasarım */}
                      <Box sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                        {/* Ürün Adı - Başlık */}
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            lineHeight: 1.3,
                            color: '#333',
                            mb: 2,
                            textAlign: 'center'
                          }}
                        >
                          {product.name}
                        </Typography>

                        {/* Marka Bilgileri - Renkli Noktalarla */}
                        <Box sx={{ mb: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Box sx={{ 
                              width: 8, 
                              height: 8, 
                              borderRadius: '50%', 
                              backgroundColor: '#e74c3c', 
                              mr: 1.5 
                            }} />
                            <Typography variant="body2" sx={{ color: '#333', fontWeight: 500 }}>
                              {product.brand || categories.find(cat => cat.id === product.categoryId)?.name || 'Yedek Parça'}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Box sx={{ 
                              width: 8, 
                              height: 8, 
                              borderRadius: '50%', 
                              backgroundColor: '#2c3e50', 
                              mr: 1.5 
                            }} />
                            <Typography variant="body2" sx={{ color: '#333', fontWeight: 500 }}>
                              {product.brand || categories.find(cat => cat.id === product.categoryId)?.name || 'Yedek Parça'}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ 
                              width: 8, 
                              height: 8, 
                              borderRadius: '50%', 
                              backgroundColor: '#27ae60', 
                              mr: 1.5 
                            }} />
                            <Typography variant="body2" sx={{ color: '#333', fontWeight: 500 }}>
                              {product.subCategory?.name || 'Yedek Parça'}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Alt Bilgi Alanı - Fiyat ve Bilgi Butonları */}
                        <Box sx={{ 
                          mt: 'auto', 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          gap: 2
                        }}>
                          {/* Fiyat Sorunuz */}
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              fontWeight: 700,
                              fontSize: '1rem',
                              color: '#e74c3c',
                              flex: 1
                            }}
                          >
                            Fiyat Sorunuz
                          </Typography>
                          
                          {/* Bilgi Al Butonu */}
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: '#27ae60',
                              color: 'white',
                              fontWeight: 600,
                              borderRadius: 2,
                              px: 2,
                              py: 1,
                              minWidth: 'auto',
                              textTransform: 'none',
                              fontSize: '0.9rem',
                              boxShadow: '0 2px 8px rgba(39, 174, 96, 0.3)',
                              '&:hover': {
                                backgroundColor: '#219a52',
                                boxShadow: '0 4px 12px rgba(39, 174, 96, 0.4)',
                              }
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              const category = categories.find(cat => cat.id === product.categoryId);
                              const categorySlug = category ? createBrandSlug(category.name) : 'yedek-parca';
                              const subCategory = category?.subCategories?.find(sub => sub.name === product.subCategory?.name);
                              const subCategorySlug = subCategory ? createSubCategorySlug(subCategory.name) : createSubCategorySlug(product.subCategory?.name || '');
                              const productNameSlug = createProductSlug(product.name);

                              let productUrl = `/products/${categorySlug}`;
                              if (subCategorySlug && subCategorySlug.trim() !== '') {
                                productUrl += `/${subCategorySlug}`;
                              }
                              productUrl += `/${productNameSlug}-${product.id}`;
                              navigate(productUrl);
                            }}
                          >
                            💬 Bilgi Al
                          </Button>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}

            {/* Sayfalama */}
            {!loading && products.length > 0 && totalPages > 1 && (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                mt: 4,
                mb: 2
              }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                  sx={{
                    '& .MuiPaginationItem-root': {
                      borderRadius: 2,
                      fontWeight: 600
                    }
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Products;