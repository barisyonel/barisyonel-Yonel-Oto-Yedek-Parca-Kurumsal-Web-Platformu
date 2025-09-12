import React, { useState, useCallback, memo } from 'react';
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Typography, 
  Container,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQItem = memo(({ question, answer, isActive, onToggle }) => (
  <Accordion 
    expanded={isActive} 
    onChange={onToggle}
    sx={{ 
      mb: 2,
      boxShadow: 2,
      '&:before': { display: 'none' },
      '&.Mui-expanded': {
        margin: '0 0 16px 0'
      }
    }}
  >
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      sx={{
        backgroundColor: '#f8f9fa',
        '&:hover': {
          backgroundColor: '#f0f0f0'
        },
        '&.Mui-expanded': {
          backgroundColor: '#e8f4f8'
        }
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
        {question}
      </Typography>
    </AccordionSummary>
    <AccordionDetails sx={{ backgroundColor: '#fff' }}>
      <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.6 }}>
        {answer}
      </Typography>
    </AccordionDetails>
  </Accordion>
));

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "Siparişimi nasıl takip edebilirim?",
      answer: "Siparişinizi takip etmek için sipariş numaranızı kullanarak bizimle iletişime geçebilir veya WhatsApp hattımızdan bilgi alabilirsiniz."
    },
    {
      question: "Ürün iadesi nasıl yapabilirim?",
      answer: "Ürün iadesi için 14 gün içinde bizimle iletişime geçmeniz gerekmektedir. Ürünün orijinal ambalajında ve hasarsız olması şarttır."
    },
    {
      question: "Ödeme seçenekleri nelerdir?",
      answer: "Banka havalesi ve nakit ödeme seçeneklerimiz mevcuttur. Kredi kartı ile ödeme seçeneği yakında eklenecektir."
    },
    {
      question: "Garanti koşulları nelerdir?",
      answer: "Tüm ürünlerimiz orijinal ve garantilidir. Garanti süresi ürün tipine göre değişiklik göstermektedir. Detaylı bilgi için iletişime geçebilirsiniz."
    },
    {
      question: "Kargo süreleri ne kadardır?",
      answer: "Siparişleriniz genellikle 1-3 iş günü içerisinde kargoya verilmektedir. Kargo süresi bölgenize göre 2-5 iş günü arasında değişmektedir."
    },
    {
      question: "Teknik destek alabilir miyim?",
      answer: "Evet, teknik destek için 7/24 müşteri hizmetlerimiz hizmetinizdedir. WhatsApp hattımızdan veya telefon ile bize ulaşabilirsiniz."
    }
  ];

  const toggleFAQ = useCallback((index) => {
    setActiveIndex(activeIndex === index ? null : index);
  }, [activeIndex]);

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography 
          variant="h2" 
          component="h2" 
          sx={{ 
            color: 'darkred', 
            fontWeight: 700, 
            fontSize: { xs: '1.8rem', md: '2.2rem' },
            mb: 3
          }}
        >
          Sıkça Sorulan Sorular
        </Typography>
      </Box>
      <Box>
        {faqData.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isActive={activeIndex === index}
            onToggle={() => toggleFAQ(index)}
          />
        ))}
      </Box>
    </Container>
  );
};

export default memo(FAQ); 