import React, { useState, useCallback, memo } from 'react';
import './FAQ.css';

const FAQItem = memo(({ question, answer, isActive, onToggle }) => (
  <div className={`faq-item ${isActive ? 'active' : ''}`}>
    <div className="faq-question" onClick={onToggle}>
      <h3>{question}</h3>
      <span className="faq-icon">
        {isActive ? '−' : '+'}
      </span>
    </div>
    <div className="faq-answer">
      <p>{answer}</p>
    </div>
  </div>
));

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "Ürünleriniz hakkında daha detaylı bilgi alabilir miyim?",
      answer: "Evet, ürünlerimiz hakkında detaylı bilgi almak için ürün sayfalarını ziyaret edebilir veya bizimle iletişime geçebilirsiniz."
    },
    {
      question: "Ödeme seçenekleriniz nelerdir?",
      answer: "Banka havalesi Ve Nakit Ödeme seçeneklerimiz mevcuttur."
    },
    {
      question: "Kargo süreleri ne kadardır?",
      answer: "Siparişleriniz genellikle 1-3 iş günü içerisinde kargoya verilmektedir."
    },
    {
      question: "Teknik destek alabilir miyim?",
      answer: "Evet, teknik destek için 7/24 müşteri hizmetlerimiz hizmetinizdedir."
    }
  ];

  const toggleFAQ = useCallback((index) => {
    setActiveIndex(activeIndex === index ? null : index);
  }, [activeIndex]);

  return (
    <div className="faq-container">
      <h2>Sıkça Sorulan Sorular</h2>
      <div className="faq-list">
        {faqData.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isActive={activeIndex === index}
            onToggle={() => toggleFAQ(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(FAQ); 