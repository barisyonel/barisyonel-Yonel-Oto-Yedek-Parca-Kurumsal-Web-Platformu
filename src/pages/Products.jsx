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
  Select,
  FormControl,
  InputLabel,
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
  const [sortBy, setSortBy] = useState('name');
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
    } else {
      setSelectedBrand('all');
    }

    if (subCategoryParam) {
      setSelectedSubCategory(subCategoryParam);
    } else {
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
            const foundSubCategory = foundCategory.subCategories.find(sub => 
              createSubCategorySlug(sub.name) === subCategoryParam
            );
            if (foundSubCategory) {
              subCategoryName = foundSubCategory.name;
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

  // Sıralama fonksiyonu
  const sortProducts = (products, sortBy) => {
    if (!products || products.length === 0) return products;
    
    const sorted = [...products].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name, 'tr');
        case 'name-desc':
          return b.name.localeCompare(a.name, 'tr');
        case 'price':
          return (a.price || 0) - (b.price || 0);
        case 'price-desc':
          return (b.price || 0) - (a.price || 0);
        default:
          return 0;
      }
    });
    
    return sorted;
  };

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
    if (subCategory !== 'all') {
      newParams.set('subCategory', createSubCategorySlug(subCategory));
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
    setSelectedSubCategory(subCategory);
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

  // Custom arrow components
  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <Box
        onClick={onClick}
        sx={{
          position: 'absolute',
          left: 20,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          cursor: 'pointer',
          color: 'white',
          fontSize: '2rem',
          '&:hover': {
            opacity: 0.7
          }
        }}
      >
        <ArrowBackIosNewIcon />
      </Box>
    );
  };

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <Box
        onClick={onClick}
        sx={{
          position: 'absolute',
          right: 20,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          cursor: 'pointer',
          color: 'white',
          fontSize: '2rem',
          '&:hover': {
            opacity: 0.7
          }
        }}
      >
        <ArrowForwardIosIcon />
      </Box>
    );
  };

  // Slider ayarları
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  };

  // Slider görselleri
  const sliderImages = [
    {
      imageUrl: '/gorsel.png',
      title: 'Yönel Yedek Parça - Geniş Ürün Yelpazesi',
      description: 'Foton, Iveco, Karataş traktör yedek parçaları ve Mutlu Akü ürünleri. 2000+ çeşit orijinal yedek parça.'
    },
    {
      imageUrl: '/gorsel1.png',
      title: 'Otomotiv Yedek Parçaları',
      description: 'Fren balata, filtre, akü ve çeşitli otomotiv yedek parçaları. Kaliteli markalar, uygun fiyatlar.'
    },
    {
      imageUrl: '/gorsel2.png',
      title: 'Ağır Vasıta Yedek Parçaları',
      description: 'Hidrolik silindir, fren kaliperi, stop lambası ve ağır vasıta yedek parçaları. Profesyonel çözümler.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Ürünler - Foton, Iveco, Karataş Traktör Yedek Parçaları | Yönel Oto</title>
        <meta name="description" content="Foton, Iveco, Karataş traktör yedek parçaları ve Mutlu Akü ürünleri. 2000+ çeşit orijinal yedek parça, hızlı teslimat, Türkiye geneli kargo." />
        <meta name="keywords" content="foton yedek parça, iveco daily yedek parça, karataş traktör parça, mutlu akü, traktör yedek parça" />
      </Helmet>

      <WhatsAppFloatButton />

      {/* Hero Slider */}
      <Box sx={{ mb: 4 }}>
        <Slider {...sliderSettings}>
          {sliderImages.map((image, index) => (
            <Box key={index} sx={{ position: 'relative', height: '400px' }}>
              <Box
                component="img"
                src={image.imageUrl || image.src}
                alt={image.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  color: 'white',
                  p: 3,
                  borderRadius: '0 0 8px 8px',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  {image.title}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  {image.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>

      <Breadcrumb />
      
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Başlık */}
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
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          Foton, Iveco, Karataş Traktör Yedek Parçaları ve Mutlu Akü
        </Typography>
        
        {/* Alt başlık */}
        <Typography 
          variant="h2" 
          component="h2" 
          align="center" 
          sx={{ 
            mb: 4,
            fontWeight: 600,
            color: 'text.secondary',
            fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' }
          }}
        >
          2000+ Çeşit Orijinal Yedek Parça - Hızlı Teslimat - Türkiye Geneli Kargo
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
                label={`${categories.find(cat => cat.id.toString() === selectedBrand)?.name || 'Seçili Marka'}`}
                color="secondary"
                onDelete={() => handleCategorySelect('all')}
                size="small"
              />
            )}
          </Stack>
        </Box>

        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
          {/* Kategoriler Sidebar */}
          <Box sx={{ 
            display: { xs: 'none', md: 'block' },
            width: { md: '300px' },
            flexShrink: 0
          }}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                position: 'sticky',
                top: '80px',
                maxHeight: 'calc(100vh - 120px)',
                overflowY: 'auto',
                borderRadius: 3
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
            {/* Sonuç sayısı ve sıralama */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 3,
              flexWrap: 'wrap',
              gap: 2
            }}>
              <Typography variant="body1" color="text.secondary">
                {loading ? 'Yükleniyor...' : `${products.length} ürün bulundu`}
              </Typography>
              
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Sırala</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  label="Sırala"
                >
                  <MenuItem value="name">İsim A-Z</MenuItem>
                  <MenuItem value="name-desc">İsim Z-A</MenuItem>
                  <MenuItem value="price">Fiyat (Düşük-Yüksek)</MenuItem>
                  <MenuItem value="price-desc">Fiyat (Yüksek-Düşük)</MenuItem>
                </Select>
              </FormControl>
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
                {sortProducts(products, sortBy).map((product) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
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
                      onClick={() => {
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

                      {/* Ürün Bilgileri */}
                      <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                        {/* Marka */}
                        <Typography 
                          variant="caption" 
                          color="primary.main" 
                          sx={{ 
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: 0.5,
                            mb: 0.5
                          }}
                        >
                          {product.brand || categories.find(cat => cat.id === product.categoryId)?.name || 'Yedek Parça'}
                        </Typography>

                        {/* Ürün Adı */}
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            lineHeight: 1.3,
                            color: 'text.primary',
                            mb: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            minHeight: '2.4rem'
                          }}
                        >
                          {product.name}
                        </Typography>

                        {/* Alt Kategori */}
                        {product.subCategory?.name && (
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{ 
                              fontSize: '0.8rem',
                              mb: 1
                            }}
                          >
                            {product.subCategory.name}
                          </Typography>
                        )}

                        {/* Fiyat ve Bilgi */}
                        <Box sx={{ mt: 'auto', pt: 1 }}>
                          <Typography 
                            variant="body2" 
                            color="primary.main"
                            sx={{ 
                              fontWeight: 600,
                              fontSize: '0.9rem',
                              textAlign: 'center',
                              py: 1,
                              px: 2,
                              backgroundColor: 'rgba(25, 118, 210, 0.1)',
                              borderRadius: 2,
                              border: '1px solid rgba(25, 118, 210, 0.2)'
                            }}
                          >
                            Bilgi için ulaşın
                          </Typography>
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