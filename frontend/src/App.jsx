import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import { CircularProgress, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './ScrollToTop';
import WhatsAppFloatButton from './components/WhatsAppFloatButton';
import AdminLayout from './components/AdminLayout';
import PrivateRoute from './components/PrivateRoute';

// Lazy loading for better performance
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Blog = lazy(() => import('./pages/Blog'));
const Login = lazy(() => import('./pages/Admin/Login'));
const Register = lazy(() => import('./pages/Admin/Register'));
const AdminProducts = lazy(() => import('./pages/Admin/Products'));
const AdminCategories = lazy(() => import('./pages/Admin/Categories'));
const AdminSliderManagement = lazy(() => import('./pages/Admin/SliderManagement'));
const HizmetBolgelerimiz = lazy(() => import('./pages/HizmetBolgelerimiz'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Loading component
const LoadingSpinner = () => (
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '50vh' 
  }}>
    <CircularProgress color="primary" size={60} />
  </Box>
);

const theme = createTheme({
  palette: {
    primary: {
      main: '#a80000', // Kırmızı tonu
    },
    secondary: {
      main: '#000000', // Siyah
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 700 },
    h2: { fontSize: '2rem', fontWeight: 600 },
    h3: { fontSize: '1.75rem', fontWeight: 600 },
    h4: { fontSize: '1.5rem', fontWeight: 600 },
    h5: { fontSize: '1.25rem', fontWeight: 600 },
    h6: { fontSize: '1rem', fontWeight: 600 },
    body1: { fontSize: '1rem' },
    body2: { fontSize: '0.875rem' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    // Mobile performance optimizations
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: '#f0f0f0',
        },
      },
    },
  },
  // Performance optimizations
  shape: {
    borderRadius: 8,
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
});

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <ScrollToTop />
        {!isAdminRoute && <Navbar />}
        <Box sx={{ minHeight: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column' }}>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:categorySlug/:subCategorySlug/:productName" element={<ProductDetail />} />
              <Route path="/products/:categorySlug/:productName" element={<ProductDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/hizmet-bolgelerimiz" element={<HizmetBolgelerimiz />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin/register" element={<Register />} />
              <Route path="/admin" element={
                <PrivateRoute>
                  <AdminLayout />
                </PrivateRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="slider" element={<AdminSliderManagement />} />
              </Route>
            </Routes>
          </Suspense>
        </Box>
        {!isAdminRoute && <Footer />}
        <WhatsAppFloatButton />
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
