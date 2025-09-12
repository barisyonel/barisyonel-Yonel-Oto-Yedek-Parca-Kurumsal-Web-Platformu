import { Box, Container, Typography, Link, IconButton, Grid, TextField, Button } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Link as RouterLink } from 'react-router-dom';
import yonelLogo from '../assets/yonel-logo.png';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'darkred', color: 'whitesmoke', mt: 8, py: 5 }} component="footer">
      <Container maxWidth={false} disableGutters sx={{ px: { xs: 2, md: 8 } }}>
        <Grid container spacing={4} sx={{
          mt: 0,
          mb: 0,
          px: { xs: 0, md: 4 },
          py: { xs: 2, md: 4 },
          columnGap: { xs: 0, md: 6 },
          rowGap: { xs: 4, md: 0 },
        }}>
          <Grid item xs={12} md={4} sx={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            borderRight: { md: '1.5px solid rgba(255,255,255,0.18)' },
            pr: { md: 4 },
            mb: { xs: 3, md: 0 },
            alignItems: { xs: 'center', md: 'flex-start' },
            textAlign: { xs: 'center', md: 'left' }
          }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, mb: 1 }}>
              <Box component="img" src={yonelLogo} alt="Yönel Oto Logo" sx={{ maxHeight: 60, maxWidth: 180, width: '100%', objectFit: 'contain', bgcolor: '#fff', borderRadius: 2, p: 0.5, boxShadow: '0 2px 8px rgba(25,118,210,0.07)' }} />
            </Box>
            <Typography variant="h6" fontWeight={900} gutterBottom sx={{ fontSize: 22, letterSpacing: 0.5, color: 'darkred' }}>
              Yönel Oto & Yedek Parça
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85, fontSize: 15, mt: 1 }}>
              Traktör, akü ve ticari araç yedek parça sektöründe güvenilir çözüm ortağınız.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center', 
            alignItems: { xs: 'center', md: 'center' },
            borderRight: { md: '1.5px solid rgba(255,255,255,0.18)' },
            pr: { md: 4 },
            mb: { xs: 3, md: 0 },
            textAlign: { xs: 'center', md: 'center' },
            width: { xs: '100%', md: 'auto' },
            maxWidth: { xs: 320, md: 'none' },
            mx: { xs: 'auto', md: 0 },
          }}>
            <Typography variant="subtitle1" fontWeight={900} gutterBottom sx={{ fontSize: 20, letterSpacing: 0.5, mb: 1, color: 'darkred' }}>
              Hızlı Bağlantılar
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              gap: { xs: 0.5, md: 1.5 }, 
              mt: 1, 
              width: '100%',
            }}>
              <Link component={RouterLink} to="/" color="inherit" underline="hover" sx={{ fontSize: { xs: 15, md: 17 }, fontWeight: 600, py: 0.5, width: '100%' }}>
                Ana Sayfa
              </Link>
              <Link component={RouterLink} to="/products" color="inherit" underline="hover" sx={{ fontSize: { xs: 15, md: 17 }, fontWeight: 600, py: 0.5, width: '100%' }}>
                Ürünler
              </Link>
              <Link component={RouterLink} to="/about" color="inherit" underline="hover" sx={{ fontSize: { xs: 15, md: 17 }, fontWeight: 600, py: 0.5, width: '100%' }}>
                Hakkımızda
              </Link>
              <Link component={RouterLink} to="/contact" color="inherit" underline="hover" sx={{ fontSize: { xs: 15, md: 17 }, fontWeight: 600, py: 0.5, width: '100%' }}>
                İletişim
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center', 
            alignItems: { xs: 'center', md: 'center' },
            textAlign: { xs: 'center', md: 'center' }
          }}>
            <Typography variant="subtitle1" fontWeight={900} gutterBottom sx={{ fontSize: 20, letterSpacing: 0.5, color: 'darkred' }}>
              İletişim
            </Typography>
            <Typography variant="body2" sx={{ fontSize: 15, mb: { xs: 0.5, md: 2 } }}>Adres: Yeniyurt, Ayyıldız Cd. No:32, 60030 Tokat Merkez</Typography>
            <Typography variant="body2" sx={{ fontSize: 15, mb: { xs: 0.5, md: 2 } }}>Telefon: <Link href="https://wa.me/905542597273" color="inherit" underline="hover" target="_blank" rel="noopener noreferrer" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>0 (554) 259 72 73 <WhatsAppIcon sx={{ fontSize: 20, ml: 0.5 }} /></Link></Typography>
            <Typography variant="body2" sx={{ fontSize: 15, mb: { xs: 0.5, md: 2 } }}>E-posta: <Link href="mailto:tokatyonelotoyedekparca@gmail.com" color="inherit" underline="hover">tokatyonelotoyedekparca@gmail.com</Link></Typography>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 6, opacity: 0.8 }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Yönel Oto & Yedek Parça. Tüm hakları saklıdır.
          </Typography>
          <Typography variant="caption" sx={{ color: 'whitesmoke', fontWeight: 900, fontSize: '1.1rem', mt: 0.5, display: 'block' }}>
            Media <Box component="a" href="https://bariscanyonel.com" target="_blank" rel="noopener noreferrer" sx={{ 
              color: 'whitesmoke', 
              textDecoration: 'underline', 
              fontWeight: 900, 
              ml: 0.5, 
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: '#e0e0e0',
                textDecoration: 'none',
                opacity: 0.8
              }
            }}>Barış Can Yönel</Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 