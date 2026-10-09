import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'WhatsGoodMGM',
    short_name: 'WhatsGood',
    description: 'a free, community-made guide to what\'s good in Montgomery, Alabama.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f6efe3',
    theme_color: '#f6efe3',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
