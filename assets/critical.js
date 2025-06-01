// Performance monitoring and critical functionality
(() => {
  // Performance monitoring
  if ('performance' in window && 'PerformanceObserver' in window) {
    // Create performance observer
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        // Log Core Web Vitals
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
        if (entry.entryType === 'first-input') {
          console.log('FID:', entry.processingStart - entry.startTime);
        }
        if (entry.entryType === 'layout-shift') {
          console.log('CLS:', entry.value);
        }
      });
    });

    // Observe performance metrics
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
  }

  // Critical feature detection
  const features = {
    webp: 'image/webp',
    avif: 'image/avif',
    lazy: 'loading' in HTMLImageElement.prototype,
    intersectionObserver: 'IntersectionObserver' in window
  };

  // Add feature detection classes to HTML element
  const html = document.documentElement;
  Object.entries(features).forEach(([feature, test]) => {
    if (typeof test === 'string') {
      const image = new Image();
      image.onload = image.onerror = () => {
        html.classList.add(image.height === 2 ? `has-${feature}` : `no-${feature}`);
      };
      image.src = `data:${test};base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=`;
    } else {
      html.classList.add(test ? `has-${feature}` : `no-${feature}`);
    }
  });

  // Register service worker if available
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registration successful');
        })
        .catch(err => {
          console.error('ServiceWorker registration failed:', err);
        });
    });
  }
})();

// Critical JavaScript functions
document.addEventListener('DOMContentLoaded', function() {
  // Initialize responsive navigation
  const mobileMenuButton = document.querySelector('[data-mobile-menu-button]');
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', function() {
      document.body.classList.toggle('mobile-menu-open');
    });
  }

  // Handle image loading optimization
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    if ('loading' in HTMLImageElement.prototype) {
      img.loading = 'lazy';
      if (img.dataset.sizes) {
        img.sizes = img.dataset.sizes;
      }
      if (img.width && img.height) {
        img.style.aspectRatio = `${img.width} / ${img.height}`;
      }
    }
  });
}); 