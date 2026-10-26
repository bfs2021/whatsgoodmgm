// Hosts whose flyers go through next/image (resized + cached by Vercel).
// Flyers from any other host still render, just unoptimized, so a new source
// never breaks images. Add a host here when a new source shows up often.
export const FLYER_HOSTS = [
  'assets.simpleviewinc.com',
  'img.evbuc.com',
  'mmfa.org',
  'mpaconline.org',
  'pikeroad.us',
  'photos.bandsintown.com',
  'images.squarespace-cdn.com',
  'asf.net',
  'irp.cdn-website.com',
]

export function isOptimizableFlyer(src: string): boolean {
  try {
    const u = new URL(src)
    return u.protocol === 'https:' && FLYER_HOSTS.includes(u.hostname)
  } catch {
    return false
  }
}
