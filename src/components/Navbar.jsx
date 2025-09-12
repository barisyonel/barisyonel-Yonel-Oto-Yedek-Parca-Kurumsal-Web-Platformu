import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Drawer, List, ListItem, ListItemText, TextField, InputAdornment } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import yonelLogo from '../assets/logo.jpg';
import Link from '@mui/material/Link';
import CloseIcon from '@mui/icons-material/Close';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Ana Sayfa', path: '/' },
    { text: 'Ürünler', path: '/products' }, 
    { text: 'Blog', path: '/blog' },
    { text: 'Hakkımızda', path: '/about' },
    { text: 'Hizmet Bölgelerimiz', path: '/hizmet-bolgelerimiz' },
    { text: 'İletişim', path: '/contact' },
  ];

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper', borderBottomLeftRadius: 24, borderBottomRightRadius: 24, p: 0 }}>
      <Box sx={{ position: 'relative', width: '100%', height: 120, borderBottom: '1.5px solid #eee', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 0, m: 0 }}>
        <Box component="img" src={yonelLogo} alt="Yönel Oto Logo" sx={{ width: '100%', height: '100%', objectFit: 'cover', bgcolor: '#fff', p: 0, m: 0, boxShadow: '0 2px 8px rgba(25,118,210,0.07)', display: 'block' }} />
        <IconButton onClick={handleDrawerToggle} sx={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}>
          <CloseIcon sx={{ fontSize: 28 }} />
        </IconButton>
      </Box>
      <List sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ width: '100%' }}>
            <Button
              component={RouterLink}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{
                width: '100%',
                fontSize: 22,
                fontWeight: 700,
                color: 'darkred',
                py: 2,
                borderRadius: 2,
                justifyContent: 'center',
                '&:hover': {
                  bgcolor: '#fff0f0',
                  color: 'darkred',
                },
              }}
            >
              {item.text}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Üst iletişim barı */}
      <Box sx={{ bgcolor: 'darkred', color: 'whitesmoke', py: { xs: 1, sm: 2 }, fontSize: 15 }}>
        <Container sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: { xs: 0.5, sm: 2 },
          minHeight: { xs: 48, sm: 30 },
          maxWidth: '100vw',
          width: '100vw',
          overflowX: 'hidden',
          px: 0,
          m: 0,
        }}>
          {/* Mail sadece sm ve üstü için sol tarafta sabit */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1, minWidth: 0, textAlign: 'left', flexShrink: 1 }}>
            <EmailIcon sx={{ fontSize: 20, mr: 1 }} />
            <Link href="mailto:tokatyonelotoyedekparca@gmail.com" color="whitesmoke" underline="none" sx={{ fontSize: 15, fontWeight: 500 }}>
              tokatyonelotoyedekparca@gmail.com
            </Link>
          </Box>
          {/* Telefon ve buton sağda */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: { xs: 0, sm: 'auto' } }}>
            <PhoneIcon sx={{ fontSize: 20, mr: 1 }} />
            <Link href="tel:905542597273" color="whitesmoke" underline="none" sx={{ fontSize: 15, fontWeight: 500, whiteSpace: 'nowrap' }}>
              0 (554) 259 72 73
            </Link>
            <Button
              variant="contained"
              href="https://wa.me/905542597273"
              target="_blank"
              sx={{
                fontWeight: 700,
                borderRadius: 4,
                fontSize: 15,
                boxShadow: 2,
                textTransform: 'none',
                bgcolor: 'whitesmoke',
                color: 'darkred',
                animation: 'flash 1.2s infinite alternate',
                px: 2,
                py: 0.5,
                minWidth: 120,
                maxWidth: 220,
                whiteSpace: 'nowrap',
                ml: 2,
                '@keyframes flash': {
                  from: { bgcolor: 'whitesmoke' },
                  to: { bgcolor: '#f5f5f5' }
                },
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
            >
              Hemen İletişime Geç
            </Button>
          </Box>
        </Container>
      </Box>
      {/* Ana navbar */}
      <AppBar position="sticky" color="default" elevation={1} sx={{ width: '100vw', left: 0, boxShadow: 1, m: 0, p: 0 }}>
        <Container maxWidth={false} disableGutters sx={{ px: 0, mx: 0, width: '100vw', minWidth: 0 }}>
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, sm: 80, md: 92 }, position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100vw', maxWidth: '100vw', overflow: 'hidden', minWidth: 0, flexShrink: 1, px: 0, mx: 0, m: 0, p: 0 }}>
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
                position: 'relative',
                left: 0,
                mr: { xs: 0, sm: 12 },
                ml: 0,
                pl: 0,
                py: 0.5,
                height: { xs: 64, sm: 85, md: 120 },
                width: { xs: 140, sm: 200, md: 260 },
                minWidth: 0,
                flexShrink: 0,
                maxWidth: 'none',
                p: 0,
                m: 0,
                justifyContent: 'flex-start',
              }}
            >
              <Box
                component="img"
                src={yonelLogo}
                alt="Yönel Oto Logo"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 0,
                  boxShadow: '0 2px 8px rgba(25,118,210,0.07)',
                  bgcolor: '#f5f5f5',
                  p: 0,
                  m: 0,
                  display: 'block',
                }}
              />
            </Box>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ ml: 'auto', mr: { xs: 3, sm: 0 }, pr: { xs: 2, sm: 1 }, display: { sm: 'none' }, minWidth: 0, flexShrink: 1, maxWidth: 48 }}
            >
              <MenuIcon sx={{ fontSize: 32 }} />
            </IconButton>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, gap: { sm: 1, md: 1.5, lg: 2 }, justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', ml: { sm: 2, md: 4 } }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    color: 'darkred',
                    fontWeight: 700,
                    fontSize: { sm: 16, md: 17, lg: 18 },
                    letterSpacing: 1,
                    px: { sm: 0.8, md: 1.2, lg: 1.5 },
                    py: 1.2,
                    borderRadius: 3,
                    transition: 'all 0.18s',
                    background: 'transparent',
                    boxShadow: 'none',
                    minWidth: 'auto',
                    flexShrink: 1,
                    '&:hover': {
                      color: '#a80000',
                      bgcolor: '#fff0f0',
                      boxShadow: 2,
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="top"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: '100vw',
            maxWidth: '100vw',
            bgcolor: '#fff',
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
            boxShadow: '0 8px 32px 0 rgba(25,118,210,0.10)',
            p: 0,
            minHeight: '60vh',
            maxHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar; 