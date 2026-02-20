// Performance monitoring and optimization utilities

export const performanceConfig = {
  // Performance budgets
  budgets: {
    bundle: {
      javascript: 300 * 1024, // 300KB
      css: 60 * 1024,         // 60KB
      total: 500 * 1024,      // 500KB total
    },
    metrics: {
      FCP: 1800,  // First Contentful Paint
      LCP: 2500,  // Largest Contentful Paint
      FID: 100,   // First Input Delay
      CLS: 0.1,   // Cumulative Layout Shift
      TTFB: 600,  // Time to First Byte
    }
  },

  // Resource hints
  resourceHints: {
    preconnect: [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ],
    dnsPrefetch: [
      'https://stripe.com',
      'https://checkout.stripe.com',
    ],
  },

  // Lazy loading thresholds
  lazyLoading: {
    rootMargin: '50px 0px',
    threshold: 0.01,
  },

  // Image optimization settings
  images: {
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96],
    formats: ['webp', 'avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
  },
};

// Web Vitals reporter
export function reportWebVitals(metric: any) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating || 'N/A',
    });
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType,
    });

    // Use sendBeacon for reliability
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics/vitals', body);
    } else {
      // Fallback to fetch
      fetch('/api/analytics/vitals', {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      });
    }
  }

  // Check against performance budgets
  checkPerformanceBudget(metric);
}

// Check if metrics exceed budgets
function checkPerformanceBudget(metric: any) {
  const budget = performanceConfig.budgets.metrics[metric.name as keyof typeof performanceConfig.budgets.metrics];

  if (budget && metric.value > budget) {
    console.warn(
      `Performance budget exceeded for ${metric.name}: ${metric.value}ms > ${budget}ms`
    );
  }
}

// Resource loading optimizer
export class ResourceOptimizer {
  private observer?: IntersectionObserver;
  private loadedResources = new Set<string>();

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeObserver();
    }
  }

  private initializeObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            const src = element.dataset.src;

            if (src && !this.loadedResources.has(src)) {
              this.loadResource(element, src);
              this.loadedResources.add(src);
              this.observer?.unobserve(element);
            }
          }
        });
      },
      performanceConfig.lazyLoading
    );
  }

  private loadResource(element: HTMLElement, src: string) {
    if (element instanceof HTMLImageElement) {
      element.src = src;
    } else if (element instanceof HTMLIFrameElement) {
      element.src = src;
    } else {
      // Dynamic import for JS modules
      import(/* webpackPrefetch: true */ src);
    }
  }

  observe(element: HTMLElement) {
    this.observer?.observe(element);
  }

  disconnect() {
    this.observer?.disconnect();
  }
}

// Memory leak detector
export class MemoryLeakDetector {
  private initialMemory?: number;
  private measurements: number[] = [];
  private threshold = 50 * 1024 * 1024; // 50MB threshold

  start() {
    if ('memory' in performance) {
      this.initialMemory = (performance as any).memory.usedJSHeapSize;
      this.monitor();
    }
  }

  private monitor() {
    if (!('memory' in performance)) return;

    const interval = setInterval(() => {
      const currentMemory = (performance as any).memory.usedJSHeapSize;
      this.measurements.push(currentMemory);

      // Keep only last 10 measurements
      if (this.measurements.length > 10) {
        this.measurements.shift();
      }

      // Check for memory leak
      if (this.initialMemory && currentMemory - this.initialMemory > this.threshold) {
        console.warn('Potential memory leak detected:', {
          initial: `${(this.initialMemory / 1024 / 1024).toFixed(2)}MB`,
          current: `${(currentMemory / 1024 / 1024).toFixed(2)}MB`,
          increase: `${((currentMemory - this.initialMemory) / 1024 / 1024).toFixed(2)}MB`,
        });
      }
    }, 10000); // Check every 10 seconds

    // Clean up after 5 minutes
    setTimeout(() => clearInterval(interval), 5 * 60 * 1000);
  }

  getStats() {
    if (!('memory' in performance)) return null;

    const memory = (performance as any).memory;
    return {
      used: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
      total: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
      limit: `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)}MB`,
    };
  }
}

// Bundle size analyzer helper
export function analyzeBundleSize() {
  if (typeof window === 'undefined') return;

  // Get all loaded scripts
  const scripts = Array.from(document.querySelectorAll('script[src]'));
  const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));

  const resources = [
    ...scripts.map(s => ({ url: (s as HTMLScriptElement).src, type: 'js' })),
    ...stylesheets.map(s => ({ url: (s as HTMLLinkElement).href, type: 'css' })),
  ];

  // Analyze resource sizes
  Promise.all(
    resources.map(async (resource) => {
      try {
        const response = await fetch(resource.url, { method: 'HEAD' });
        const size = response.headers.get('content-length');
        return {
          ...resource,
          size: size ? parseInt(size) : 0,
        };
      } catch {
        return { ...resource, size: 0 };
      }
    })
  ).then((results) => {
    const totalJs = results
      .filter(r => r.type === 'js')
      .reduce((sum, r) => sum + r.size, 0);
    const totalCss = results
      .filter(r => r.type === 'css')
      .reduce((sum, r) => sum + r.size, 0);

    console.log('Bundle Size Analysis:', {
      javascript: `${(totalJs / 1024).toFixed(2)}KB`,
      css: `${(totalCss / 1024).toFixed(2)}KB`,
      total: `${((totalJs + totalCss) / 1024).toFixed(2)}KB`,
      resources: results.map(r => ({
        url: r.url.split('/').pop(),
        size: `${(r.size / 1024).toFixed(2)}KB`,
      })),
    });

    // Check against budgets
    if (totalJs > performanceConfig.budgets.bundle.javascript) {
      console.warn('JavaScript bundle exceeds budget!');
    }
    if (totalCss > performanceConfig.budgets.bundle.css) {
      console.warn('CSS bundle exceeds budget!');
    }
  });
}

// Export singleton instances
export const resourceOptimizer = typeof window !== 'undefined' ? new ResourceOptimizer() : null;
export const memoryLeakDetector = typeof window !== 'undefined' ? new MemoryLeakDetector() : null;