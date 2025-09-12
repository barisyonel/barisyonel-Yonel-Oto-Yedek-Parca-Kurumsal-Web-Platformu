import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Chip, Button, Stack, Table, TableBody, TableCell, TableRow } from '@mui/material';
import productsData from './ProductsData'; // Ürün verisini dışarı alacağız
import { Helmet } from 'react-helmet-async';

const ProductDetail = () => {
  const { productName } = useParams();
  const navigate = useNavigate();
  const product = productsData.find(p => p.name.replace(/ /g, '-').toLowerCase() === productName);

  if (!product) {
    return <Typography sx={{ mt: 8, textAlign: 'center' }}>Ürün bulunamadı.</Typography>;
  }

  // Örnek teknik özellikler
  const teknikOzellikler = [
    { label: 'Marka', value: product.brand.toUpperCase() },
    { label: 'Uyumlu Modeller', value: product.subCategory },
    { label: 'Stok', value: 'Var' },
  ];

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 8, p: 2 }}>
      <Helmet>
        <title>{product.name} | Yönel Oto & Yedek Parça</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.name + ' | Yönel Oto & Yedek Parça'} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
      </Helmet>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
          <Box component="img" src={product.image} alt={product.name} sx={{ width: 260, height: 260, objectFit: 'contain', bgcolor: '#f3f4f6', borderRadius: 3, mb: { xs: 2, md: 0 } }} />
          <Box sx={{ flex: 1 }}>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <Chip label={product.brand.toUpperCase()} color="primary" />
              <Chip label={product.subCategory} color="secondary" />
            </Stack>
            <Typography variant="h4" fontWeight={700} gutterBottom>{product.name}</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>{product.description}</Typography>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mt: 3, mb: 1 }}>Teknik Özellikler</Typography>
            <Table size="small" sx={{ mb: 2, maxWidth: 400 }}>
              <TableBody>
                {teknikOzellikler.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', border: 0 }}>{row.label}</TableCell>
                    <TableCell sx={{ border: 0 }}>{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate(-1)}>Geri Dön</Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProductDetail; 