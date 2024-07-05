//https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest

import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'OasysWallet WebApp',
    short_name: 'OasysWallet WebApp',
    description: 'OasysWallet WebApp',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#05D65A',
    icons: [
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
