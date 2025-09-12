import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { apiFetch } from '../../utils/api';
import Pagination from '@mui/material/Pagination';
import config from '../../config';
import { debounce } from 'lodash';

const API_BASE_URL = config.API_BASE_URL;

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    subCategoryId: '',
    image: null,
  });
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [dialogError, setDialogError] = useState(null);
  const [objectUrl, setObjectUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSetSearch = useMemo(() => debounce(setDebouncedSearch, 500), []);

  useEffect(() => {
    fetchProducts(currentPage, debouncedSearch);
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    fetchCategories();

    return () => {
      debouncedSetSearch.cancel();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [debouncedSetSearch, objectUrl]);

  const fetchProducts = async (page = 1, search = '') => {
    try {
      setError(null);
      let url = `${API_BASE_URL}/Products?page=${page}&limit=30`;
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }
      const response = await apiFetch(url);
      if (!response.ok) {
        throw new Error('Ürünler yüklenirken bir hata oluştu');
      }
      const data = await response.json();
      setProducts(Array.isArray(data.products) ? data.products : []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      setError(error.message);
      setProducts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await apiFetch(`${API_BASE_URL}/Categories`);
      if (!response.ok) {
        throw new Error('Kategoriler yüklenirken bir hata oluştu');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleOpenDialog = (product = null) => {
    setDialogError(null);
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl(null);
    }
    if (product) {
      setSelectedProduct(product);
      setFormData({
        name: product.name || '',
        description: product.description || '',
        categoryId: product.categoryId ? String(product.categoryId) : '',
        subCategoryId: product.subCategoryId ? String(product.subCategoryId) : '',
        image: null,
      });
      setImagePreview(product.imageUrl || '');
    } else {
      setSelectedProduct(null);
      setFormData({ name: '', description: '', categoryId: '', subCategoryId: '', image: null });
      setImagePreview('');
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
    setFormData({ name: '', description: '', categoryId: '', subCategoryId: '', image: null });
    setImagePreview('');
    setDialogError(null);
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'categoryId' ? { subCategoryId: '' } : {}),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl(null);
    }
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setObjectUrl(url);
    } else {
      setImagePreview('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setDialogError(null);
    try {
      const url = selectedProduct
        ? `${API_BASE_URL}/Products/${selectedProduct.id}`
        : `${API_BASE_URL}/Products`;
      const method = selectedProduct ? 'PUT' : 'POST';
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      if (formData.categoryId) formDataToSend.append('categoryId', formData.categoryId);
      if (formData.subCategoryId) formDataToSend.append('subCategoryId', formData.subCategoryId);
      if (formData.image) formDataToSend.append('image', formData.image);
      const response = await apiFetch(url, {
        method,
        body: formDataToSend,
      });
      if (!response.ok) {
        throw new Error('İşlem başarısız oldu');
      }
      await fetchProducts(currentPage, debouncedSearch);
      handleCloseDialog();
    } catch (err) {
      setDialogError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await apiFetch(`${API_BASE_URL}/Products/${productToDelete.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Ürün silinirken bir hata oluştu');
      setProducts(products.filter(p => p.id !== productToDelete.id));
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const getSubCategories = (categoryId) => {
    const cat = categories.find((c) => String(c.id) === String(categoryId));
    return cat && cat.subCategories ? cat.subCategories : [];
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
    setIsSearching(true);
    debouncedSetSearch(value);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Ürün Yönetimi
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
            >
              Yeni Ürün Ekle
            </Button>
          </Box>

          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Ürün Adına Göre Ara..."
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {isSearching && <CircularProgress color="inherit" size={20} />}
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {!Array.isArray(products) || products.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6">Henüz ürün bulunmamaktadır.</Typography>
            </Box>
          ) : (
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'darkred' }}>
                    <TableCell sx={{ color: 'white', fontWeight: 600 }}>ID</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 600 }}>Resim</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 600 }}>Ürün Adı</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 600 }}>Açıklama</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 600 }}>Marka</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 600 }}>Alt Kategori</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 600 }}>İşlemler</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id} hover>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>
                        <Box
                          component="img"
                          src={product.imageUrl}
                          alt={product.name}
                          sx={{ width: 60, height: 60, objectFit: 'contain', borderRadius: 1 }}
                        />
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell>
                        {categories.find(c => c.id === product.categoryId)?.name || 'Belirtilmemiş'}
                      </TableCell>
                      <TableCell>
                        {product.subCategory?.name || 'Belirtilmemiş'}
                      </TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleOpenDialog(product)} sx={{ mr: 1 }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDeleteClick(product)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
                sx={{
                  '& .MuiPaginationItem-root': {
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    minWidth: 40,
                    height: 40,
                    borderRadius: 2,
                    '&.Mui-selected': {
                      bgcolor: 'darkred',
                      color: 'white',
                      '&:hover': {
                        bgcolor: '#a80000',
                      },
                    },
                  },
                }}
              />
            </Box>
          )}
        </Paper>

        {/* Ürün Ekle/Güncelle Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedProduct ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              {dialogError && <Alert severity="error" sx={{ mb: 2 }}>{dialogError}</Alert>}
              <TextField
                autoFocus
                margin="dense"
                name="name"
                placeholder="Ürün Adı"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <TextField
                margin="dense"
                name="description"
                placeholder="Açıklama"
                type="text"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={formData.description}
                onChange={handleInputChange}
              />
              <FormControl fullWidth margin="dense" required>
                <InputLabel>Kategori</InputLabel>
                <Select
                  name="categoryId"
                  value={formData.categoryId}
                  label="Kategori"
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="">Seçiniz</MenuItem>
                  {categories.filter(c => !c.parentId).map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="dense" required>
                <InputLabel>Alt Kategori</InputLabel>
                <Select
                  name="subCategoryId"
                  value={formData.subCategoryId}
                  label="Alt Kategori"
                  onChange={handleInputChange}
                  disabled={!formData.categoryId}
                >
                  <MenuItem value="">Seçiniz</MenuItem>
                  {getSubCategories(formData.categoryId).map((sub) => (
                    <MenuItem key={sub.id} value={sub.id}>{sub.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="outlined" component="label" sx={{ mb: 2 }}>
                Bilgisayardan Resim Yükle
                <input type="file" accept="image/*" hidden onChange={handleFileChange} />
              </Button>
              {imagePreview && (
                <Box sx={{ mb: 2 }}>
                  <img src={imagePreview} alt="Önizleme" style={{ width: 120, height: 120, objectFit: 'contain', border: '1px solid #eee', borderRadius: 8 }} />
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>İptal</Button>
              <Button type="submit" variant="contained" disabled={uploading}>
                {selectedProduct ? 'Güncelle' : 'Ekle'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* Silme Onay Dialogu */}
        <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
          <DialogTitle>Ürünü Sil</DialogTitle>
          <DialogContent>
            <Typography>"{productToDelete?.name}" ürününü silmek istediğinizden emin misiniz?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel}>İptal</Button>
            <Button onClick={handleDeleteConfirm} color="error" variant="contained">Sil</Button>
          </DialogActions>
        </Dialog>
      </Container>
  );
};

export default AdminProducts; 