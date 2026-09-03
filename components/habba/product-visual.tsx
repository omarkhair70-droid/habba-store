import Image from 'next/image';

type ProductVisualProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
};

export function ProductVisual({
  src,
  alt,
  className,
  sizes = '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw',
  priority = false,
  quality = 82
}: ProductVisualProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={1200}
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={className}
    />
  );
}
