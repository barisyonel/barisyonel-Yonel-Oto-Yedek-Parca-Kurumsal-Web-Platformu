import { Container, Typography, Paper, Grid, Box, Card, CardContent, Divider, Chip } from '@mui/material';
import Breadcrumb from '../components/Breadcrumb';
import { Helmet } from 'react-helmet-async';
import { 
  Business, 
  EmojiEvents, 
  People, 
  LocalShipping, 
  Build, 
  Security,
  Star,
  CheckCircle
} from '@mui/icons-material';

const About = () => {
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Yönel Oto & Yedek Parça",
    "description": "50 yılı aşkın tecrübemizle traktör, akü ve ticari araç yedek parçada güvenilir çözüm ortağınız",
    "url": "https://yonelotoyedekparca.com",
    "logo": "https://yonelotoyedekparca.com/logo.png",
    "foundingDate": "1978",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "TR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://facebook.com/yoneloto",
      "https://instagram.com/yoneloto"
    ]
  };

  const features = [
    {
      icon: <Business sx={{ fontSize: 40, color: 'darkred' }} />,
      title: "50+ Yıllık Tecrübe",
      description: "Yarım asrı aşkın sektör deneyimi ile güvenilir hizmet"
    },
    {
      icon: <LocalShipping sx={{ fontSize: 40, color: 'darkred' }} />,
      title: "Geniş Ürün Yelpazesi",
      description: "Traktör, akü ve ticari araç yedek parçalarında tam çözüm"
    },
    {
      icon: <People sx={{ fontSize: 40, color: 'darkred' }} />,
      title: "Uzman Kadro",
      description: "Deneyimli ve profesyonel teknik ekibimizle hizmetinizdeyiz"
    },
    {
      icon: <Security sx={{ fontSize: 40, color: 'darkred' }} />,
      title: "Kalite Garantisi",
      description: "Orijinal ve kaliteli ürünlerle müşteri memnuniyeti"
    }
  ];

  const brands = [
    "Karataş Traktör",
    "Foton Traktör", 
    "Mutlu Akü",
    "Iveco",
    "Ducato",
    "Lovol"
  ];

  return (
    <>
      <Helmet>
        <title>Hakkımızda | Yönel Oto & Yedek Parça - 50 Yıllık Tecrübe</title>
        <meta name="description" content="Yönel Oto & Yedek Parça hakkında detaylı bilgi. 50 yılı aşkın tecrübemizle traktör, akü ve ticari araç yedek parçada güvenilir çözüm ortağınız. Karataş, Foton, Mutlu Akü, Iveco yedek parça." />
        <meta name="keywords" content="yönel oto, yedek parça, traktör yedek parça, akü, iveco yedek parça, karataş traktör, foton traktör, mutlu akü, ticari araç yedek parça" />
        <meta name="author" content="Yönel Oto & Yedek Parça" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Hakkımızda | Yönel Oto & Yedek Parça - 50 Yıllık Tecrübe" />
        <meta property="og:description" content="50 yılı aşkın tecrübemizle traktör, akü ve ticari araç yedek parçada güvenilir çözüm ortağınız." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yonelotoyedekparca.com/about" />
        <meta property="og:image" content="https://yonelotoyedekparca.com/images/about-hero.jpg" />
        <meta property="og:site_name" content="Yönel Oto & Yedek Parça" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hakkımızda | Yönel Oto & Yedek Parça" />
        <meta name="twitter:description" content="50 yılı aşkın tecrübemizle traktör, akü ve ticari araç yedek parçada güvenilir çözüm ortağınız." />
        <link rel="canonical" href="https://yonelotoyedekparca.com/about" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Container maxWidth={false} disableGutters sx={{ mt: 6, px: { xs: 2, md: 8 } }}>
        <Breadcrumb />
        
        {/* Hero Section */}
        <Box sx={{ 
          background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
          borderRadius: 4,
          p: { xs: 4, md: 6 },
          mb: 6,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("/images/pattern.svg")',
            opacity: 0.1,
            zIndex: 0
          }
        }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 900, 
              mb: 3, 
              color: 'darkred', 
              letterSpacing: 2,
              fontSize: { xs: 36, md: 48, lg: 56 },
              position: 'relative',
              zIndex: 1,
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              overflowY: 'hidden'
            }}
          >
            Hakkımızda
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#666',
              fontWeight: 300,
              mb: 2,
              position: 'relative',
              zIndex: 1
            }}
          >
            50 Yılı Aşkın Tecrübe ile Güvenilir Çözüm Ortağınız
          </Typography>
          <Chip 
            icon={<Star />} 
            label="1978'den Günümüze" 
            sx={{ 
              backgroundColor: 'darkred', 
              color: 'white',
              fontWeight: 600,
              fontSize: '1rem',
              position: 'relative',
              zIndex: 1
            }} 
          />
        </Box>

        {/* Main Content */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
                      <Grid xs={12} lg={8}>
            <Paper elevation={4} sx={{ 
              p: { xs: 4, md: 6 }, 
              borderRadius: 4, 
              height: '100%',
              background: 'linear-gradient(145deg, #ffffff 0%, #fafafa 100%)',
              border: '1px solid #e0e0e0'
            }}>
              <Typography variant="h4" component="h2" gutterBottom sx={{ 
                fontWeight: 700, 
                color: '#333',
                mb: 4,
                borderBottom: '3px solid darkred',
                pb: 2
              }}>
                Şirketimiz Hakkında
              </Typography>
              
              <Typography variant="body1" sx={{ 
                mb: 3, 
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: '#444'
              }}>
                <strong>Yönel Oto & Yedek Parça</strong> olarak, 1978 yılından bu yana sektörde faaliyet gösteriyoruz. 
                50 yılı aşkın tecrübemizle <strong>Karataş Traktör</strong>, <strong>Foton Traktör</strong>, 
                <strong>Mutlu Akü</strong>, <strong>Iveco</strong>, <strong>Ducato</strong> ve <strong>Lovol</strong> gibi önde gelen markaların yedek parçalarını 
                müşterilerimize sunuyoruz. <b>Karataş yedek parça</b>, <b>Foton yedek parça</b>, <b>Mutlu Akü</b>, <b>Iveco yedek parça</b>, <b>Ducato yedek parça</b>, <b>Lovol yedek parça</b> gibi ürünlerde Google'da öne çıkmak için stoklarımızı ve hizmet kalitemizi sürekli geliştiriyoruz.
              </Typography>

              <Typography variant="body1" sx={{ 
                mb: 3, 
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: '#444'
              }}>
                Müşteri memnuniyeti ve kaliteli hizmet önceliğimizdir. Geniş ürün yelpazemiz ve uzman kadromuzla, 
                traktör, akü ve ticari araç yedek parça ihtiyaçlarınızda yanınızdayız.
              </Typography>

              <Box sx={{ 
                backgroundColor: '#f8f9fa', 
                p: 3, 
                borderRadius: 3,
                border: '1px solid #e9ecef',
                mb: 3
              }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600, 
                  color: 'darkred',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <EmojiEvents /> Misyonumuz
                </Typography>
                <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.7 }}>
                  Müşterilerimize güvenilir ve kaliteli hizmet sunmak, en uygun fiyatlarla en kaliteli ürünleri 
                  temin etmek ve sektörde güvenilir bir çözüm ortağı olmak.
                </Typography>
              </Box>

              <Box sx={{ 
                backgroundColor: '#f8f9fa', 
                p: 3, 
                borderRadius: 3,
                border: '1px solid #e9ecef'
              }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600, 
                  color: 'darkred',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <Build /> Vizyonumuz
                </Typography>
                <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.7 }}>
                  Traktör, akü ve ticari araç yedek parça sektöründe lider konuma gelmek, teknolojik gelişmeleri 
                  takip ederek müşterilerimize en iyi hizmeti sunmak.
                </Typography>
              </Box>
            </Paper>
          </Grid>

                      <Grid xs={12} lg={4}>
            <Paper elevation={4} sx={{
              p: { xs: 2, md: 3 },
              borderRadius: 4,
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
              border: '1px solid #dee2e6',
              boxShadow: '0 4px 24px rgba(220,0,0,0.07)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 2
            }}>
              <Typography variant="h5" component="h3" gutterBottom sx={{
                fontWeight: 800,
                color: 'darkred',
                mb: 1.5,
                letterSpacing: 1.2
              }}>
                Çalıştığımız Markalar
              </Typography>
              <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'center',
                alignItems: 'center',
                mt: 0.5
              }}>
                {brands.map((brand, index) => (
                  <Box key={index} sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.2,
                    px: 2,
                    py: 0.5,
                    borderRadius: 2.5,
                    background: 'linear-gradient(90deg, #fff 60%, #f8f9fa 100%)',
                    border: '1.5px solid #e9ecef',
                    fontWeight: 700,
                    color: 'darkred',
                    fontSize: '1rem',
                    mb: 0,
                    transition: 'all 0.3s',
                    boxShadow: '0 1px 6px rgba(220,0,0,0.04)',
                    cursor: 'pointer',
                    minHeight: 36,
                    '&:hover': {
                      background: 'linear-gradient(90deg, #ffeaea 60%, #fff 100%)',
                      color: '#b71c1c',
                      borderColor: 'darkred',
                      transform: 'scale(1.07)'
                    }
                  }}>
                    <Business sx={{ fontSize: 22, color: 'darkred', mr: 1 }} />
                    <span>{brand}</span>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Neden Bizi Seçmelisiniz Section */}
        <Paper elevation={3} sx={{
          p: { xs: 4, md: 6 },
          borderRadius: 4,
          background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
          border: '1.5px solid #dee2e6',
          mb: 6,
          boxShadow: '0 8px 32px rgba(220,0,0,0.07)',
          overflowY: 'hidden'
        }}>
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{
            fontWeight: 900,
            color: 'darkred',
            mb: 5,
            letterSpacing: 1.5,
            overflowY: 'hidden'
          }}>
            Neden Bizi Seçmelisiniz?
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {features.map((feature, index) => (
                              <Grid xs={12} sm={6} md={3} key={index}>
                <Box sx={{
                  textAlign: 'center',
                  p: 3,
                  background: 'linear-gradient(120deg, #fff 60%, #f8f9fa 100%)',
                  borderRadius: 3,
                  border: '1.5px solid #e9ecef',
                  height: '100%',
                  transition: 'all 0.3s',
                  boxShadow: '0 2px 12px rgba(220,0,0,0.06)',
                  '&:hover': {
                    transform: 'translateY(-7px) scale(1.04)',
                    boxShadow: '0 8px 32px rgba(220,0,0,0.13)',
                    borderColor: 'darkred',
                    background: 'linear-gradient(120deg, #ffeaea 60%, #fff 100%)'
                  }
                }}>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2,
                    p: 2,
                    backgroundColor: '#f8f9fa',
                    borderRadius: '50%',
                    width: 80,
                    height: 80,
                    mx: 'auto',
                    alignItems: 'center',
                    boxShadow: '0 2px 8px rgba(220,0,0,0.07)'
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" sx={{
                    fontWeight: 700,
                    color: 'darkred',
                    mb: 2,
                    fontSize: '1.15rem',
                    letterSpacing: 0.5
                  }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{
                    color: '#444',
                    lineHeight: 1.7,
                    fontSize: '1.05rem',
                    fontWeight: 500
                  }}>
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Hizmet Bölgelerimiz & SEO Bölümü */}
        <Paper elevation={2} sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
          border: '1.5px solid #dee2e6',
          mb: 6,
          mt: 4,
          boxShadow: '0 4px 16px rgba(220,0,0,0.06)',
          overflowY: 'hidden'
        }}>
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{
            fontWeight: 900,
            color: 'darkred',
            mb: 3,
            letterSpacing: 1.2,
            overflowY: 'hidden'
          }}>
            Hizmet Bölgelerimiz & Ürün Markalarımız
          </Typography>
          <Typography variant="body1" sx={{ color: '#444', fontSize: '1.08rem', mb: 2, textAlign: 'center' }}>
            Yönel Oto & Yedek Parça olarak <b>tüm Türkiye'nin dört bir yanına</b> hızlı ve güvenilir yedek parça hizmeti sunuyoruz. Nerede olursanız olun, siparişleriniz en kısa sürede adresinize ulaştırılır.
          </Typography>
          <Typography variant="body1" sx={{ color: '#444', fontSize: '1.08rem', mb: 2, textAlign: 'center' }}>
            Özellikle <b>Karataş yedek parça</b>, <b>Foton yedek parça</b>, <b>Mutlu Akü</b>, <b>Iveco yedek parça</b>, <b>Ducato yedek parça</b> ve <b>Lovol yedek parça</b> gibi ürünlerde orijinal ve uygun fiyatlı çözümler sunuyoruz. Tüm ürünlerimiz garantili olup, uzman ekibimizle satış sonrası desteğimizle de yanınızdayız.
          </Typography>
          <Typography variant="body1" sx={{ color: '#444', fontSize: '1.08rem', textAlign: 'center' }}>
            Google'da <b>Karataş yedek parça</b>, <b>Foton yedek parça</b>, <b>Mutlu Akü</b>, <b>Iveco yedek parça</b>, <b>Ducato yedek parça</b>, <b>Lovol yedek parça</b> gibi aramalarda öne çıkmak için stoklarımızı sürekli güncelliyor, hızlı kargo ve güvenilir hizmet sunuyoruz. <b>Tüm Türkiye</b> için güvenilir yedek parça çözümlerinde yanınızdayız.
          </Typography>
        </Paper>

        {/* Contact CTA */}
        <Box sx={{ 
          mt: 6, 
          textAlign: 'center',
          p: 4,
          backgroundColor: 'darkred',
          borderRadius: 4,
          color: 'white',
          mb: 6,
          overflowY: 'hidden'
        }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
            Yedek Parça İhtiyaçlarınız İçin Bize Ulaşın
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem' }}>
            Uzman ekibimiz size en uygun çözümü sunmak için hazır bekliyor.
          </Typography>
          <a href="tel:+905542597273" style={{ textDecoration: 'none' }}>
            <Chip 
              icon={<CheckCircle />} 
              label="Hemen İletişime Geçin" 
              sx={{ 
                backgroundColor: 'white',
                color: 'darkred',
                fontWeight: 600,
                fontSize: '1.1rem',
                px: 4,
                py: 2,
                cursor: 'pointer',
                overflowY: 'hidden',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                  transform: 'scale(1.05)',
                  transition: 'all 0.3s ease'
                }
              }} 
            />
          </a>
        </Box>
      </Container>
    </>
  );
};

export default About; 