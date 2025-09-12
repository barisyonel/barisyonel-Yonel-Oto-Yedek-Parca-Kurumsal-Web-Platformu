import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Typography,
  Divider,
  Box
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CategoryIcon from '@mui/icons-material/Category';
import StoreIcon from '@mui/icons-material/Store';
import { useState, useRef, useEffect } from 'react';

const Sidebar = ({ brands, categories, selectedBrand, selectedSubCategory, setSelectedBrand, onBrandSelect, onSubCategorySelect, onSearch, searchQuery }) => {
  const [open, setOpen] = useState({});
  const sidebarRef = useRef(null);

  // Marka ID'sine göre alt kategorilerin açılıp kapanmasını kontrol et
  const handleClick = (brandId) => {
    setOpen(prevOpen => ({
      ...prevOpen,
      [brandId]: !prevOpen[brandId],
    }));
  };

  // Kategori seçildiğinde alt kategorileri otomatik aç
  useEffect(() => {
    if (selectedBrand !== 'all') {
      setOpen(prev => ({
        ...prev,
        [selectedBrand]: true
      }));
    }
  }, [selectedBrand]);

  // Scroll kontrolü artık Paper bileşeni tarafından yapılıyor

  return (
    <Box
      ref={sidebarRef}
      sx={{
        width: '100%',
        background: 'transparent',
        scrollbarWidth: 'thin',
        scrollbarColor: '#bdbdbd #ffffff',
      }}
    >
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        Tüm Markalar
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedBrand === 'all'}
            onClick={() => setSelectedBrand('all')}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                }
              }
            }}
          >
            <CategoryIcon sx={{ mr: 1 }} />
            <ListItemText primary="Tüm Ürünler" />
          </ListItemButton>
        </ListItem>
        {(brands || categories || []).map((brand) => (
          <Box key={brand.id}>
            <ListItem disablePadding>
              <ListItemButton 
                onClick={() => {
                  handleClick(brand.id);
                  // Ana kategoriye tıklandığında sadece alt kategorileri aç/kapat, ürün arama
                }}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  }
                }}
              >
                <StoreIcon sx={{ mr: 1 }} />
                <ListItemText
                  primary={brand.name}
                  primaryTypographyProps={{
                    fontWeight: 600,
                    color: 'text.primary'
                  }}
                />
                {open[brand.id] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open[brand.id]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {/* Alt kategoriler */}
                {Array.isArray(brand.subCategories) && brand.subCategories.length > 0 && (
                  <>
                    {brand.subCategories.map((sub) => {
                      const subName = typeof sub === 'string' ? sub : sub.name;
                      return (
                        <ListItemButton
                          key={subName}
                          sx={{ 
                            pl: 4,
                            borderRadius: 1,
                            mb: 0.5,
                            '&.Mui-selected': {
                              backgroundColor: 'primary.main',
                              color: 'white',
                              '&:hover': {
                                backgroundColor: 'primary.dark',
                              }
                            }
                          }}
                          onClick={() => setSelectedSubCategory(brand.id, subName)}
                          selected={selectedBrand === brand.id.toString() && selectedSubCategory === subName}
                        >
                          <ListItemText primary={subName} />
                        </ListItemButton>
                      );
                    })}
                  </>
                )}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;