/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import type { ImgHTMLAttributes, ReactNode } from 'react';

interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'onError'> {
  src: string | null;
  fallbackSrc?: string;
  loadingPlaceholder?: ReactNode;
  errorPlaceholder?: ReactNode;
  onLoadingComplete?: () => void;
  onError?: (error: Error) => void;
  className?: string;
}

const ImageSrc: React.FC<ImageProps> = ({
  src,
  fallbackSrc = '/images/noImage.png',
  alt = 'image',
  loadingPlaceholder = <div className="w-full h-full animate-pulse bg-gray-200 rounded" />,
  errorPlaceholder = null,
  onLoadingComplete,
  onError,
  className = '',
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [imageSrc, setImageSrc] = useState<string>(src ?? fallbackSrc);

  useEffect(() => {
    // Reset states when src changes
    setLoading(false);
    setError(null);
    setImageSrc(src ?? fallbackSrc);
  }, [src, fallbackSrc]);

  const handleLoad = () => {
    setLoading(false);
    onLoadingComplete?.();
  };

  const handleError = () => {
    const error = new Error(`Failed to load image: ${imageSrc}`);
    setError(error);
    setLoading(false);
    setImageSrc(fallbackSrc);
    onError?.(error);
  };

  if (loading) {
    return <>{loadingPlaceholder}</>;
  }

  if (error && errorPlaceholder) {
    return <>{errorPlaceholder}</>;
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`max-w-full h-auto ${className}`}
      onLoad={handleLoad}
      onError={handleError}
      {...props}
    />
  );
};

export default ImageSrc;