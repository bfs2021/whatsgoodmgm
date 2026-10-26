import Image, { type ImageProps } from 'next/image'
import { isOptimizableFlyer } from '@/lib/images'

// Event flyers are external, often full-size (500KB+) images shown as small
// thumbnails. Known hosts get resized through next/image; unknown hosts fall
// back to the raw image.
export function FlyerImage({ src, alt, ...props }: Omit<ImageProps, 'src'> & { src: string }) {
  return <Image src={src} alt={alt} unoptimized={!isOptimizableFlyer(src)} {...props} />
}
