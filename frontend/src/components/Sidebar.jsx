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

const ModernSidebar = ({
  brands,
  selectedBrand,
  setSelectedBrand,
  subCategories,
  selectedSubCategory,
  setSelectedSubCategory
}) => {
  const [openBrands, setOpenBrands] = useState({});
  const sidebarRef = useRef(null);
  const [sidebarMaxHeight, setSidebarMaxHeight] = useState('calc(100vh - 80px)');

  const handleBrandToggle = (brand) => {
    setOpenBrands((prev) => ({
      ...prev,
      [brand]: !prev[brand]
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById('footer');
      if (!footer || !sidebarRef.current) return;

      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (footerRect.top < windowHeight) {
        const overlap = windowHeight - footerRect.top;
        setSidebarMaxHeight(`calc(100vh - 80px - ${overlap}px)`);
      } else {
        setSidebarMaxHeight('calc(100vh - 80px)');
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <Box
      ref={sidebarRef}
      sx={{
        position: 'sticky',
        top: '80px',
        maxHeight: sidebarMaxHeight,
        overflowY: 'auto',
        width: 260,
        background: 'transparent',
        borderRight: 'none',
        boxShadow: 'none',
        scrollbarWidth: 'thin',
        scrollbarColor: '#bdbdbd #ffffff',
        p: 2,
        pt: 5,
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
            onClick={() => {
              setSelectedBrand('all');
              setSelectedSubCategory('all');
            }}
          >
            <StoreIcon sx={{ mr: 1 }} />
            <ListItemText primary="Tüm Markalar" />
          </ListItemButton>
        </ListItem>
        {brands.filter(b => b.value !== 'all').map((brand) => (
          <div key={brand.value}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleBrandToggle(brand.value)}>
                <CategoryIcon sx={{ mr: 1 }} />
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
    </Box>
  );
};

export default ModernSidebar;