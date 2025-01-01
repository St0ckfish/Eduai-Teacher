import React, { useState, useEffect, useCallback } from 'react';
import type { ImgHTMLAttributes, ReactNode } from 'react';

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
  objectFit = 'cover',
  priority = false,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [imageSrc, setImageSrc] = useState<string>(src ?? fallbackSrc);
  const [isVisible, setIsVisible] = useState(priority);

  // Intersection Observer setup for lazy loading
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

      const element = document.getElementById(`image-${imageSrc}`);
      if (element) {
        observer.observe(element);
      }

      return () => observer.disconnect();
    }
  }, [imageSrc, priority]);

  // Reset states when src changes
  useEffect(() => {
    setLoading(true);
    setError(null);
    setImageSrc(src ?? fallbackSrc);
  }, [src, fallbackSrc]);

  const handleLoad = useCallback(() => {
    setLoading(false);
    onLoadingComplete?.();
  }, [onLoadingComplete]);

  const handleError = useCallback(() => {
    setLoading(false);
    setImageSrc(fallbackSrc);
  }, [fallbackSrc]);


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

  if (!isVisible) {
    return (
      <div id={`image-${imageSrc}`} className={containerClasses}>
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

export default ImageComponent;
