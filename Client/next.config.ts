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
};

export default nextConfig;
