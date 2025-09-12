import { Container, Typography, Grid, Paper, Box, Link } from '@mui/material';
import { Phone, Email, LocationOn, AccessTime } from '@mui/icons-material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  return (
    <Container maxWidth={false} disableGutters sx={{ mt: 6, px: { xs: 2, md: 8 } }}>
      <Helmet>
        <title>İletişim | Yönel Oto & Yedek Parça</title>
        <meta name="description" content="Yönel Oto & Yedek Parça iletişim bilgileri. Adres, telefon, e-posta ve harita." />
        <meta property="og:title" content="İletişim | Yönel Oto & Yedek Parça" />
        <meta property="og:description" content="Yönel Oto & Yedek Parça iletişim bilgileri. Adres, telefon, e-posta ve harita." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yonelotoyedekparca.com/contact" />
      </Helmet>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 800, mb: 4, color: 'darkred', letterSpacing: 1, fontSize: { xs: 32, md: 40 }, overflowY: 'hidden' }}>
        İletişim
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2, mb: 4 }}>
        <Grid xs={12} md={5} sx={{ mx: 'auto' }}>
          <Paper elevation={3} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom fontWeight={700} sx={{ color: 'darkred' }}>
              İletişim Bilgileri
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
              <LocationOn sx={{ color: 'primary.main', mr: 1, mt: 0.5, fontSize: 28 }} />
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                <strong>Adres:</strong> Yeniyurt, Ayyıldız Cd. No:22, 60030 Tokat Merkez/Tokat, Türkiye
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Phone sx={{ color: 'primary.main', mr: 1, fontSize: 28 }} />
              <Typography variant="body1" sx={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: 1 }}>
                <strong>Telefon:</strong> 
                <Link href="https://wa.me/905542597273" color="inherit" underline="hover" target="_blank" rel="noopener noreferrer" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                  0 (554) 259 72 73 <WhatsAppIcon sx={{ fontSize: 20, ml: 0.5 }} />
                </Link>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Email sx={{ color: 'primary.main', mr: 1, fontSize: 28 }} />
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                <strong>E-posta:</strong> tokatyonelotoyedekparca@gmail.com
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <AccessTime sx={{ color: 'primary.main', mr: 1, fontSize: 28 }} />
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                <strong>Çalışma Saatleri:</strong> Pazartesi - Cumartesi: 09:00 - 18:00
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ width: '100%', mb: 4 }}>
        <Paper elevation={3} sx={{ p: 0, borderRadius: 3, width: '100%', height: '50vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
          <Typography variant="h5" gutterBottom fontWeight={700} sx={{ mb: 2, mt: 2, ml: 3 }}>
            Konum
          </Typography>
          <Box sx={{ width: '100%', height: '100%', flex: 1, borderRadius: 2, overflow: 'hidden', boxShadow: 1 }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d190.08360253404578!2d36.543220758028625!3d40.334855413233946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x407db757f1611543%3A0x92738577fac277ee!2sY%C3%B6nel%20Motorlu%20Ara%C3%A7lar!5e0!3m2!1str!2s!4v1748964874423!5m2!1str!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Yönel Oto Harita"
            />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Contact; 