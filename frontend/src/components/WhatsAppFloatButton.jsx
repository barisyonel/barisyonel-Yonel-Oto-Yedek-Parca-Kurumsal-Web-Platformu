import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Fab } from '@mui/material';

const WhatsAppFloatButton = () => (
  <Fab
    aria-label="whatsapp"
    href="https://wa.me/05542597273"
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
);

export default WhatsAppFloatButton; 