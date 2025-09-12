// Performance monitoring utilities for mobile optimization

// Core Web Vitals monitoring
export const monitorCoreWebVitals = () => {
  if ('PerformanceObserver' in window) {
    try {
      // LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
        
        // Send to analytics if needed
        if (window.gtag) {
          window.gtag('event', 'LCP', {
            value: Math.round(lastEntry.startTime),
            event_category: 'Web Vitals',
            event_label: 'LCP'
          });
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // FID (First Input Delay)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('FID:', entry.processingStart - entry.startTime);
          
          if (window.gtag) {
            window.gtag('event', 'FID', {
              value: Math.round(entry.processingStart - entry.startTime),
              event_category: 'Web Vitals',
              event_label: 'FID'
            });
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // CLS (Cumulative Layout Shift)
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        console.log('CLS:', clsValue);
        
        if (window.gtag) {
          window.gtag('event', 'CLS', {
            value: Math.round(clsValue * 1000) / 1000,
            event_category: 'Web Vitals',
            event_label: 'CLS'
          });
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.warn('Performance monitoring failed:', error);
    }
  }
};

// Mobile performance monitoring
export const monitorMobilePerformance = () => {
  // Connection type monitoring
  if ('connection' in navigator) {
    const connection = navigator.connection;
    console.log('Connection type:', connection.effectiveType);
    console.log('Downlink:', connection.downlink);
    console.log('RTT:', connection.rtt);
    
    // Adjust quality based on connection
    if (connection.effectiveType === '2g' || connection.effectiveType === '3g') {
      document.documentElement.classList.add('slow-connection');
    }
  }

  // Memory monitoring
  if ('memory' in performance) {
    const memory = performance.memory;
    console.log('Memory usage:', {
      used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
      total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
      limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
    });
  }

  // Battery monitoring
  if ('getBattery' in navigator) {
    navigator.getBattery().then((battery) => {
      console.log('Battery level:', Math.round(battery.level * 100) + '%');
      console.log('Charging:', battery.charging);
      
      // Adjust performance based on battery
      if (battery.level < 0.2) {
        document.documentElement.classList.add('low-battery');
      }
    });
  }
};

// Image loading performance
export const monitorImagePerformance = () => {
  const images = document.querySelectorAll('img');
  let loadedImages = 0;
  const totalImages = images.length;
  
  const imageLoadTimes = [];
  
  images.forEach((img) => {
    const startTime = performance.now();
    
    img.addEventListener('load', () => {
      const loadTime = performance.now() - startTime;
      imageLoadTimes.push(loadTime);
      loadedImages++;
      
      console.log(`Image loaded in ${Math.round(loadTime)}ms:`, img.src);
      
      if (loadedImages === totalImages) {
        const avgLoadTime = imageLoadTimes.reduce((a, b) => a + b, 0) / totalImages;
        console.log(`Average image load time: ${Math.round(avgLoadTime)}ms`);
        
        if (window.gtag) {
          window.gtag('event', 'image_performance', {
            value: Math.round(avgLoadTime),
            event_category: 'Performance',
            event_label: 'Image Loading'
          });
        }
      }
    });
    
    img.addEventListener('error', () => {
      console.warn('Image failed to load:', img.src);
      loadedImages++;
    });
  });
};

// Bundle size monitoring
export const monitorBundleSize = () => {
  if ('performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation) {
      const transferSize = navigation.transferSize;
      const decodedBodySize = navigation.decodedBodySize;
      
      console.log('Bundle size:', {
        transfer: Math.round(transferSize / 1024) + ' KB',
        decoded: Math.round(decodedBodySize / 1024) + ' KB',
        compression: Math.round((1 - transferSize / decodedBodySize) * 100) + '%'
      });
      
      if (window.gtag) {
        window.gtag('event', 'bundle_size', {
          value: Math.round(transferSize / 1024),
          event_category: 'Performance',
          event_label: 'Bundle Size'
        });
      }
    }
  }
};

// Initialize all monitoring
export const initializePerformanceMonitoring = () => {
  // Wait for page to load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      monitorCoreWebVitals();
      monitorMobilePerformance();
      monitorImagePerformance();
      monitorBundleSize();
    });
  } else {
    monitorCoreWebVitals();
    monitorMobilePerformance();
    monitorImagePerformance();
    monitorBundleSize();
  }
};

export default {
  monitorCoreWebVitals,
  monitorMobilePerformance,
  monitorImagePerformance,
  monitorBundleSize,
  initializePerformanceMonitoring
};
