import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.digitalkompetensi.id',
          },
        ],
        destination: 'https://digitalkompetensi.id/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
