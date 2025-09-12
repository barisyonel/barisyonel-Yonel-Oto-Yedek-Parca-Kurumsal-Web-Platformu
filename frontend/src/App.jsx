import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import ProductDetail from './pages/ProductDetail';
import { Paper } from '@mui/material';
import ScrollToTop from './ScrollToTop';
import WhatsAppFloatButton from './components/WhatsAppFloatButton';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f8f9fa',
      paper: '#fff',
    },
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    text: {
      primary: '#222',
      secondary: '#555',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h3: {
      fontWeight: 700,
      letterSpacing: '-1px',
    },
    h5: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f8f9fa',
        },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <div style={{ width: '100vw', minHeight: '100vh', background: theme.palette.background.default, boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
          <Router>
            <div className="app" style={{ width: '100vw', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Navbar />
              <main style={{ width: '100vw', flex: 1 }}>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:productName" element={<ProductDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
              <WhatsAppFloatButton />
            </div>
          </Router>
        </div>
      </HelmetProvider>
    </ThemeProvider>
  );
};

export default App;
