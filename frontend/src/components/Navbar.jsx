import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Drawer, List, ListItem, ListItemText, TextField, InputAdornment } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import yonelLogo from '../assets/yonel-logo.png';
import Link from '@mui/material/Link';
import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SearchIcon from '@mui/icons-material/Search';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Ana Sayfa', path: '/' },
    { text: 'Ürünler', path: '/products' }, 
    { text: 'Hakkımızda', path: '/about' },
    { text: 'İletişim', path: '/contact' },
  ];

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper', borderBottomLeftRadius: 24, borderBottomRightRadius: 24, p: 0 }}>
      <Box sx={{ position: 'relative', width: '100%', py: 3, borderBottom: '1.5px solid #eee', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box component="img" src={yonelLogo} alt="Yönel Oto Logo" sx={{ height: 56, width: 'auto', objectFit: 'contain', bgcolor: '#fff', borderRadius: 2, p: 0.5, boxShadow: '0 2px 8px rgba(25,118,210,0.07)' }} />
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
      <Box sx={{ bgcolor: 'darkred', color: 'whitesmoke', py: 1, fontSize: 15 }}>
        <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 30 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: { xs: 'flex-start', sm: 'center' },
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 0.5, sm: 2 },
              width: { xs: 'auto', sm: 'auto' }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailIcon sx={{ fontSize: 20, mr: 1 }} />
              <Link href="mailto:tokatyonelotoyedekparca@gmail.com" color="whitesmoke" underline="none" sx={{ fontSize: 15, fontWeight: 500 }}>
                tokatyonelotoyedekparca@gmail.com
              </Link>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: { xs: 0.5, sm: 0 }, ml: { xs: 0, sm: 2 } }}>
              <PhoneIcon sx={{ fontSize: 20, mr: 1 }} />
              <Link href="tel:905542597273" color="whitesmoke" underline="none" sx={{ fontSize: 15, fontWeight: 500 }}>
                0 (554) 259 72 73
              </Link>
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<WhatsAppIcon />}
            href="https://wa.me/905542597273"
            target="_blank"
            sx={{
              fontWeight: 700,
              borderRadius: 4,
              fontSize: 16,
              boxShadow: 2,
              textTransform: 'none',
              ml: 2,
              bgcolor: 'whitesmoke',
              color: 'darkred',
              animation: 'flash 1.2s infinite alternate',
              px: { xs: 4, sm: 5, md: 6 },
              py: { xs: 1.5, sm: 1.7 },
              minWidth: { xs: 180, sm: 200, md: 220 },
              '@keyframes flash': {
                from: { bgcolor: 'whitesmoke' },
                to: { bgcolor: '#f5f5f5' }
              },
              '&:hover': { bgcolor: '#f5f5f5' }
            }}
          >
            Hemen Sipariş Ver
          </Button>
        </Container>
      </Box>
      {/* Ana navbar */}
      <AppBar position="sticky" color="default" elevation={1}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: 72, position: 'relative' }}>
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
                mr: 6,
                pl: 1,
                py: 0.5,
                height: 60,
                minWidth: 200,
              }}
            >
              <Box
                component="img"
                src={yonelLogo}
                alt="Yönel Oto Logo"
                sx={{
                  height: 56,
                  width: '100%',
                  objectFit: 'contain',
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(25,118,210,0.07)',
                  bgcolor: '#fff',
                  p: 0.5,
                }}
              />
            </Box>

            <TextField
              placeholder="Ürün ara..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearch}
              sx={{
                display: { xs: 'none', md: 'flex' },
                width: 300,
                ml: 8,
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#fff',
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: '#000',
                    borderWidth: '2px',
                  },
                  '&:hover fieldset': {
                    borderColor: '#000',
                    borderWidth: '2px',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#000',
                    borderWidth: '2px',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ ml: 'auto', display: { sm: 'none' } }}
            >
              <MenuIcon sx={{ fontSize: 36 }} />
            </IconButton>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, gap: 5, ml: 2, justifyContent: 'flex-start' }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  sx={{ color: 'darkred', fontWeight: 600, fontSize: 15, letterSpacing: 1, '&:hover': { color: '#a80000', bgcolor: '#fff0f0' } }}
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