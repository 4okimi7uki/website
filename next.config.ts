import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ['./src/styles']
  },
  turbopack: {
    rules: {
      '*.svg': {
        condition: { not: 'foreign' },
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true
            }
          }
        ],
        as: '*.js'
      }
    }
  }
};

export default nextConfig;
