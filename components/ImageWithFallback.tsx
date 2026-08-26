// components/ImageWithFallback.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  fallbackClassName?: string;
  priority?: boolean;
  sizes?: string;
}

export function ImageWithFallback({
  src,
  alt,
  width,
  height,
  fill,
  className,
  fallbackClassName,
  priority,
  sizes,
}: ImageWithFallbackProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (imageError) {
    return (
      <div
        className={cn(
          'bg-gray-200 dark:bg-gray-700 flex items-center justify-center',
          fallbackClassName,
          className
        )}
        style={!fill ? { width, height } : undefined}
      >
        <ImageIcon className="w-8 h-8 text-gray-400" />
      </div>
    );
  }

  return (
    <div className={cn('relative', className)}>
      {isLoading && (
        <div
          className={cn(
            'absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center',
            className
          )}
        >
          <ImageIcon className="w-8 h-8 text-gray-400" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImageError(true);
          setIsLoading(false);
        }}
        priority={priority}
        sizes={sizes}
      />
    </div>
  );
}
