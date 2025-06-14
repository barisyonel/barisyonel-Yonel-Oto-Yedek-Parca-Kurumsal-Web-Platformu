import { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  MenuItem,
  Box,
  Paper,
  Chip,
  Stack,
  Tooltip,
  Divider,
  Pagination,
  Fab,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
  Select,
  FormControl,
  InputLabel,
  Button
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import productsData from './ProductsData';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Sidebar from '../components/Sidebar';
import { debounce } from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import gorselImg1 from '../assets/gorsel.png';
import gorselImg2 from '../assets/gorsel1.png';
import gorselImg3 from '../assets/gorsel2.png';
import gorselImg4 from '../assets/gorsel3.png';

const PRODUCTS_PER_PAGE = 30;

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openBrands, setOpenBrands] = useState({});

  const brands = [
    { value: 'all', label: 'Tüm Markalar' },
    { value: 'karatas', label: 'Karataş Traktör' },
    { value: 'foton', label: 'Foton Traktör' },
    { value: 'mutlu', label: 'Mutlu Akü' },
    { value: 'iveco', label: 'Iveco' },
    { value: 'cnh industrial', label: 'CNH Industrial' },
    { value: 'valeo', label: 'Valeo' },
    { value: 'mga', label: 'MGA' },
    { value: 'dönmez', label: 'Dönmez' },
    { value: 'gmw', label: 'GMW' },
    { value: 'ayd', label: 'AYD' },
    { value: 'kraftvoll', label: 'Kraftvoll' },
    { value: 'braxis', label: 'Braxis' },
    { value: 'eker', label: 'Eker' },
    { value: 'veka', label: 'Veka' },
  ];

  // Alt kategoriler, markaya göre
  const subCategories = {
    karatas: ['T4 Serisi', 'T5 Serisi', 'Karataş Parts'],
    foton: ['FT Serisi', 'FTX Serisi', 'Lovol', 'Foton Parts', 'Lovol Parts'],
    mutlu: ['Binek', 'Ticari', 'Aksesuar'],
    iveco: ['Daily','Eurokargo', 'Erobus', 'Ducato', '120-14', '85-12', '65-9', '50NC'],
    'cnh industrial': ['Disk'],
    valeo: ['Set'],
    mga: ['Balata'],
    dönmez: ['Set'],
    gmw: ['Balata'],
    ayd: ['Balata'],
    kraftvoll: ['Balata'],
    braxis: ['Balata'],
    eker: ['Balata'],
    veka: ['Balata'],
  };

  // Debounce search
  const debouncedSetSearch = useMemo(() => debounce((val) => setDebouncedSearch(val), 300), []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedSetSearch(e.target.value);
  };

  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
    const matchesSubCategory = selectedSubCategory === 'all' || product.subCategory === selectedSubCategory;
    return matchesSearch && matchesBrand && matchesSubCategory;
  });

  // Sayfa numarasını URL'den al
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const [page, setPage] = useState(pageParam);

  // Sayfa değişince URL'yi güncelle
  const handlePageChange = (event, value) => {
    setPage(value);
    setSearchParams({ page: value });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Gösterilecek ürünleri hesapla
  const startIdx = (page - 1) * PRODUCTS_PER_PAGE;
  const endIdx = startIdx + PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIdx, endIdx);
  const pageCount = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const handleMobileFilterToggle = () => {
    setMobileFilterOpen(!mobileFilterOpen);
  };

  const handleBrandToggle = (brand) => {
    setOpenBrands((prev) => ({
      ...prev,
      [brand]: !prev[brand]
    }));
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ mt: 6, px: { xs: 0.5, md: 2 } }}>
      <Helmet>
        <title>Ürünlerimiz | Yönel Oto & Yedek Parça</title>
        <meta name="description" content="Yönel Oto & Yedek Parça ürün kataloğu. Karataş Traktör, Foton Traktör, Mutlu Akü ve Iveco yedek parçaları." />
        <meta property="og:title" content="Ürünlerimiz | Yönel Oto & Yedek Parça" />
        <meta property="og:description" content="Yönel Oto & Yedek Parça ürün kataloğu. Karataş Traktör, Foton Traktör, Mutlu Akü ve Iveco yedek parçaları." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yoneloto.com/products" />
      </Helmet>

      {/* Küçük Slider Alanı */}
      <Box sx={{ width: '100%', maxWidth: '100vw', overflow: 'hidden', mb: 4 }}>
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={3500}
          arrows={false}
        >
          {[0, 1, 2, 3].map((j) => (
            <Box key={j} sx={{ width: '100%', height: { xs: 220, md: 420 }, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#e3eafc' }}>
              <Box
                component="img"
                src={
                  j === 0 ? gorselImg1 :
                  j === 1 ? gorselImg2 :
                  j === 2 ? gorselImg3 :
                  gorselImg4
                }
                alt={`Slider görseli ${j+1}`}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 3,
                  boxShadow: 2,
                  display: 'block',
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Mobile Filter Button */}
      <Fab
        color="primary"
        aria-label="filter"
        onClick={handleMobileFilterToggle}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          display: { xs: 'flex', md: 'none' },
          zIndex: 1000,
        }}
      >
        <FilterListIcon />
      </Fab>

      {/* WhatsApp Button (All Devices) */}
      <Fab
        aria-label="whatsapp"
        href="https://wa.me/905542597273"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          position: 'fixed',
          bottom: { xs: 88, sm: 96, md: 32 },
          right: { xs: 16, sm: 24, md: 32 },
          zIndex: 2000,
          width: { xs: 48, sm: 56, md: 64 },
          height: { xs: 48, sm: 56, md: 64 },
          bgcolor: '#25D366',
          color: '#fff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          '&:hover': {
            bgcolor: '#1DA851',
            transform: 'scale(1.05)',
            boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
          },
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
      >
        <WhatsAppIcon sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} />
      </Fab>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="right"
        open={mobileFilterOpen}
        onClose={handleMobileFilterToggle}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 400 },
            p: 3,
            bgcolor: '#fff',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight={700} color="primary.main">
            Filtreleme
          </Typography>
          <IconButton onClick={handleMobileFilterToggle} color="primary">
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <List component="nav" sx={{ width: '100%' }}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => {
              setSelectedBrand('all');
              setSelectedSubCategory('all');
            }}>
              <ListItemText
                primary="Tüm Markalar"
                primaryTypographyProps={{
                  fontWeight: 600,
                  color: selectedBrand === 'all' ? 'primary.main' : 'text.primary'
                }}
              />
            </ListItemButton>
          </ListItem>
          {brands.filter(b => b.value !== 'all').map((brand) => (
            <div key={brand.value}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleBrandToggle(brand.value)}>
                  <ListItemText
                    primary={brand.label}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      color: selectedBrand === brand.value ? 'primary.main' : 'text.primary'
                    }}
                  />
                  {openBrands[brand.value] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={openBrands[brand.value]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {(subCategories[brand.value] || []).map((sub) => (
                    <ListItemButton
                      key={sub}
                      selected={selectedSubCategory === sub && selectedBrand === brand.value}
                      onClick={() => {
                        setSelectedBrand(brand.value);
                        setSelectedSubCategory(sub);
                      }}
                      sx={{ pl: 6 }}
                    >
                      <ListItemText primary={sub} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}
        </List>

        <Box sx={{ mt: 'auto', pt: 2 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleMobileFilterToggle}
            sx={{ py: 1.5 }}
          >
            Filtreleri Uygula
          </Button>
        </Box>
      </Drawer>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 800, mb: 1, color: 'darkred', letterSpacing: 1, fontSize: { xs: 22, md: 40 }, mt: { xs: 1, md: 0 } }}>
          Ürünlerimiz
        </Typography>
        <Divider sx={{ mb: 2, maxWidth: 240, width: '100%', mx: 'auto', borderColor: 'primary.main', borderBottomWidth: 2, borderRadius: 2 }} />
        <Box sx={{ mb: 2, width: '100%', display: 'flex', justifyContent: 'center' }}>
          <TextField
            variant="outlined"
            placeholder="Ürün ara..."
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ width: { xs: '100%', md: '25%' } }}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Sidebar
            brands={brands}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            subCategories={subCategories}
            selectedSubCategory={selectedSubCategory}
            setSelectedSubCategory={setSelectedSubCategory}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <div className="container-fluid">
            <div className="row g-4">
              {paginatedProducts.map((product) => (
                <div className="col-6 col-md-3 d-flex" key={product.id}>
                  <div
                    className="card flex-fill h-100 shadow-sm"
                    style={{ borderRadius: 20, cursor: 'pointer' }}
                    onClick={() => navigate(`/products/${product.name.replace(/ /g, '-').toLowerCase()}`)}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        height: 180,
                        background: '#f3f4f6',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="img-fluid"
                        style={{
                          maxHeight: '100%',
                          maxWidth: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    </div>
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title" style={{ fontWeight: 600, fontSize: 18 }}>
                        {product.name}
                      </h5>
                      <p className="card-text text-muted" style={{ fontSize: 14 }}>
                        {product.description}
                      </p>
                      <div className="mt-auto">
                        <span className="badge bg-secondary">{product.subCategory}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* Son satırı doldurmak için boş kartlar */}
              {(() => {
                const remainder = paginatedProducts.length % 4;
                const emptySlots = remainder === 0 ? 0 : 4 - remainder;
                return Array.from({ length: emptySlots }).map((_, idx) => (
                  <div className="col-6 col-md-3 d-flex" key={`empty-${idx}`} style={{ visibility: 'hidden' }}>
                    <div className="card h-100" />
                  </div>
                ));
              })()}
            </div>
          </div>
          {/* Pagination */}
          {pageCount > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination
                count={pageCount}
                page={page}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
                siblingCount={1}
                boundaryCount={1}
              />
            </div>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Products;