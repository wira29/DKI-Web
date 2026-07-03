import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/cms/', '/cms/*'],
    },
    // Ganti domain ini dengan domain asli Anda saat deployment
    sitemap: 'https://www.digitalkompetensi.id/sitemap.xml',
  }
}
