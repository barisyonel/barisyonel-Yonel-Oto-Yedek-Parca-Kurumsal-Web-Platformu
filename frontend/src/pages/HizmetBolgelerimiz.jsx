import { Container, Typography, Box, Paper, Button, Grid, Chip } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SecurityIcon from '@mui/icons-material/Security';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const brands = [
  'Karataş',
  'Foton',
  'Mutlu Akü',
  'Iveco',
  'Ducato',
  'Lovol'
];

const HizmetBolgelerimiz = () => {
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Yedek Parça Dağıtımı ve Satışı",
    "provider": {
      "@type": "Organization",
      "name": "Yönel Oto & Yedek Parça",
          "url": "https://yonelotoyedekparca.com",
    "logo": "https://yonelotoyedekparca.com/logo.png"
    },
    "areaServed": "Türkiye",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Yedek Parça Markaları",
      "itemListElement": brands.map(b => ({ "@type": "Offer", "itemOffered": { "@type": "Product", "name": b + ' Yedek Parça' } }))
    }
  };

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', py: { xs: 4, md: 8 } }}>
      <Helmet>
        <title>Hizmet Bölgelerimiz | Yönel Oto & Yedek Parça - Türkiye Geneli</title>
        <meta name="description" content="Yönel Oto & Yedek Parça olarak Karataş, Foton, Mutlu Akü, Iveco, Ducato, Lovol gibi markaların yedek parçalarını Türkiye'nin 81 iline hızlı ve güvenli şekilde ulaştırıyoruz." />
        <meta name="keywords" content="karataş yedek parça, foton yedek parça, mutlu akü, iveco yedek parça, ducato yedek parça, lovol yedek parça, türkiye geneli yedek parça, oto yedek parça, hızlı kargo, güvenli teslimat" />
        <meta property="og:title" content="Hizmet Bölgelerimiz | Yönel Oto & Yedek Parça - Türkiye Geneli" />
        <meta property="og:description" content="Karataş, Foton, Mutlu Akü, Iveco, Ducato, Lovol yedek parça Türkiye'nin dört bir yanında. 81 ile hızlı ve güvenli teslimat." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yonelotoyedekparca.com/hizmetbolgelerimiz" />
        <meta property="og:image" content="https://yonelotoyedekparca.com/images/seo-hizmetbolgelerimiz.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hizmet Bölgelerimiz | Yönel Oto & Yedek Parça" />
        <meta name="twitter:description" content="Karataş, Foton, Mutlu Akü, Iveco, Ducato, Lovol yedek parça Türkiye'nin dört bir yanında. 81 ile hızlı ve güvenli teslimat." />
        <link rel="canonical" href="https://yonelotoyedekparca.com/hizmetbolgelerimiz" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <Container maxWidth="md">
        {/* Ana Başlık ve Açıklama */}
        <Paper elevation={3} sx={{ p: { xs: 3, md: 6 }, borderRadius: 4, mb: 4, textAlign: 'center', background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)' }}>
          <Typography variant="h1" component="h1" fontWeight={800} sx={{ color: 'darkred', mb: 3, fontSize: { xs: 28, md: 36 }, overflow: 'hidden !important' }}>
            Foton, Karataş, Iveco, Mutlu Akü Yedek Parça Hizmet Bölgelerimiz
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary', fontWeight: 500, lineHeight: 1.6 }}>
            Türkiye'nin 81 iline <b>Karataş, Foton, Mutlu Akü, Iveco, Ducato, Lovol</b> yedek parça gönderimi!
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, fontSize: 17, lineHeight: 1.8 }}>
            Yönel Oto & Yedek Parça olarak, <b>Türkiye'nin dört bir yanına</b> Karataş yedek parça, Foton yedek parça, Mutlu Akü, Iveco yedek parça, Ducato yedek parça ve Lovol yedek parça gönderimi yapıyoruz. Siparişleriniz en kısa sürede, güvenli şekilde adresinize ulaştırılır. Hangi şehirde olursanız olun, kaliteli hizmet ve müşteri memnuniyeti önceliğimizdir.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', mb: 2 }}>
            {brands.map((brand, i) => (
              <Chip key={i} icon={<LocationOnIcon sx={{ color: 'darkred' }} />} label={brand === 'Mutlu Akü' ? brand : brand + ' Yedek Parça'} sx={{ fontWeight: 700, color: 'darkred', border: '1.5px solid #e9ecef', background: '#fff', px: 2, py: 1, fontSize: 16, overflowY: 'hidden' }} />
            ))}
          </Box>
        </Paper>

        {/* Hizmet Özellikleri */}
        <Paper elevation={3} sx={{ p: { xs: 3, md: 6 }, borderRadius: 4, mb: 4, background: 'linear-gradient(135deg, #f8f9fa 0%, #fff 100%)' }}>
          <Typography variant="h5" fontWeight={700} sx={{ color: 'darkred', mb: 4, textAlign: 'center' }}>
            Kargo ve Teslimat Hizmetlerimiz
          </Typography>
          <Grid container spacing={4}>
            <Grid xs={12} sm={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 1 }}>
                <LocalShippingIcon sx={{ fontSize: 44, color: 'darkred', mb: 1 }} />
                <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
                  Türkiye Geneli Kargo
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  81 ile hızlı ve güvenli teslimat hizmeti sunuyoruz.
                </Typography>
              </Box>
            </Grid>
            <Grid xs={12} sm={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 1 }}>
                <AccessTimeIcon sx={{ fontSize: 44, color: 'darkred', mb: 1 }} />
                <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
                  Hızlı Teslimat
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Siparişleriniz 1-3 iş günü içinde elinizde.
                </Typography>
              </Box>
            </Grid>
            <Grid xs={12} sm={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 1 }}>
                <SecurityIcon sx={{ fontSize: 44, color: 'darkred', mb: 1 }} />
                <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
                  Güvenli Taşıma
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Tüm gönderilerimiz sigortalı ve güvenli şekilde taşınır.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* İletişim CTA */}
        <Paper elevation={3} sx={{ p: { xs: 3, md: 6 }, borderRadius: 4, textAlign: 'center', background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)' }}>
          <Typography variant="h5" fontWeight={700} sx={{ color: 'darkred', mb: 3 }}>
            Sipariş ve Bilgi İçin
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Hangi bölgede olursanız olun, size en yakın şekilde hizmet vermek için buradayız. Detaylı bilgi ve sipariş için bizimle iletişime geçebilirsiniz.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              color="primary" 
              href="tel:+905542597273" 
              startIcon={<PhoneIcon />} 
              sx={{ fontWeight: 700, fontSize: 16, px: 4, py: 1.5, borderRadius: 3 }}
            >
              Hemen Ara
            </Button>
            <Button 
              variant="outlined" 
              color="success" 
              href="https://wa.me/905542597273" 
              target="_blank"
              startIcon={<WhatsAppIcon />} 
              sx={{ fontWeight: 700, fontSize: 16, px: 4, py: 1.5, borderRadius: 3, borderWidth: 2 }}
            >
              WhatsApp
            </Button>
            <Button 
              variant="text" 
              color="secondary" 
              href="/contact" 
              sx={{ fontWeight: 700, fontSize: 16, px: 4, py: 1.5, borderRadius: 3 }}
            >
              İletişim Formu
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default HizmetBolgelerimiz; 