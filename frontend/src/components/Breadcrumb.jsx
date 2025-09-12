import React from 'react';
import { Breadcrumbs, Link, Typography, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';

const Breadcrumb = ({ customBreadcrumbs = [] }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Sayfa adları için mapping
  const pageNames = {
    'products': 'Ürünler',
    'about': 'Hakkımızda',
    'contact': 'İletişim',
    'hizmet-bolgelerimiz': 'Hizmet Bölgelerimiz',
    'admin': 'Admin Panel'
  };

  // Kategori ID'lerini isimlerle eşleştirme
  const categoryNames = {
    '16': 'Iveco Yedek Parçaları',
    '27': 'Karataş Traktör',
    '28': 'Foton Traktör', 
    '29': 'Mutlu Akü',
    '40': 'Lovol',
    '41': 'Ducato'
  };

  // Custom breadcrumbs varsa onları kullan
  if (customBreadcrumbs.length > 0) {
    return (
      <Box sx={{ py: 2, px: { xs: 2, md: 0 } }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{
            '& .MuiBreadcrumbs-separator': {
              color: 'darkred'
            }
          }}
        >
          <Link
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'darkred',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            <HomeIcon sx={{ mr: 0.5, fontSize: 20 }} />
            Ana Sayfa
          </Link>
          {customBreadcrumbs.map((crumb, index) => {
            const isLast = index === customBreadcrumbs.length - 1;
            
            if (isLast) {
              return (
                <Typography key={index} color="text.primary" sx={{ fontWeight: 600 }}>
                  {crumb.label}
                </Typography>
              );
            }

            return (
              <Link
                key={index}
                component={RouterLink}
                to={crumb.path}
                sx={{
                  color: 'darkred',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                {crumb.label}
              </Link>
            );
          })}
        </Breadcrumbs>
      </Box>
    );
  }

  // Otomatik breadcrumb oluştur
  const breadcrumbItems = pathnames.map((pathname, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
    const isLast = index === pathnames.length - 1;
    
    // URL parametrelerini kontrol et
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    
    let displayName = pageNames[pathname] || pathname;
    
    // Kategori sayfası için özel isim
    if (pathname === 'products' && categoryParam) {
      displayName = categoryNames[categoryParam] || 'Ürünler';
    }

    if (isLast) {
      return (
        <Typography key={index} color="text.primary" sx={{ fontWeight: 600 }}>
          {displayName}
        </Typography>
      );
    }

    return (
      <Link
        key={index}
        component={RouterLink}
        to={routeTo}
        sx={{
          color: 'darkred',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline'
          }
        }}
      >
        {displayName}
      </Link>
    );
  });

  return (
    <Box sx={{ py: 2, px: { xs: 2, md: 0 } }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{
          '& .MuiBreadcrumbs-separator': {
            color: 'darkred'
          }
        }}
      >
        <Link
          component={RouterLink}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'darkred',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          <HomeIcon sx={{ mr: 0.5, fontSize: 20 }} />
          Ana Sayfa
        </Link>
        {breadcrumbItems}
      </Breadcrumbs>
    </Box>
  );
};

export default Breadcrumb;