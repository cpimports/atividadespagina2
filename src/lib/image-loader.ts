'use client';

export default function customImageLoader({
  src,
}: {
  src: string;
  width?: number;
  quality?: number;
}) {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  if (src.startsWith('/oferta2/')) {
    return src;
  }
  return `/oferta2${src.startsWith('/') ? '' : '/'}${src}`;
}
