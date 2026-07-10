'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ZoomGalleryProps {
  images: Array<{ url: string; altText: string }>;
}

export function ZoomGallery({ images }: ZoomGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const selectedImage = images[selectedIndex] || { url: '/placeholder.jpg', altText: 'Product' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)' }}>
      {/* Main Image with Zoom */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '3/4',
          backgroundColor: 'var(--surface-wash)',
          overflow: 'hidden',
          cursor: isZoomed ? 'zoom-out' : 'zoom-in',
        }}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <Image
          src={selectedImage.url}
          alt={selectedImage.altText}
          fill
          style={{
            objectFit: 'cover',
            transform: isZoomed ? 'scale(1.3)' : 'scale(1)',
            transition: 'transform var(--duration-slow) ease',
          }}
          unoptimized
        />
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: 'var(--spacing-8)' }}>
          {images.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              style={{
                position: 'relative',
                aspectRatio: '1',
                padding: 0,
                border: selectedIndex === idx ? `2px solid var(--color-carbon)` : `1px solid var(--color-smoke)`,
                backgroundColor: 'transparent',
                cursor: 'pointer',
                transition: 'border-color var(--duration-fast) ease',
                overflow: 'hidden',
              }}
            >
              <Image
                src={image.url}
                alt={image.altText}
                fill
                style={{ objectFit: 'cover' }}
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
