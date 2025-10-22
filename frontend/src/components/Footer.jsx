import { Box, Container, Typography, Link, IconButton, Grid } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Link as RouterLink } from 'react-router-dom';
import yonelLogo from '../assets/logo.jpg';

const Footer = () => {
  return (
    <Box sx={{ 
      bgcolor: 'darkred', 
      color: 'whitesmoke', 
      mt: 'auto', 
      py: { xs: 5, md: 7 },
      borderTop: '3px solid rgba(255,255,255,0.1)'
    }} component="footer">
      <Container maxWidth="lg">
        <Grid 
          container 
          spacing={{ xs: 1, md: 2 }}
          sx={{ 
            mb: 3,
            justifyContent: { xs: 'center', md: 'space-between' },
            alignItems: { xs: 'center', md: 'flex-start' }
          }}
        >
          {/* Sol Sütun - Logo ve Açıklama */}
          <Grid item xs={12} md={4} sx={{
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: { xs: 'center', md: 'flex-start' },
            alignItems: { xs: 'center', md: 'flex-start' },
            textAlign: { xs: 'center', md: 'left' },
            px: { xs: 1, md: 0 },
          }}>
            <Box sx={{ 
              width: { xs: '200px', md: '240px' },
              mb: 1.5,
              mt: 0.5,
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-start' },
              alignSelf: { xs: 'center', md: 'flex-start' }
            }}>
              <Box 
                component="img" 
                src={yonelLogo} 
                alt="Yönel Oto Logo" 
                sx={{ 
                  width: '100%',
                  height: 'auto',
                  maxHeight: '100px',
                  objectFit: 'contain',
                  borderRadius: 1,
                }}
              />
            </Box>
            <Typography variant="body1" sx={{ 
              fontSize: '1rem',
              lineHeight: 1.6,
              maxWidth: '280px',
              mb: 1,
              mt: 0,
              opacity: 0.9,
              textAlign: { xs: 'center', md: 'left' },
              alignSelf: { xs: 'center', md: 'flex-start' }
            }}>
              Traktör, akü ve ticari araç yedek parça sektöründe güvenilir çözüm ortağınız.
            </Typography>
            <Typography variant="body2" sx={{ 
              fontSize: '0.9rem',
              opacity: 0.7,
              fontStyle: 'italic',
              textAlign: { xs: 'center', md: 'left' },
              alignSelf: { xs: 'center', md: 'flex-start' }
            }}>
              50+ yıllık tecrübe ile hizmetinizdeyiz
            </Typography>
          </Grid>

          {/* Orta Sütun - Hızlı Bağlantılar */}
          <Grid item xs={12} md={3} sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: { xs: 'center', md: 'flex-start' },
            alignItems: { xs: 'center', md: 'flex-start' },
            px: { xs: 1, md: 0 },
          }}>
            <Typography variant="h6" sx={{ 
              fontSize: '1.2rem',
              fontWeight: 500,
              mb: 1.5,
              textAlign: { xs: 'center', md: 'left' },
              color: '#fff',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              alignSelf: { xs: 'center', md: 'flex-start' }
            }}>
              Hızlı Bağlantılar
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 1.5,
              alignItems: { xs: 'center', md: 'flex-start' },
              alignSelf: { xs: 'center', md: 'flex-start' }
            }}>
              {[
                { text: 'Ana Sayfa', path: '/' },
                { text: 'Ürünler', path: '/products' },
                { text: 'Blog', path: '/blog' },
                { text: 'Hakkımızda', path: '/about' },
                { text: 'Hizmet Bölgelerimiz', path: '/hizmet-bolgelerimiz' },
                { text: 'İletişim', path: '/contact' }
              ].map((link) => (
                <Link
                  key={link.path}
                  component={RouterLink}
                  to={link.path}
                  sx={{
                    color: 'rgba(255,255,255,0.9)',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                    textAlign: { xs: 'center', md: 'left' },
                    position: 'relative',
                    '&:hover': {
                      color: '#fff',
                      transform: 'translateX(8px)',
                      '&::before': {
                        width: '100%'
                      }
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      bottom: '-2px',
                      left: 0,
                      width: '0%',
                      height: '2px',
                      backgroundColor: '#fff',
                      transition: 'width 0.3s ease'
                    }
                  }}
                >
                  {link.text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Sağ Sütun - İletişim Bilgileri */}
          <Grid item xs={12} md={4} sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: { xs: 'center', md: 'flex-start' },
            alignItems: { xs: 'center', md: 'flex-start' },
            px: { xs: 1, md: 0 },
          }}>
            <Typography variant="h6" sx={{ 
              fontSize: '1.2rem',
              fontWeight: 500,
              mb: 1.5,
              textAlign: { xs: 'center', md: 'left' },
              color: '#fff',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              alignSelf: { xs: 'center', md: 'flex-start' }
            }}>
              İletişim Bilgileri
            </Typography>
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              alignItems: { xs: 'center', md: 'flex-start' },
              alignSelf: { xs: 'center', md: 'flex-start' }
            }}>
              {/* Adres */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' },
                gap: 0.5,
                alignSelf: { xs: 'center', md: 'flex-start' }
              }}>
                <Typography variant="body1" sx={{ 
                  fontSize: '1rem',
                  fontWeight: 600,
                  textAlign: { xs: 'center', md: 'left' },
                  color: '#fff'
                }}>
                  Adres:
                </Typography>
                <Typography variant="body2" sx={{ 
                  fontSize: '0.95rem',
                  textAlign: { xs: 'center', md: 'left' },
                  maxWidth: '280px',
                  lineHeight: 1.5,
                  opacity: 0.9
                }}>
                  Yeniyurt, Ayyıldız Cd. No:22,<br />
                  60030 Tokat Merkez
                </Typography>
              </Box>

              {/* Telefon */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' },
                gap: 0.5,
                alignSelf: { xs: 'center', md: 'flex-start' }
              }}>
                <Typography variant="body1" sx={{ 
                  fontSize: '1rem',
                  fontWeight: 600,
                  textAlign: { xs: 'center', md: 'left' },
                  color: '#fff'
                }}>
                  Telefon:
                </Typography>
                <Link 
                  href="https://wa.me/905542597273" 
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    color: 'rgba(255,255,255,0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    textDecoration: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                    '&:hover': { 
                      color: '#25D366',
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  <WhatsAppIcon sx={{ fontSize: 24, color: '#25D366' }} />
                  0 (554) 259 72 73
                </Link>
              </Box>

              {/* Email */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' },
                gap: 0.5,
                alignSelf: { xs: 'center', md: 'flex-start' }
              }}>
                <Typography variant="body1" sx={{ 
                  fontSize: '1rem',
                  fontWeight: 600,
                  textAlign: { xs: 'center', md: 'left' },
                  color: '#fff'
                }}>
                  E-posta:
                </Typography>
                <Link 
                  href="mailto:tokatyonelotoyedekparca@gmail.com"
                  sx={{ 
                    color: 'rgba(255,255,255,0.9)',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    textAlign: { xs: 'center', md: 'left' },
                    transition: 'all 0.3s ease',
                    wordBreak: 'break-word',
                    '&:hover': { 
                      color: '#fff',
                      textDecoration: 'underline'
                    }
                  }}
                >
                  tokatyonelotoyedekparca@gmail.com
                </Link>
              </Box>

              {/* Çalışma Saatleri */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' },
                gap: 0.5,
                alignSelf: { xs: 'center', md: 'flex-start' }
              }}>
                <Typography variant="body1" sx={{ 
                  fontSize: '1rem',
                  fontWeight: 600,
                  textAlign: { xs: 'center', md: 'left' },
                  color: '#fff'
                }}>
                  Çalışma Saatleri:
                </Typography>
                <Typography variant="body2" sx={{ 
                  fontSize: '0.95rem',
                  textAlign: { xs: 'center', md: 'left' },
                  opacity: 0.9
                }}>
                  Pazartesi - Cumartesi<br />
                  09:00 - 18:00
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Alt Bilgi - Çizgi ile Ayrılmış */}
        <Box sx={{ 
          borderTop: '2px solid rgba(255,255,255,0.15)',
          pt: 4,
          textAlign: 'center'
        }}>
          <Typography variant="body1" sx={{ 
            opacity: 0.9, 
            fontSize: '1.1rem',
            mb: 2,
            fontWeight: 500,
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: 1
          }}>
            © {new Date().getFullYear()} Yönel Oto & Yedek Parça. Tüm hakları saklıdır.
          </Typography>
          <Typography variant="body1" sx={{ 
            opacity: 0.8, 
            fontSize: '1rem',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.9)'
          }}>
            Web Tasarım & Geliştirme:{' '}
            <Link
              href="https://bariscanyonel.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                '&:hover': { 
                  color: '#ffd700',
                  textDecoration: 'underline',
                  textShadow: '0 0 8px rgba(255,215,0,0.5)'
                }
              }}
            >
              Barış Can Yönel
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;