import React, { useState, useEffect, useMemo } from 'react';
import { Box, Skeleton } from '@mui/material';

const ImageOptimizer = ({ 
  src, 
  alt, 
  width = '100%', 
  height = 'auto', 
  sx = {}, 
  onClick,
  placeholder = '/images/placeholder.png',
  priority = false,
  ...props 
}) => {
  const [loading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState('');

  // WebP support detection with mobile optimization
  const supportsWebP = useMemo(() => {
    if (typeof window === 'undefined') return false;
    
    // Check if already cached
    if (window.webpSupport !== undefined) {
      return window.webpSupport;
    }
    
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const webpSupport = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    
    // Cache the result
    window.webpSupport = webpSupport;
    return webpSupport;
  }, []);

  // Optimized image source
  const optimizedSrc = useMemo(() => {
    if (!src) return placeholder;
    
    // If already WebP or SVG, return as is
    if (src.includes('.webp') || src.includes('.svg')) {
      return src;
    }
    
    // For local assets, try to use WebP version if supported
    if (supportsWebP && (src.includes('.png') || src.includes('.jpg') || src.includes('.jpeg'))) {
      // Try to get WebP version (this would require pre-converted images)
      const webpSrc = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      return webpSrc;
    }
    
    return src;
  }, [src, supportsWebP, placeholder]);

  useEffect(() => {
    if (optimizedSrc) {
      // Preload image for better UX
      const img = new Image();
      img.onload = () => setImgSrc(optimizedSrc);
      img.onerror = () => {
        // Fallback to original if WebP fails
        if (optimizedSrc !== src && src) {
          const fallbackImg = new Image();
          fallbackImg.onload = () => setImgSrc(src);
          fallbackImg.onerror = () => setImgSrc(placeholder);
          fallbackImg.src = src;
        } else {
          setImgSrc(placeholder);
        }
      };
      img.src = optimizedSrc;
    }
  }, [optimizedSrc, src, placeholder]);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    // Try fallback to original source
    if (imgSrc !== src && src) {
      setImgSrc(src);
    }
  };

  return (
    <Box sx={{ position: 'relative', width, height, ...sx }}>
      {loading && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
          sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            zIndex: 1,
            borderRadius: sx.borderRadius || 0
          }}
        />
      )}
      
      <Box
        component="img"
        src={imgSrc || placeholder}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        onClick={onClick}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: loading ? 'none' : 'block',
          transition: 'opacity 0.3s ease-in-out',
          opacity: loading ? 0 : 1,
          ...sx,
        }}
        {...props}
      />
    </Box>
  );
};

export default ImageOptimizer; 