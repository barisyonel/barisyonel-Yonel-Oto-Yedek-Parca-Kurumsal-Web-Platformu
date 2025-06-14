import { Container, Typography, Paper, Grid, Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <Container maxWidth={false} disableGutters sx={{ mt: 6, px: { xs: 2, md: 8 } }}>
      <Helmet>
        <title>Hakkımızda | Yönel Oto & Yedek Parça</title>
        <meta name="description" content="Yönel Oto & Yedek Parça hakkında bilgi. 50 yılı aşkın tecrübemizle traktör, akü ve ticari araç yedek parçada güvenilir çözüm ortağınız." />
        <meta property="og:title" content="Hakkımızda | Yönel Oto & Yedek Parça" />
        <meta property="og:description" content="Yönel Oto & Yedek Parça hakkında bilgi. 20 yılı aşkın tecrübemizle traktör, akü ve ticari araç yedek parçada güvenilir çözüm ortağınız." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yoneloto.com/about" />
      </Helmet>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 800, mb: 2, color: 'darkred', letterSpacing: 1, fontSize: { xs: 32, md: 40 } }}>
        Hakkımızda
      </Typography>
      <Paper elevation={3} sx={{ p: { xs: 3, md: 6 }, borderRadius: 3, maxWidth: 900, mx: 'auto', textAlign: 'center' }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          50 yılı aşkın tecrübemizle Karataş Traktör, Foton Traktör, Mutlu Akü ve Iveco gibi önde gelen markaların yedek parçalarını sizlere sunuyoruz. Müşteri memnuniyeti ve kaliteli hizmet önceliğimizdir.
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Yönel Oto & Yedek Parça olarak, müşterilerimize en kaliteli ürünleri en uygun fiyatlarla sunmayı hedefliyoruz. Geniş ürün yelpazemiz ve uzman kadromuzla, traktör, akü ve ticari araç yedek parça ihtiyaçlarınızda yanınızdayız.
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Misyonumuz, müşterilerimize güvenilir ve kaliteli hizmet sunmak, vizyonumuz ise sektörde lider konuma gelmektir.
        </Typography>
      </Paper>
    </Container>
  );
};

export default About; 