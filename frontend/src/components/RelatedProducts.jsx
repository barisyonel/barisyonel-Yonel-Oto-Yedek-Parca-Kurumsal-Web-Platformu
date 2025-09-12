import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Container,
  Chip
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { apiFetch } from '../utils/api';
import { createBrandSlug, createSubCategorySlug, createProductSlug } from '../utils/seo';
import config from '../config';

const API_BASE_URL = config.API_BASE_URL;

const RelatedProducts = ({ currentProduct, categories = [] }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRelatedProducts = useCallback(async () => {
    setLoading(true);
    try {
      // Aynı kategoriden diğer ürünleri getir
      const response = await apiFetch(
        `${API_BASE_URL}/Products?category=${currentProduct.categoryId}&limit=4`
      );
      
      if (response.ok) {
        const data = await response.json();
        const products = data.products || data;
        
        // Mevcut ürünü hariç tut
        const filtered = products.filter(p => p.id !== currentProduct.id);
        setRelatedProducts(filtered.slice(0, 4));
      }
    } catch (error) {
      console.error('İlgili ürünler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  }, [currentProduct]);

  useEffect(() => {
    if (currentProduct) {
      fetchRelatedProducts();
    }
  }, [currentProduct, fetchRelatedProducts]);

  if (loading || relatedProducts.length === 0) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
      <Typography 
        variant="h4" 
        component="h2" 
        align="center" 
        gutterBottom 
        sx={{ 
          fontWeight: 700, 
          color: 'darkred',
          mb: 4
        }}
      >
        İlgili Ürünler
      </Typography>
      
      <Grid container spacing={3}>
        {relatedProducts.map((product) => {
          const category = categories.find(cat => cat.id === product.categoryId);
          const categorySlug = category ? createBrandSlug(category.name) : 'yedek-parca';
          const subCategory = category?.subCategories?.find(sub => sub.name === product.subCategory?.name);
          const subCategorySlug = subCategory ? createSubCategorySlug(subCategory.name) : createSubCategorySlug(product.subCategory?.name || '');
          const productNameSlug = createProductSlug(product.name);
          
          let productUrl = `/products/${categorySlug}`;
          if (subCategorySlug) {
            productUrl += `/${subCategorySlug}`;
          }
          productUrl += `/${productNameSlug}-${product.id}`;

          return (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
                component={RouterLink}
                to={productUrl}
                style={{ textDecoration: 'none' }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={(() => {
                    const imageUrl = product.imageUrl || product.ImageUrl || product.image;
                    if (!imageUrl) return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==';
                    if (imageUrl.startsWith('http')) return imageUrl;
                    return `${API_BASE_URL}/${imageUrl.replace(/^\//, '')}`;
                  })()}
                  alt={`${product.name} - ${category?.name || 'Yedek Parça'} - Yönel Oto`}
                  sx={{ objectFit: 'contain', bgcolor: '#f8f9fa' }}
                />
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Typography gutterBottom variant="h6" component="h3" sx={{ 
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {product.name}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                    <Chip
                      label={category?.name || 'Yedek Parça'}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.75rem' }}
                    />
                    {product.subCategory?.name && (
                      <Chip
                        label={product.subCategory.name}
                        size="small"
                        color="primary"
                        sx={{ fontSize: '0.75rem' }}
                      />
                    )}
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    mb: 2
                  }}>
                    {product.description || 'Orijinal ve garantili yedek parça'}
                  </Typography>
                  
                  <Button
                    size="small"
                    color="primary"
                    sx={{ 
                      fontWeight: 600,
                      textTransform: 'none'
                    }}
                  >
                    Detayları Gör
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      
      {/* Kategori sayfasına link */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          component={RouterLink}
          to={`/products?category=${currentProduct.categoryId}`}
          sx={{
            fontWeight: 600,
            px: 4,
            py: 1.5,
            borderRadius: 2
          }}
        >
          {categories.find(cat => cat.id === currentProduct.categoryId)?.name || 'Bu Kategorideki'} Tüm Ürünleri Gör
        </Button>
      </Box>
    </Container>
  );
};

export default RelatedProducts;