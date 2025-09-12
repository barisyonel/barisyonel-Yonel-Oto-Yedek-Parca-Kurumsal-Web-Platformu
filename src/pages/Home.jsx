import { Container, Typography, Grid, Box, Button, Paper, Chip, Divider, Link } from '@mui/material';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedIcon from '@mui/icons-material/Verified';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import FAQ from '../components/FAQ';
import { memo, useMemo, useCallback, useState, useEffect } from 'react';
import config from '../config';

// Marka logolarını import ediyoruz
import karatasLogo from '../assets/karatas.png';
import fotonLogo from '../assets/foton.png';
import mutluLogo from '../assets/mutlu.png';
import ivecoLogo from '../assets/iveco.png';
import lovolLogo from '../assets/lovol.png';
import ducatoLogo from '../assets/ducato.jpg';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Dialog from '@mui/material/Dialog';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const API_BASE_URL = config.API_BASE_URL;

const advantages = [
  {
    icon: <DirectionsCarFilledIcon sx={{ fontSize: 40, color: 'darkred' }} />,
    title: 'Geniş Ürün Yelpazesi',
    desc: '2000+ çeşit yedek parça ve aksesuar.'
  },
  {
    icon: <VerifiedIcon sx={{ fontSize: 40, color: 'darkred' }} />,
    title: 'Orijinal & Kaliteli Ürün',
    desc: 'Tüm ürünlerimiz garantili ve orijinaldir.'
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 40, color: 'darkred' }} />,
    title: 'Uzman Destek',
    desc: 'Deneyimli ekibimizle her zaman yanınızdayız.'
  },
  {
    icon: <LocalShippingIcon sx={{ fontSize: 40, color: 'darkred' }} />,
    title: 'Hızlı Teslimat',
    desc: 'Siparişleriniz hızlı ve güvenli şekilde elinizde.'
  },
];

const brands = [
  {
    id: 'karatas',
    name: 'Karataş Traktör',
    image: karatasLogo,
    description: 'Karataş Traktör yedek parçaları',
    categoryId: 27
  },
  {
    id: 'foton',
    name: 'Foton Traktör',
    image: fotonLogo,
    description: 'Foton Traktör yedek parçaları',
    categoryId: 28
  },
  {
    id: 'mutlu',
    name: 'Mutlu Akü',
    image: mutluLogo,
    description: 'Mutlu Akü ürünleri',
    categoryId: 29
  },
  {
    id: 'iveco',
    name: 'Iveco',
    image: ivecoLogo,
    description: 'Iveco yedek parçaları',
    categoryId: 16
  },
  {
    id: 'lovol',
    name: 'Lovol',
    image: lovolLogo,
    description: 'Lovol yedek parçaları',
    categoryId: 40
  },
  {
    id: 'ducato',
    name: 'Ducato',
    image: ducatoLogo,
    description: 'Ducato yedek parçaları',
    categoryId: 41
  }
];

const ProductCard = memo(({ product, onClick }) => (
  <Paper
    elevation={3}
    sx={{
      minWidth: { xs: 220, md: 240 },
      maxWidth: 280,
      minHeight: 350,
      flex: '0 0 auto',
      borderRadius: 3,
      p: 2,
      cursor: 'pointer',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
    }}
    onClick={onClick}
  >
    <Box 
      component="img" 
      src={product.image} 
      alt={product.name} 
      sx={{ 
        width: 200, 
        height: 150, 
        objectFit: 'contain', 
        mb: 2, 
        bgcolor: '#f3f4f6', 
        borderRadius: 2 
      }}
      loading="lazy"
    />
    <Chip label={product.subCategory} color="secondary" size="small" sx={{ mb: 1, fontWeight: 600 }} />
    <Typography variant="subtitle1" fontWeight={700} align="center" sx={{ mb: 1, fontSize: 17 }}>
      {product.name}
    </Typography>
    <Typography variant="body2" color="text.secondary" align="center" sx={{ fontSize: 13, minHeight: 32 }}>
      {product.description}
    </Typography>
  </Paper>
));

const AdvantageCard = memo(({ advantage }) => (
                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3} sx={{ display: 'flex' }}>
    <Paper elevation={3} sx={{ 
      p: { xs: 2, md: 4 }, 
      textAlign: 'center', 
      borderRadius: 3, 
      width: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: { xs: 240, md: 240 },
      minHeight: { xs: 240, md: 240 },
      maxHeight: { xs: 240, md: 240 },
      boxSizing: 'border-box',
    }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', flex: 1, justifyContent: 'center' }}>
        <Box sx={{ mb: 2 }}>{advantage.icon}</Box>
        <Typography 
          variant="h6" 
          fontWeight={700} 
          sx={{ 
            mt: 0, 
            fontSize: { xs: '1rem', md: '1.25rem' },
            minHeight: { xs: 28, md: 32 },
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            maxWidth: 180,
            alignSelf: 'center',
            color: 'darkred',
          }}
        >{advantage.title}</Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            mt: 1, 
            color: 'text.secondary', 
            fontSize: { xs: '0.8rem', md: '0.875rem' },
            minHeight: { xs: 38, md: 38 },
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            maxWidth: 200,
            alignSelf: 'center',
          }}
        >{advantage.desc}</Typography>
      </Box>
    </Paper>
  </Grid>
));

const BrandCard = memo(({ brand }) => {
  const navigate = useNavigate();

  const handleBrandClick = useCallback(() => {
    navigate(`/products?category=${brand.categoryId}`);
  }, [navigate, brand.categoryId]);

  return (
    <Paper
      elevation={3}
      sx={{
        minWidth: { xs: 140, md: 160 },
        maxWidth: 180,
        minHeight: { xs: 120, md: 140 },
        flex: '0 0 auto',
        borderRadius: 3,
        p: 2,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 6,
        },
      }}
      onClick={handleBrandClick}
    >
      <Box 
        component="img" 
        src={brand.image} 
        alt={brand.name} 
        sx={{ 
          width: '100%', 
          height: 'auto', 
          maxHeight: 80, 
          objectFit: 'contain', 
          mb: 1,
          bgcolor: '#fff',
          borderRadius: 1
        }}
        loading="lazy"
      />
      <Typography variant="subtitle2" fontWeight={700} align="center" sx={{ fontSize: { xs: 12, md: 14 }, color: 'darkred' }}>
        {brand.name}
      </Typography>
      <Typography variant="caption" color="text.secondary" align="center" sx={{ fontSize: { xs: 10, md: 12 } }}>
        {brand.description}
      </Typography>
    </Paper>
  );
});

const Arrow = ({ className, style, onClick, direction }) => (
  <Box
    className={className}
    style={{
      ...style,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: '50%',
      backgroundColor: 'rgba(168, 0, 0, 0.9)',
      color: 'white',
      zIndex: 9999,
      cursor: 'pointer',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      left: direction === 'left' ? 20 : 'auto',
      right: direction === 'right' ? 20 : 'auto',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      border: '2px solid rgba(255,255,255,0.8)',
      '&:before': { display: 'none !important' },
      '&:after': { display: 'none !important' }
    }}
    onClick={onClick}
    sx={{
      '&:hover': {
        backgroundColor: 'rgba(168, 0, 0, 1)',
        transform: 'translateY(-50%) scale(1.1)',
        boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
      },
      '&:before': { display: 'none !important' },
      '&:after': { display: 'none !important' },
      '& .slick-arrow': { display: 'none !important' }
    }}
  >
    {direction === 'left' ? (
      <ArrowBackIosNewIcon sx={{ fontSize: 24, fontWeight: 'bold' }} />
    ) : (
      <ArrowForwardIosIcon sx={{ fontSize: 24, fontWeight: 'bold' }} />
    )}
  </Box>
);

const Home = () => {
  const [openImage, setOpenImage] = useState(null);
  
  // Öne çıkan ürünler için dizi
  const featuredProducts = useMemo(() => [
    {
      name: 'Foton Yağ Filtresi',
      image: '/images/foton-oil-filter.jpg',
      description: 'Foton traktörler için özel üretim yağ filtresi',
      subCategory: 'Yağ Filtresi'
    },
    {
      name: 'Mutlu 60AH Akü',
      image: '/images/60aku.png',
      description: 'Mutlu 60AH kuru akü, uzun ömürlü performans',
      subCategory: 'Akü'
    },
    {
      name: 'Karataş  Balata Seti',
      image: '/images/karatasbas.jpg',
      description: 'Karataş traktörler için uyumlu, yüksek performanslı  balata seti.',
      subCategory: 'Baskı Balata Seti'
    },
    {
      name: 'Iveco Daily Balata Seti',
      image: '/images/balata.png',
      description: 'Iveco Daily 70C-15 için uyumlu, yüksek performanslı balata seti.',
      subCategory: 'Balata Seti'
    }
  ], []);

  // Slider görselleri için state
  const [sliderImages, setSliderImages] = useState([]);

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/SliderImages`);
        if (!response.ok) throw new Error('Slider görselleri yüklenemedi');
        const data = await response.json();
        setSliderImages(data);
      } catch {
        setSliderImages([]);
      }
    };
    fetchSliderImages();
  }, []);

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', overflowX: 'hidden', boxSizing: 'border-box', m: 0, p: 0 }}>
      <Helmet>
        <title>Foton Traktör Yedek Parçaları | Iveco Daily Eurobus | Karataş Traktör | Ducato | Mutlu Akü - Yönel Oto</title>
        <meta name="description" content="Foton traktör yedek parçaları, Iveco Daily Eurobus yedek parçaları, Karataş traktör yedek parçaları, Ducato yedek parçaları, Mutlu akü. 2000+ çeşit ürün, hızlı teslimat, Türkiye geneli kargo. Orijinal ve garantili yedek parça." />
        <meta name="keywords" content="foton traktör yedek parçaları, iveco daily yedek parçaları, iveco eurobus yedek parçaları, karataş traktör yedek parçaları, ducato yedek parçaları, mutlu akü, foton yedek parça, iveco yedek parça, karataş yedek parça, ducato yedek parça, mutlu akü satışı, traktör yedek parça, ticari araç yedek parça, akü satışı, yönel oto yedek parça" />
        <meta property="og:title" content="Foton Traktör Yedek Parçaları | Iveco Daily Eurobus | Karataş Traktör | Ducato | Mutlu Akü - Yönel Oto" />
        <meta property="og:description" content="Foton traktör yedek parçaları, Iveco Daily Eurobus yedek parçaları, Karataş traktör yedek parçaları, Ducato yedek parçaları, Mutlu akü. 2000+ çeşit ürün, hızlı teslimat ve uzman destek ile güvenilir çözüm ortağınız." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yoneloto.com" />
        <meta property="og:image" content="https://yoneloto.com/og-image.jpg" />
      </Helmet>

      {/* SEO Optimized Hero Section with H1 */}
      <Container maxWidth={false} disableGutters sx={{ 
        py: { xs: 4, md: 8 }, 
        px: { xs: 2, md: 8 },
        bgcolor: '#f8f9fa',
        textAlign: 'center'
      }}>
        <Typography 
          variant="h1" 
          component="h1"
          sx={{ 
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
            fontWeight: 900,
            color: 'darkred',
            mb: 3,
            lineHeight: 1.2,
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            overflowY: 'hidden'
          }}
        >
          Foton Traktör Yedek Parçaları | Iveco Daily | Karataş Traktör | Mutlu Akü
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            color: '#666',
            mb: 4,
            maxWidth: '800px',
            mx: 'auto',
            lineHeight: 1.6
          }}
        >
          Foton traktör yedek parçaları, Iveco Daily Eurobus yedek parçaları, Karataş traktör yedek parçaları, Ducato yedek parçaları ve Mutlu akü satışında Türkiye'nin güvenilir adresi.
        </Typography>
      </Container>

      {/* Slider ve Açıklama Alanı */}
      <Box sx={{
        width: '100%',
        maxWidth: '1200px',
        mx: 'auto',
        mt: 4,
        mb: 6,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        bgcolor: '#fff',
        px: 2,
        py: 2,
        borderRadius: 3,
        boxShadow: 2
      }}>
        {/* Açıklama Alanı */}
        <Box sx={{
          flex: 1,
          minWidth: 220,
          maxWidth: 360,
          textAlign: { xs: 'center', md: 'left' },
          mb: { xs: 3, md: 0 }
        }}>
          <Typography variant="h4" fontWeight={700} sx={{ color: 'darkred', mb: 2, overflowY: 'hidden' }}>
            Hoşgeldiniz!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Yönel Oto & Yedek Parça olarak, Traktör, Akü ve Iveco Ducato yedek parçada güvenilir çözüm ortağınızız. 2000+ çeşit ürün ve uzman desteğimizle hizmetinizdeyiz.
          </Typography>
          
          {/* İç Bağlantılar - SEO için */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
            <Button 
              component={RouterLink} 
              to="/products?category=28" 
              variant="outlined" 
              size="small"
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              Foton Yedek Parça
            </Button>
            <Button 
              component={RouterLink} 
              to="/products?category=16" 
              variant="outlined" 
              size="small"
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              Iveco Yedek Parça
            </Button>
            <Button 
              component={RouterLink} 
              to="/products?category=27" 
              variant="outlined" 
              size="small"
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              Karataş Yedek Parça
            </Button>
            <Button 
              component={RouterLink} 
              to="/products?category=29" 
              variant="outlined" 
              size="small"
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              Mutlu Akü
            </Button>
          </Box>
        </Box>
        {/* Slider Alanı */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ 
            width: '800px', 
            maxWidth: '100%',
            '& .slick-prev, & .slick-next': {
              display: 'none !important'
            },
            '& .slick-arrow': {
              display: 'none !important'
            }
          }}>
            <Slider
              dots={false}
              infinite={true}
              speed={300}
              slidesToShow={1}
              slidesToScroll={1}
              autoplay={true}
              autoplaySpeed={3000}
              arrows={true}
              nextArrow={<Arrow direction="right" />}
              prevArrow={<Arrow direction="left" />}
              lazyLoad="ondemand"
              touchMove={true}
              swipe={true}
              swipeToSlide={true}
              touchThreshold={10}
              useCSS={true}
              useTransform={true}
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    arrows: true,
                    nextArrow: <Arrow direction="right" />,
                    prevArrow: <Arrow direction="left" />
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    arrows: true,
                    nextArrow: <Arrow direction="right" />,
                    prevArrow: <Arrow direction="left" />
                  }
                }
              ]}
            >
              {sliderImages.map((img, idx) => (
                <Box
                  key={idx}
                  sx={{
                    width: '100%',
                    height: { xs: 220, md: 420 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#fff',
                    overflow: 'hidden',
                    m: 0,
                    p: 0,
                  }}
                >
                  <Box
                    component="img"
                    src={img.imageUrl || img.ImageUrl}
                    alt={`Yönel Oto Yedek Parça - ${img.title || 'Foton Traktör, Iveco Daily, Karataş Traktör, Mutlu Akü'} - Ürün Galerisi ${idx + 1}`}
                    loading={idx === 0 ? "eager" : "lazy"}
                    decoding="async"
                    fetchpriority={idx === 0 ? "high" : "low"}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      borderRadius: 3,
                      boxShadow: 2,
                      display: 'block',
                      cursor: 'pointer',
                    }}
                    onClick={() => setOpenImage(img.imageUrl || img.ImageUrl)}
                  />
                </Box>
              ))}
            </Slider>
          </Box>
        </Box>
      </Box>

      {/* Öne Çıkan Markalarımız - Slider'ın hemen altında */}
      <Container maxWidth={false} disableGutters sx={{ 
        py: 6, 
        px: { xs: 0, md: 8 },
        overflowX: 'hidden',
        width: '100vw',
        bgcolor: '#f8f9fa'
      }}>
        <Typography variant="h2" component="h2" fontWeight={700} align="center" sx={{ color: 'darkred', mb: 3, overflowY: 'hidden', fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
          Öne Çıkan Markalarımız
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'row', md: 'row' },
            gap: 3,
            overflowX: { xs: 'auto', md: 'visible' },
            justifyContent: { xs: 'flex-start', md: 'center' },
            pb: 2,
            width: '100%',
            '&::-webkit-scrollbar': {
              display: 'none'
            },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}
        >
          {brands.map((brand) => (
            <BrandCard key={brand.name} brand={brand} />
          ))}
        </Box>
      </Container>

      {/* Öne Çıkan Ürünlerimiz */}
      <Container maxWidth={false} disableGutters sx={{ 
        py: 6, 
        px: { xs: 0, md: 8 },
        overflowX: 'hidden',
        width: '100vw',
        bgcolor: '#fff'
      }}>
        <Typography variant="h2" component="h2" fontWeight={700} align="center" sx={{ color: 'darkred', mb: 3, overflowY: 'hidden', fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
          Öne Çıkan Ürünlerimiz
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            maxWidth: '1200px',
            mx: 'auto',
            px: 2
          }}
        >
          {featuredProducts.map((product) => (
            <ProductCard 
              key={product.name} 
              product={product} 
              onClick={() => setOpenImage(product.image)}
            />
          ))}
        </Box>
      </Container>

      {/* SEO Optimized Brand Sections */}
      <Container maxWidth="lg" sx={{ py: 6, px: { xs: 2, md: 4 } }}>
        
        {/* Foton Traktör Section */}
        <Paper elevation={3} sx={{ p: { xs: 3, md: 6 }, mb: 4, borderRadius: 3, mx: { xs: 0, md: 0 } }}>
          <Typography variant="h2" component="h2" sx={{ 
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            fontWeight: 800,
            color: 'darkred',
            mb: 3,
            textAlign: 'center',
            overflowY: 'hidden'
          }}>
            Foton Traktör Yedek Parçaları
          </Typography>
          
          {/* Foton Görseli - Başlığın Altında */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Box 
              component="img" 
              src={fotonLogo} 
              alt="Foton Traktör Yedek Parçaları - Orijinal Foton Parçaları - Yönel Oto" 
              loading="lazy"
              decoding="async"
              sx={{ 
                width: '100%', 
                maxWidth: 400, 
                height: 'auto',
                display: 'block',
                borderRadius: 2,
                boxShadow: 3
              }}
            />
          </Box>
          
          <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ px: { xs: 2, md: 0 } }}>
            <Grid xs={12} md={8} sx={{ px: { xs: 1, md: 2 } }}>
              <Typography variant="h3" component="h3" sx={{ 
                fontSize: { xs: '1.4rem', md: '1.8rem' },
                fontWeight: 700,
                color: '#333',
                mb: 2,
                overflowY: 'hidden'
              }}>
                Foton Traktör Parçaları
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, fontSize: { xs: '1rem', md: '1.1rem' }, wordBreak: 'break-word', px: { xs: 1, md: 0 } }}>
                <strong>Foton traktör yedek parçaları</strong> konusunda uzman ekibimizle hizmetinizdeyiz. Foton traktörleriniz için ihtiyacınız olan tüm yedek parçaları stoklarımızda bulabilirsiniz. Motor parçaları, şanzıman parçaları, fren sistemleri, elektrik aksamları ve daha fazlası için güvenilir çözüm ortağınız.
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, fontSize: { xs: '1rem', md: '1.1rem' }, wordBreak: 'break-word', px: { xs: 1, md: 0 } }}>
                <strong>Foton yedek parça</strong> satışında 50 yılı aşkın tecrübemizle, orijinal ve kaliteli ürünler sunuyoruz. Hızlı teslimat ve uygun fiyat garantisi ile Foton traktör sahiplerinin tercihi olmaya devam ediyoruz.
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                onClick={() => window.location.href = '/products?category=28'}
                sx={{ 
                  bgcolor: 'darkred',
                  '&:hover': { bgcolor: '#a80000' },
                  fontWeight: 700
                }}
              >
                Foton Yedek Parçalarını İncele
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Karataş Traktör Section */}
        <Paper elevation={3} sx={{ p: { xs: 3, md: 6 }, mb: 4, borderRadius: 3, mx: { xs: 0, md: 0 } }}>
          <Typography variant="h2" component="h2" sx={{ 
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            fontWeight: 800,
            color: 'darkred',
            mb: 3,
            textAlign: 'center',
            overflowY: 'hidden'
          }}>
            Karataş Traktör Parçaları
          </Typography>
          
          {/* Karataş Görseli - Başlığın Altında */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Box 
              component="img" 
              src={karatasLogo} 
              alt="Karataş Traktör Yedek Parçaları - Orijinal Karataş Parçaları - Yönel Oto" 
              sx={{ 
                width: '100%', 
                maxWidth: 400, 
                height: 'auto',
                display: 'block',
                borderRadius: 2,
                boxShadow: 3
              }}
            />
          </Box>
          
          <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ px: { xs: 2, md: 0 } }}>
            <Grid xs={12} md={8} sx={{ px: { xs: 1, md: 2 } }}>
              <Typography variant="h3" component="h3" sx={{ 
                fontSize: { xs: '1.4rem', md: '1.8rem' },
                fontWeight: 700,
                color: '#333',
                mb: 2,
                overflowY: 'hidden'
              }}>
                Karataş Traktör Yedek Parçaları
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, fontSize: { xs: '1rem', md: '1.1rem' }, wordBreak: 'break-word', px: { xs: 1, md: 0 } }}>
                <strong>Karataş traktör yedek parçaları</strong> konusunda Türkiye'nin önde gelen tedarikçilerinden biriyiz. Karataş traktörlerinizin performansını artıracak kaliteli yedek parçaları uygun fiyatlarla sunuyoruz.
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, fontSize: { xs: '1rem', md: '1.1rem' }, wordBreak: 'break-word', px: { xs: 1, md: 0 } }}>
                <strong>Karataş yedek parça</strong> kataloğumuzda motor parçaları, hidrolik sistem parçaları, elektrik aksamları, filtreler ve daha birçok ürün bulabilirsiniz. Orijinal Karataş parçaları ile traktörünüzün ömrünü uzatın.
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                onClick={() => window.location.href = '/products?category=27'}
                sx={{ 
                  bgcolor: 'darkred',
                  '&:hover': { bgcolor: '#a80000' },
                  fontWeight: 700
                }}
              >
                Karataş Yedek Parçalarını İncele
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Iveco Section */}
        <Paper elevation={3} sx={{ p: { xs: 3, md: 6 }, mb: 4, borderRadius: 3, mx: { xs: 0, md: 0 } }}>
          <Typography variant="h2" component="h2" sx={{ 
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            fontWeight: 800,
            color: 'darkred',
            mb: 3,
            textAlign: 'center',
            overflowY: 'hidden'
          }}>
            Iveco ve Daily Yedek Parçaları
          </Typography>
          
          {/* Iveco Görseli - Başlığın Altında */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Box 
              component="img" 
              src={ivecoLogo} 
              alt="Iveco Daily Yedek Parçaları - Eurobus Parçaları - Yönel Oto" 
              sx={{ 
                width: '100%', 
                maxWidth: 400, 
                height: 'auto',
                display: 'block',
                borderRadius: 2,
                boxShadow: 3
              }}
            />
          </Box>
          
          <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ px: { xs: 2, md: 0 } }}>
            <Grid xs={12} md={8} sx={{ px: { xs: 1, md: 2 } }}>
              <Typography variant="h3" component="h3" sx={{ 
                fontSize: { xs: '1.4rem', md: '1.8rem' },
                fontWeight: 700,
                color: '#333',
                mb: 2,
                overflowY: 'hidden'
              }}>
                Iveco Daily Yedek Parçaları
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, fontSize: { xs: '1rem', md: '1.1rem' }, wordBreak: 'break-word', px: { xs: 1, md: 0 } }}>
                <strong>Iveco Daily yedek parçaları</strong> konusunda uzman ekibimizle hizmetinizdeyiz. Iveco Daily araçlarınız için ihtiyacınız olan tüm yedek parçaları stoklarımızda bulabilirsiniz.
              </Typography>
              <Typography variant="h3" component="h3" sx={{ 
                fontSize: { xs: '1.3rem', md: '1.6rem' },
                fontWeight: 700,
                color: '#333',
                mb: 2,
                mt: 3,
                overflowY: 'hidden'
              }}>
                Eurobus Yedek Parçaları
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, fontSize: { xs: '1rem', md: '1.1rem' }, wordBreak: 'break-word', px: { xs: 1, md: 0 } }}>
                <strong>Eurobus yedek parçaları</strong> satışında da güvenilir çözüm ortağınız. Iveco Eurobus araçlarınız için kaliteli ve orijinal yedek parçalar sunuyoruz.
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                onClick={() => window.location.href = '/products?category=16'}
                sx={{ 
                  bgcolor: 'darkred',
                  '&:hover': { bgcolor: '#a80000' },
                  fontWeight: 700
                }}
              >
                Iveco Yedek Parçalarını İncele
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Mutlu Akü Section */}
        <Paper elevation={3} sx={{ p: { xs: 3, md: 6 }, mb: 4, borderRadius: 3, mx: { xs: 0, md: 0 } }}>
          <Typography variant="h2" component="h2" sx={{ 
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            fontWeight: 800,
            color: 'darkred',
            mb: 3,
            textAlign: 'center',
            overflowY: 'hidden'
          }}>
            Mutlu Akü Satışı
          </Typography>
          
          {/* Mutlu Akü Görseli - Başlığın Altında */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Box 
              component="img" 
              src={mutluLogo} 
              alt="Mutlu Akü Satışı - Traktör Aküsü - Ticari Araç Aküsü - Yönel Oto" 
              sx={{ 
                width: '100%', 
                maxWidth: 400, 
                height: 'auto',
                display: 'block',
                borderRadius: 2,
                boxShadow: 3
              }}
            />
          </Box>
          
          <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ px: { xs: 2, md: 0 } }}>
            <Grid xs={12} md={8} sx={{ px: { xs: 1, md: 2 } }}>
              <Typography variant="h3" component="h3" sx={{ 
                fontSize: { xs: '1.4rem', md: '1.8rem' },
                fontWeight: 700,
                color: '#333',
                mb: 2,
                overflowY: 'hidden'
              }}>
                Mutlu Akü Çeşitleri
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, fontSize: { xs: '1rem', md: '1.1rem' }, wordBreak: 'break-word', px: { xs: 1, md: 0 } }}>
                <strong>Mutlu akü satışı</strong> konusunda Türkiye'nin güvenilir adresi. Traktör, ticari araç ve otomobil aküleri için geniş ürün yelpazemizle hizmetinizdeyiz.
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, fontSize: { xs: '1rem', md: '1.1rem' }, wordBreak: 'break-word', px: { xs: 1, md: 0 } }}>
                <strong>Mutlu akü</strong> çeşitlerimiz arasında kuru aküler, sulu aküler, deep cycle aküler ve özel uygulama aküleri bulunmaktadır. Uzun ömürlü performans ve güvenilirlik için Mutlu akü tercih edin.
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                onClick={() => window.location.href = '/products?category=29'}
                sx={{ 
                  bgcolor: 'darkred',
                  '&:hover': { bgcolor: '#a80000' },
                  fontWeight: 700
                }}
              >
                Mutlu Akü Çeşitlerini İncele
              </Button>
            </Grid>
          </Grid>
        </Paper>

      </Container>





      {/* Resim büyütme modalı */}
      <Dialog 
        open={!!openImage} 
        onClose={() => setOpenImage(null)} 
        maxWidth="md" 
        PaperProps={{ 
          sx: { 
            bgcolor: 'transparent', 
            boxShadow: 'none',
            maxWidth: '90vw',
            maxHeight: '90vh'
          } 
        }}
      >
        <Box 
          sx={{ 
            outline: 'none', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            bgcolor: 'transparent',
            position: 'relative'
          }}
        >
          <Box 
            component="img" 
            src={openImage} 
            alt="Büyük görsel" 
            sx={{ 
              maxWidth: '100%',
              maxHeight: '90vh',
              borderRadius: 3,
              boxShadow: 6,
              bgcolor: '#fff',
              objectFit: 'contain'
            }} 
          />
        </Box>
      </Dialog>

      {/* Avantajlar */}
      <Container maxWidth={false} disableGutters sx={{ 
        py: 6, 
        px: { xs: 0, md: 8 },
        overflowX: 'hidden',
        width: '100vw',
      }}>
        <Typography variant="h2" component="h2" align="center" fontWeight={700} gutterBottom sx={{ color: 'darkred', mb: 5, overflowY: 'hidden', fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
          Neden Bizi Seçmelisiniz?
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="stretch" sx={{ 
          width: '100%'
        }}>
          {advantages.map((advantage) => (
            <AdvantageCard key={advantage.title} advantage={advantage} />
          ))}
        </Grid>
      </Container>

      {/* Kısa Hakkımızda */}
      <Container maxWidth={false} disableGutters sx={{ py: 6, px: { xs: 2, md: 8 } }}>
        <Paper elevation={2} sx={{ p: { xs: 3, md: 6 }, borderRadius: 3, maxWidth: 900, mx: 'auto', textAlign: 'center' }}>
          <Typography variant="h2" component="h2" fontWeight={700} gutterBottom sx={{ color: 'darkred', overflowY: 'hidden', fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
            Hakkımızda
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            50 yılı aşkın tecrübemizle <Link component={RouterLink} to="/products?category=27" sx={{ color: 'darkred', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Karataş Traktör</Link>, <Link component={RouterLink} to="/products?category=28" sx={{ color: 'darkred', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Foton Traktör</Link>, <Link component={RouterLink} to="/products?category=29" sx={{ color: 'darkred', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Mutlu Akü</Link> ve <Link component={RouterLink} to="/products?category=16" sx={{ color: 'darkred', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Iveco</Link> gibi önde gelen markaların yedek parçalarını sizlere sunuyoruz. Müşteri memnuniyeti ve kaliteli hizmet önceliğimizdir.  
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: 2 }}>
            <Button variant="contained" color="primary" component={RouterLink} to="/about">Daha Fazla Bilgi</Button>
            <Button variant="outlined" color="primary" component={RouterLink} to="/contact">İletişim</Button>
            <Button variant="outlined" color="primary" component={RouterLink} to="/hizmet-bolgelerimiz">Hizmet Bölgelerimiz</Button>
          </Box>
        </Paper>
      </Container>

      {/* Popüler Kategoriler */}
      <Container maxWidth={false} disableGutters sx={{ py: 6, px: { xs: 2, md: 8 }, bgcolor: '#f8f9fa' }}>
        <Typography variant="h2" component="h2" align="center" fontWeight={700} sx={{ color: 'darkred', mb: 4, fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
          Popüler Yedek Parça Kategorileri
        </Typography>
        <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: '1200px', mx: 'auto' }}>
          {[
            { name: 'Motor Parçaları', desc: 'Motor yağı, filtre, conta ve daha fazlası', link: '/products?search=motor', icon: '🔧' },
            { name: 'Fren Sistemi', desc: 'Balata, disk, hortum ve fren parçaları', link: '/products?search=fren', icon: '🛑' },
            { name: 'Debriyaj Setleri', desc: 'Traktör debriyaj baskı ve balata setleri', link: '/products?search=debriyaj', icon: '⚙️' },
            { name: 'Hidrolik Sistem', desc: 'Hidrolik yağ, pompa ve sistem parçaları', link: '/products?search=hidrolik', icon: '🔄' },
            { name: 'Elektrik Aksamları', desc: 'Akü, alternatör, marş ve kablolar', link: '/products?search=elektrik', icon: '⚡' },
            { name: 'Filtreler', desc: 'Yağ, hava, yakıt ve kabin filtreleri', link: '/products?search=filtre', icon: '🔍' }
          ].map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper 
                elevation={2}
                sx={{ 
                  p: 3, 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                    bgcolor: '#fff'
                  }
                }}
                component={RouterLink}
                to={category.link}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h4" sx={{ mr: 2 }}>{category.icon}</Typography>
                  <Typography variant="h6" fontWeight={600} color="darkred">
                    {category.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                  {category.desc}
                </Typography>
                <Button 
                  size="small" 
                  sx={{ 
                    mt: 2, 
                    alignSelf: 'flex-start',
                    color: 'darkred',
                    fontWeight: 600,
                    textTransform: 'none'
                  }}
                >
                  Ürünleri Gör →
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* SSS Bölümü */}
      {/* SEO Linkler Bölümü */}
      <Container maxWidth="lg" sx={{ py: 4, px: { xs: 2, md: 4 } }}>
        <Paper elevation={2} sx={{ p: 4, borderRadius: 3, bgcolor: '#f8f9fa' }}>
          <Typography variant="h3" component="h3" align="center" fontWeight={700} sx={{ color: 'darkred', mb: 3 }}>
            Yedek Parça Kategorilerimiz
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Link component={RouterLink} to="/products?category=28" sx={{ color: 'darkred', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  <Typography variant="h6">Foton Traktör Parçaları</Typography>
                </Link>
                <Typography variant="body2" color="text.secondary">Motor, şanzıman, fren parçaları</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Link component={RouterLink} to="/products?category=27" sx={{ color: 'darkred', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  <Typography variant="h6">Karataş Traktör Parçaları</Typography>
                </Link>
                <Typography variant="body2" color="text.secondary">Hidrolik, elektrik, filtre</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Link component={RouterLink} to="/products?category=16" sx={{ color: 'darkred', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  <Typography variant="h6">Iveco Daily Parçaları</Typography>
                </Link>
                <Typography variant="body2" color="text.secondary">Eurobus, ticari araç parçaları</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Link component={RouterLink} to="/products?category=29" sx={{ color: 'darkred', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  <Typography variant="h6">Mutlu Akü</Typography>
                </Link>
                <Typography variant="body2" color="text.secondary">Traktör, ticari araç aküsü</Typography>
              </Box>
            </Grid>
          </Grid>
          
          {/* Ek Linkler */}
          <Divider sx={{ my: 3 }} />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            <Link component={RouterLink} to="/products?search=motor" sx={{ color: 'primary.main', fontWeight: 500 }}>Motor Parçaları</Link>
            <Link component={RouterLink} to="/products?search=fren" sx={{ color: 'primary.main', fontWeight: 500 }}>Fren Sistemi</Link>
            <Link component={RouterLink} to="/products?search=debriyaj" sx={{ color: 'primary.main', fontWeight: 500 }}>Debriyaj Setleri</Link>
            <Link component={RouterLink} to="/products?search=hidrolik" sx={{ color: 'primary.main', fontWeight: 500 }}>Hidrolik Sistem</Link>
            <Link component={RouterLink} to="/products?search=elektrik" sx={{ color: 'primary.main', fontWeight: 500 }}>Elektrik Aksamları</Link>
            <Link component={RouterLink} to="/products?search=filtre" sx={{ color: 'primary.main', fontWeight: 500 }}>Filtreler</Link>
            <Link component={RouterLink} to="/about" sx={{ color: 'primary.main', fontWeight: 500 }}>Hakkımızda</Link>
            <Link component={RouterLink} to="/contact" sx={{ color: 'primary.main', fontWeight: 500 }}>İletişim</Link>
            <Link component={RouterLink} to="/hizmet-bolgelerimiz" sx={{ color: 'primary.main', fontWeight: 500 }}>Hizmet Bölgelerimiz</Link>
          </Box>
        </Paper>
      </Container>

      <Container maxWidth={false} disableGutters sx={{ py: 6, px: { xs: 2, md: 8 } }}>
        <FAQ />
      </Container>
    </Box>
  );
};

export default memo(Home);