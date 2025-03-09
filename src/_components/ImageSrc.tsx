import React, { useState, useEffect, useCallback } from 'react';
import type { ImgHTMLAttributes, ReactNode } from 'react';

// Global in-memory cache to avoid duplicate fetches for the same image URL
const inMemoryImageCache = new Map<string, Promise<string>>();

interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'onError'> {
  src: string | null;
  fallbackSrc?: string;
  loadingPlaceholder?: ReactNode;
  errorPlaceholder?: ReactNode;
  onLoadingComplete?: () => void;
  onError?: (error: Error) => void;
  className?: string;
  aspectRatio?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
  cacheExpiry?: number; // Cache expiry in milliseconds, default 1 week
}

const ImageComponent: React.FC<ImageProps> = ({
  src,
  fallbackSrc = '/images/noImage.png',
  alt = 'image',
  loadingPlaceholder,
  errorPlaceholder,
  onLoadingComplete,
  onError,
  className = '',
  aspectRatio = 'aspect-square',
  objectFit = 'fill',
  priority = false,
  cacheExpiry = 7 * 24 * 60 * 60 * 1000, // Default 1 week
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [imageSrc, setImageSrc] = useState<string>(src || fallbackSrc);
  const [isVisible, setIsVisible] = useState(priority);

  // Create a cache key from URL
  const getCacheKey = useCallback((url: string): string => {
    return `img_cache_${url}`;
  }, []);

  // Fetch and cache image as base64, using the in-memory cache to prevent duplicate requests
  const fetchAndCacheImage = useCallback(async (imageUrl: string) => {
    if (inMemoryImageCache.has(imageUrl)) {
      return inMemoryImageCache.get(imageUrl)!;
    }
    const promise = (async () => {
      try {
        // Fetch the image
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error(`Failed to fetch image: ${imageUrl}`);

        // Get the blob
        const blob = await response.blob();

        // Convert to base64
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result as string;

            // Cache the base64 data in localStorage
            try {
              const cacheKey = getCacheKey(imageUrl);
              localStorage.setItem(cacheKey, JSON.stringify({
                data: base64data,
                timestamp: Date.now()
              }));
            } catch (e) {
              console.warn('Cache write error:', e);
            }
            resolve(base64data);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.error('Error fetching or caching image:', error);
        throw error;
      }
    })();
    inMemoryImageCache.set(imageUrl, promise);
    return promise;
  }, [getCacheKey]);

  // Always load and cache the image, regardless of visibility.
  useEffect(() => {
    if (!src) {
      setImageSrc(fallbackSrc);
      setLoading(false);
      return;
    }

    const loadImage = async () => {
      try {
        const cacheKey = getCacheKey(src);
        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          if (
            parsedData &&
            parsedData.timestamp &&
            parsedData.data &&
            Date.now() - parsedData.timestamp < cacheExpiry
          ) {
            setImageSrc(parsedData.data);
            setLoading(false);
            onLoadingComplete?.();
          }
        }

        // Always fetch (and cache) the image so that even off-screen images are cached
        const base64Image = await fetchAndCacheImage(src);
        setImageSrc(base64Image);
        setLoading(false);
        onLoadingComplete?.();
      } catch (e) {
        console.error('Image loading error:', e);
        handleError();
      }
    };

    loadImage();
  }, [src, fallbackSrc, getCacheKey, cacheExpiry, onLoadingComplete, fetchAndCacheImage]);

  // Intersection Observer for lazy rendering only
  useEffect(() => {
    if (!priority) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      });
      const elementId = `image-${src || fallbackSrc}`.replace(/[^\w-]/g, '_');
      const element = document.getElementById(elementId);
      if (element) {
        observer.observe(element);
      }
      return () => observer.disconnect();
    }
  }, [src, fallbackSrc, priority]);

  const handleLoad = useCallback(() => {
    setLoading(false);
    onLoadingComplete?.();
  }, [onLoadingComplete]);

  const handleError = useCallback(() => {
    const error = new Error(`Failed to load image: ${src}`);
    setError(error);
    setLoading(false);
    setImageSrc(fallbackSrc);
    onError?.(error);
  }, [src, fallbackSrc, onError]);

  const defaultLoadingPlaceholder = (
    <div className="w-full h-full animate-pulse bg-gray-200 rounded" />
  );

  const defaultErrorPlaceholder = (
    <img
      src="/images/noImage.png"
      alt="Error loading image"
      className={`w-[400px] h-full rounded-md max-[450px]:w-[250px] object-${objectFit}`}
    />
  );

  const containerClasses = `
    relative
    overflow-hidden
    ${aspectRatio}
    ${className}
  `.trim();

  const imageClasses = `
    w-full
    h-full
    transition-opacity
    duration-300
    ${loading ? 'opacity-0' : 'opacity-100'}
    object-${objectFit}
  `.trim();

  // Create a sanitized ID for the element
  const elementId = `image-${src || fallbackSrc}`.replace(/[^\w-]/g, '_');

  if (!isVisible) {
    return (
      <div id={elementId} className={containerClasses}>
        {loadingPlaceholder || defaultLoadingPlaceholder}
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {loading && (loadingPlaceholder || defaultLoadingPlaceholder)}
      {error && (errorPlaceholder || defaultErrorPlaceholder)}
      {!error && (
        <img
          src={imageSrc}
          alt={alt}
          className={imageClasses}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          {...props}
        />
      )}
    </div>
  );
};

// Helper function to clean the cache - can be exported and used elsewhere
export const cleanImageCache = (maxAge?: number) => {
  try {
    const now = Date.now();
    const maxAgeMs = maxAge || 30 * 24 * 60 * 60 * 1000; // Default 30 days
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('img_cache_')) {
        try {
          const item = JSON.parse(localStorage.getItem(key) || '{}');
          if (item.timestamp && (now - item.timestamp > maxAgeMs)) {
            localStorage.removeItem(key);
          }
        } catch (e) {
          localStorage.removeItem(key);
        }
      }
    });
  } catch (e) {
    console.warn('Error cleaning image cache:', e);
  }
};

export default ImageComponent;
