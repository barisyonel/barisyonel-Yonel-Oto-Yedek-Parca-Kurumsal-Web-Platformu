import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Pagination,
  Skeleton,
  Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

// Blog görselleri
import ducatoImage from '../assets/d.png';
import dailyImage from '../assets/dailly.png';
import karatasImage from '../assets/karat.png';
import lovolImage from '../assets/lovol.png';
import mutluImage from '../assets/mutluu.png';
import fotonImage from '../assets/foton.png';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Blog yazıları - SEO için optimize edilmiş
  const blogPosts = [
    {
              id: 1,
        title: 'Foton Traktör Yedek Parçaları: Kalite ve Uyumluluk Rehberi',
        excerpt: 'Foton traktör yedek parçaları seçerken dikkat edilmesi gerekenler, orijinal parça önemi ve uyumluluk kontrolleri hakkında detaylı bilgi.',
        content: 'Foton traktör yedek parçaları seçerken en önemli faktör, parçanın orijinal olması ve traktörünüzle tam uyumlu olmasıdır. Bu yazıda, doğru yedek parça seçimi için gerekli tüm bilgileri bulabilirsiniz.',
        image: fotonImage,
        category: 'Traktör Yedek Parça',
        author: 'Yönel Oto Yedek Parça',
                        publishDate: '2024-01-15',
                  slug: 'foton-traktor-yedek-parcalari-kalite-uyumluluk-rehberi',
      tags: ['Foton', 'Traktör', 'Yedek Parça', 'Kalite', 'Uyumluluk']
    },
    {
      id: 2,
      title: 'Iveco Daily Yedek Parçaları: Bakım ve Performans İpuçları',
      excerpt: 'Iveco Daily araçlarınızın performansını artırmak için yedek parça seçimi ve düzenli bakım önerileri.',
      content: 'Iveco Daily araçlarınızın uzun ömürlü olması ve optimum performans göstermesi için düzenli bakım ve kaliteli yedek parça kullanımı şarttır.',
                        image: dailyImage,
      category: 'Ticari Araç',
      author: 'Yönel Oto Uzmanları',
                        publishDate: '2024-01-10',
                  slug: 'iveco-daily-yedek-parcalari-bakim-performans-ipuclari',
      tags: ['Iveco', 'Daily', 'Ticari Araç', 'Bakım', 'Performans']
    },
    {
      id: 3,
      title: 'Mutlu Akü Seçimi: Doğru Akü Nasıl Seçilir?',
      excerpt: 'Mutlu akü çeşitleri, araç tipine göre akü seçimi ve akü bakımı hakkında kapsamlı rehber.',
      content: 'Doğru akü seçimi, aracınızın elektrik sisteminin verimli çalışması için kritik öneme sahiptir. Bu rehberde size en uygun aküyü nasıl seçeceğinizi anlatıyoruz.',
                        image: mutluImage,
      category: 'Akü',
      author: 'Yönel Oto Uzmanları',
                        publishDate: '2024-01-05',
                  slug: 'mutlu-aku-secimi-dogru-aku-nasil-secilir',
      tags: ['Mutlu Akü', 'Akü Seçimi', 'Elektrik Sistemi', 'Bakım']
    },
    {
      id: 4,
      title: 'Karataş Traktör Yedek Parçaları: Sürdürülebilir Tarım',
      excerpt: 'Karataş traktör yedek parçaları ile sürdürülebilir tarım uygulamaları ve verimlilik artırma yöntemleri.',
      content: 'Modern tarımda verimlilik artırmanın en önemli yollarından biri, kaliteli yedek parça kullanımı ve düzenli bakımdır.',
                        image: karatasImage,
      category: 'Traktör Yedek Parça',
      author: 'Yönel Oto Uzmanları',
                        publishDate: '2024-01-01',
                  slug: 'karatas-traktor-yedek-parcalari-surdurulebilir-tarim',
      tags: ['Karataş', 'Traktör', 'Tarım', 'Verimlilik', 'Sürdürülebilirlik']
    },
    {
      id: 5,
      title: 'Ducato Yedek Parçaları: Ticari Araç Bakım Rehberi',
      excerpt: 'Ducato araçlarınızın bakımı için gerekli yedek parçalar ve düzenli kontrol listesi.',
      content: 'Ducato araçlarınızın güvenli ve verimli çalışması için düzenli bakım ve kaliteli yedek parça kullanımı önemlidir.',
                        image: ducatoImage,
      category: 'Ticari Araç',
      author: 'Yönel Oto Uzmanları',
                        publishDate: '2023-12-28',
                  slug: 'ducato-yedek-parcalari-ticari-arac-bakim-rehberi',
      tags: ['Ducato', 'Ticari Araç', 'Bakım', 'Güvenlik', 'Verimlilik']
    },
    {
      id: 6,
      title: 'Lovol Traktör Yedek Parçaları: Modern Tarım Teknolojileri',
      excerpt: 'Lovol traktör yedek parçaları ile modern tarım teknolojilerini keşfedin ve verimliliğinizi artırın.',
      content: 'Lovol traktör yedek parçaları, modern tarım teknolojilerinin en iyi örneklerinden biridir.',
                        image: lovolImage,
      category: 'Traktör Yedek Parça',
      author: 'Yönel Oto Uzmanları',
                        publishDate: '2023-12-25',
                  slug: 'lovol-traktor-yedek-parcalari-modern-tarim-teknolojileri',
      tags: ['Lovol', 'Traktör', 'Modern Tarım', 'Teknoloji', 'Verimlilik']
    }
  ];

  // Arama fonksiyonu
  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Sayfalama
  const postsPerPage = 6;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Blog | Yönel Oto & Yedek Parça - Traktör, Ticari Araç ve Akü Rehberleri</title>
        <meta name="description" content="Foton traktör yedek parçaları, Iveco Daily yedek parçaları, Mutlu akü seçimi ve daha fazlası hakkında uzman yazıları. Kaliteli yedek parça kullanımı ve bakım rehberleri." />
        <meta name="keywords" content="foton traktör blog, iveco daily yedek parça, mutlu akü seçimi, karataş traktör, ducato yedek parça, lovol traktör, yedek parça rehberi, bakım ipuçları" />
        <meta name="author" content="Yönel Oto & Yedek Parça" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta property="og:title" content="Blog | Yönel Oto & Yedek Parça - Traktör, Ticari Araç ve Akü Rehberleri" />
        <meta property="og:description" content="Foton traktör yedek parçaları, Iveco Daily yedek parçaları, Mutlu akü seçimi ve daha fazlası hakkında uzman yazıları." />
        <meta property="og:type" content="blog" />
        <meta property="og:url" content="https://yonelotoyedekparca.com/blog" />
        <meta property="og:site_name" content="Yönel Oto & Yedek Parça" />
        <meta property="og:locale" content="tr_TR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog | Yönel Oto & Yedek Parça" />
        <meta name="twitter:description" content="Traktör, ticari araç ve akü rehberleri" />
        <link rel="canonical" href="https://yonelotoyedekparca.com/blog" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Yönel Oto Blog",
            "description": "Traktör, ticari araç ve akü rehberleri",
            "url": "https://yonelotoyedekparca.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Yönel Oto & Yedek Parça"
            },
            "blogPost": blogPosts.map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "author": {
                "@type": "Person",
                "name": post.author
              },
              "datePublished": post.publishDate,
              "dateModified": post.publishDate,
              "image": post.image,
              "url": `https://yonelotoyedekparca.com/blog/${post.slug}`
            }))
          })}
        </script>
      </Helmet>

      <Container maxWidth={false} disableGutters sx={{ mt: 6, px: { xs: 2, md: 8 } }}>
        <Breadcrumb customBreadcrumbs={[{ label: 'Blog', path: '/blog' }]} />
        
        {/* Ana Başlık - H1 */}
        <Typography 
          variant="h1" 
          component="h1"
          align="center" 
          gutterBottom 
          sx={{ 
            fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
            fontWeight: 900,
            color: 'darkred',
            mb: 3,
            lineHeight: 1.2,
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Yönel Oto Blog
        </Typography>

        {/* Alt Başlık - H2 */}
        <Typography 
          variant="h2" 
          component="h2"
          align="center" 
          sx={{ 
            fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
            color: 'text.secondary',
            mb: 6,
            maxWidth: '800px',
            mx: 'auto',
            lineHeight: 1.6
          }}
        >
          Traktör, Ticari Araç ve Akü Yedek Parçaları Hakkında Uzman Rehberleri
        </Typography>

        {/* Arama Bölümü */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Blog yazılarında ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: 600 }}
          />
        </Box>

        {/* Blog Yazıları Grid */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {currentPosts.map((post) => (
            <Grid item xs={12} sm={6} lg={4} key={post.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  }
                }}
              >
                {/* CLS Prevention: Fixed aspect ratio container */}
                <Box sx={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                  <Box
                    component="img"
                    src={post.image}
                    alt={post.title}
                    sx={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      position: 'absolute',
                      top: 0,
                      left: 0
                    }}
                    onError={(e) => {
                      e.target.src = '/images/placeholder.png';
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Kategori Chip */}
                  <Chip 
                    label={post.category} 
                    color="primary" 
                    size="small" 
                    sx={{ mb: 2, alignSelf: 'flex-start' }}
                  />
                  
                  {/* Başlık - H3 */}
                  <Typography 
                    variant="h3" 
                    component="h3"
                    gutterBottom 
                    sx={{ 
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      mb: 2,
                      lineHeight: 1.3,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {post.title}
                  </Typography>
                  
                  {/* Özet */}
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 3,
                      flexGrow: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: 1.6
                    }}
                  >
                    {post.excerpt}
                  </Typography>
                  
                                                {/* Meta Bilgiler */}
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, fontSize: '0.875rem', color: 'text.secondary' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <PersonIcon sx={{ fontSize: 16 }} />
                                  {post.author}
                                </Box>
                              </Box>
                              
                              {/* Tags */}
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 3 }}>
                                {post.tags.slice(0, 3).map((tag, index) => (
                                  <Chip 
                                    key={index} 
                                    label={tag} 
                                    size="small" 
                                    variant="outlined"
                                    sx={{ fontSize: '0.75rem' }}
                                  />
                                ))}
                              </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Sayfalama */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
            <Pagination 
              count={totalPages} 
              page={currentPage} 
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        )}

        {/* Sonuç Bulunamadı */}
        {filteredPosts.length === 0 && searchTerm && (
          <Alert severity="info" sx={{ textAlign: 'center', mb: 4 }}>
            "{searchTerm}" ile ilgili blog yazısı bulunamadı. Lütfen farklı anahtar kelimeler deneyin.
          </Alert>
        )}

        {/* Kategori Önerileri */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" component="h4" gutterBottom sx={{ fontWeight: 700, color: 'darkred', mb: 3 }}>
            Popüler Kategoriler
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            {['Traktör Yedek Parça', 'Ticari Araç', 'Akü', 'Bakım Rehberi', 'Teknoloji'].map((category) => (
              <Button
                key={category}
                variant="outlined"
                color="primary"
                component={RouterLink}
                to={`/blog?category=${category}`}
                sx={{ fontWeight: 600 }}
              >
                {category}
              </Button>
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Blog;
