import {
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  CircularProgress,
  Grid,
  Divider,
  Alert,
  Container
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import config from '../config';
import { apiFetch } from '../utils/api';
import { createBrandSlug, createSubCategorySlug, createProductSlug } from '../utils/seo';
import WhatsAppFloatButton from '../components/WhatsAppFloatButton';
import RelatedProducts from '../components/RelatedProducts';
import Breadcrumb from '../components/Breadcrumb';

const API_BASE_URL = config.API_BASE_URL;

// CATEGORY_SLUGS ve SUB_CATEGORY_SLUGS artık dinamik olarak çekilecek
// Bu dosyadaki hardcoded mapler kaldırıldı.

const ProductDetail = () => {
  const { productName } = useParams();
  
  // productName formatı: "urun-adi-123" şeklinde, son kısım productId
  const productId = productName ? productName.split('-').pop() : null;
  

  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]); // Kategorileri tutmak için yeni state

  // Kategorileri API'den çekme (sadece bir kez)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiFetch(`${API_BASE_URL}/Categories`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Kategoriler çekilirken hata oluştu:', error);
        // Kategoriler yüklenemese bile ürün detayını gösterebiliriz
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        console.error('ProductId bulunamadı:', productName);
        setError('Ürün ID bulunamadı.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        // API çağrısı için product ID'yi kullan
        const response = await apiFetch(`${API_BASE_URL}/Products/${productId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        setProduct(data);
      } catch (err) {
        console.error('Ürün detayları çekilirken hata oluştu:', err);
        setError(`Ürün detayları yüklenemedi: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    // Sadece productId değiştiğinde ürünü çek
    fetchProduct();
  }, [productId, productName]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="info">Ürün bulunamadı.</Alert>
      </Container>
    );
  }

  const pageTitle = `${product.name} - ${product.brand || ''} Yedek Parça | Yönel Oto`;
  const metaDescription = `${product.name} ürünü için detaylı bilgi. ${product.brand || ''} marka, ${product.categoryName || ''} kategorisinde orijinal ve garantili yedek parça.`;
  const metaKeywords = `${product.name}, ${product.brand || ''} yedek parça, ${product.categoryName || ''} yedek parça, ${product.subCategory?.name || ''} yedek parça, ${createProductSlug(product.name)}, ${createBrandSlug(product.brand || '')}, ${createBrandSlug(product.categoryName || '')}, ${createSubCategorySlug(product.subCategory?.name || '')}, oto yedek parça, otomotiv parçaları`;

  // Breadcrumb için özel yapı oluştur
  const breadcrumbItems = [
    {
      label: 'Ürünler',
      path: '/products'
    }
  ];

  if (product && categories.length > 0) {
    const category = categories.find(cat => cat.id === product.categoryId);
    if (category) {
      breadcrumbItems.push({
        label: category.name,
        path: `/products?category=${product.categoryId}`
      });
    }
    breadcrumbItems.push({
      label: product.name,
      path: window.location.pathname
    });
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content={(() => {
          const imageUrl = product.imageUrl || product.ImageUrl || product.image;
          if (!imageUrl) return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==';
          if (imageUrl.startsWith('http')) return imageUrl;
          return `${API_BASE_URL}/${imageUrl.replace(/^\//, '')}`;
        })()} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={metaDescription} />
        <meta property="twitter:image" content={(() => {
          const imageUrl = product.imageUrl || product.ImageUrl || product.image;
          if (!imageUrl) return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==';
          if (imageUrl.startsWith('http')) return imageUrl;
          return `${API_BASE_URL}/${imageUrl.replace(/^\//, '')}`;
        })()} />

        {/* Schema.org Product Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "image": (() => {
              const imageUrl = product.imageUrl || product.ImageUrl || product.image;
              if (!imageUrl) return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==';
              if (imageUrl.startsWith('http')) return imageUrl;
              return `${API_BASE_URL}/${imageUrl.replace(/^\//, '')}`;
            })(),
            "description": metaDescription,
            "sku": product.productCode || product.id,
            "mpn": product.productCode || product.id,
            "brand": {
              "@type": "Brand",
              "name": product.brand || 'Yönel Oto'
            },
            "offers": {
              "@type": "Offer",
              "url": window.location.href,
              "priceCurrency": "TRY",
              "price": product.price || '0',
              "itemCondition": "https://schema.org/NewCondition",
              "availability": "https://schema.org/InStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.5",
              "reviewCount": "10"
            }
          })}
        </script>
      </Helmet>

      <Breadcrumb customBreadcrumbs={breadcrumbItems} />
      
      <Button startIcon={<ArrowBackIcon />} onClick={handleGoBack} sx={{ mb: 3 }}>
        Geri Dön
      </Button>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={(() => {
                const imageUrl = product.imageUrl || product.ImageUrl || product.image;
                if (!imageUrl) return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==';
                if (imageUrl.startsWith('http')) return imageUrl;
                return `${API_BASE_URL}/${imageUrl.replace(/^\//, '')}`;
              })()}
              alt={product.name}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: 400,
                objectFit: 'contain',
                borderRadius: '8px',
                border: '1px solid #eee',
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" color="primary" gutterBottom>
              {product.price ? `${product.price} TL` : 'Fiyat Sorunuz'}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description || 'Ürün açıklaması bulunmamaktadır.'}
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Chip label={`Marka: ${product.brand || product.categoryName || categories.find(cat => cat.id === product.categoryId)?.name || 'Belirtilmemiş'}`} sx={{ mr: 1, mb: 1 }} />
              <Chip label={`Kategori: ${product.categoryName || product.brand || categories.find(cat => cat.id === product.categoryId)?.name || 'Belirtilmemiş'}`} sx={{ mr: 1, mb: 1 }} />
              {product.subCategory?.name && (
                <Chip label={`Alt Kategori: ${product.subCategory.name}`} sx={{ mr: 1, mb: 1 }} />
              )}
              {product.productCode && (
                <Chip label={`Ürün Kodu: ${product.productCode}`} sx={{ mr: 1, mb: 1 }} />
              )}
            </Box>
            <Button
              variant="contained"
              color="success"
              startIcon={<WhatsAppIcon />}
              sx={{ mt: 3, py: 1.5, px: 3 }}
              onClick={() => window.open(`https://wa.me/905542597273?text=Merhaba, ${product.name} ürünü hakkında bilgi almak istiyorum.`, '_blank')}
            >
              WhatsApp ile Bilgi Al
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <WhatsAppFloatButton />
    </Container>
    
    {/* İlgili Ürünler */}
    <RelatedProducts currentProduct={product} categories={categories} />
  </>
  );
};

export default ProductDetail;