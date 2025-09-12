import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardMedia,
  Typography,
  Container,
  Grid,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import axios from 'axios';
import config from '../../config';

const API_BASE_URL = config.API_BASE_URL;
const SLIDER_SLOT_COUNT = 6;
const sliderPlaceholder = '/images/placeholder.png';

const SliderManagement = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(Array(SLIDER_SLOT_COUNT).fill(false));
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [selectedFiles, setSelectedFiles] = useState(Array(SLIDER_SLOT_COUNT).fill(null));

  // Slider slotlarını doldur (eksik varsa placeholder)
  const sliderSlots = Array.from({ length: SLIDER_SLOT_COUNT }).map((_, i) => images[i] || null);

  const token = localStorage.getItem('token');

  const fetchSliderImages = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/SliderImages`);
      setImages(res.data);
    } catch {
      setSnackbar({ open: true, message: 'Slider görselleri alınamadı.', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchSliderImages();
  }, []);

  const handleFileChange = (slotIdx, file) => {
    const updated = [...selectedFiles];
    updated[slotIdx] = file;
    setSelectedFiles(updated);
  };

  const handleUpload = async (slotIdx) => {
    if (!selectedFiles[slotIdx]) return;
    const isUpdate = !!sliderSlots[slotIdx];
    setUploading((prev) => prev.map((v, i) => (i === slotIdx ? true : v)));
    const formData = new FormData();
    formData.append('Image', selectedFiles[slotIdx]);
    try {
      if (isUpdate) {
        // Güncelleme: PUT ile ilgili id'ye yükle
        await axios.put(`${API_BASE_URL}/SliderImages/${sliderSlots[slotIdx].id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...(token && { Authorization: `Bearer ${token}` })
          }
        });
      } else {
        // Yeni ekleme: POST
        await axios.post(`${API_BASE_URL}/SliderImages`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...(token && { Authorization: `Bearer ${token}` })
          }
        });
      }
      setSnackbar({ open: true, message: `#${slotIdx + 1} slider görseli güncellendi.`, severity: 'success' });
      setSelectedFiles((prev) => prev.map((f, i) => (i === slotIdx ? null : f)));
      fetchSliderImages();
    } catch {
      setSnackbar({ open: true, message: 'Yükleme başarısız.', severity: 'error' });
    } finally {
      setUploading((prev) => prev.map((v, i) => (i === slotIdx ? false : v)));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" mb={3}>Slider Yönetimi</Typography>
      <Grid container spacing={3} justifyContent="center">
        {Array.from({ length: SLIDER_SLOT_COUNT }).map((_, idx) => (
                          <Grid xs={12} sm={6} md={4} key={idx}>
            <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="subtitle1" fontWeight={700} mb={1}>
                {`#${idx + 1} Slider Alanı`}
              </Typography>
              <CardMedia
                component="img"
                height="160"
                image={sliderSlots[idx]?.imageUrl || sliderSlots[idx]?.ImageUrl || sliderPlaceholder}
                alt={`Slider ${idx + 1}`}
                sx={{ objectFit: 'cover', borderRadius: 2, mb: 2, width: '100%', minHeight: 160, bgcolor: '#f3f3f3' }}
              />
              <Button
                variant="contained"
                component="label"
                disabled={uploading[idx]}
                sx={{ mb: 1 }}
              >
                {sliderSlots[idx] ? 'Değiştir' : 'Yükle'}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={e => handleFileChange(idx, e.target.files[0])}
                />
              </Button>
              {selectedFiles[idx] && (
                <Box sx={{ mb: 1 }}>
                  <img
                    src={URL.createObjectURL(selectedFiles[idx])}
                    alt="Preview"
                    style={{ maxWidth: '100%', maxHeight: '100px', objectFit: 'contain' }}
                  />
                </Box>
              )}
              {selectedFiles[idx] && (
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => handleUpload(idx)}
                  disabled={uploading[idx]}
                  sx={{ mb: 1 }}
                >
                  {uploading[idx] ? <CircularProgress size={20} /> : 'Kaydet'}
                </Button>
              )}
              {sliderSlots[idx]?.imageUrl && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, wordBreak: 'break-all' }}>
                  {sliderSlots[idx].imageUrl}
                </Typography>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SliderManagement; 