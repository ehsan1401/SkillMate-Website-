import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
    globalNotFound: true,
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "react-compat": require.resolve("@ant-design/compatible"),
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'myapp.test',
        port: '4000',
        pathname: '/uploads/avatars/**',
      },
    ],
  }

// async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'http://localhost:4000/:path*', // proxy به backend
//       },
//     ]
//   },
};

export default nextConfig;

