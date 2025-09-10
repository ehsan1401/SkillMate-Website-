import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
      globalNotFound: true,
      serverActions: {
        bodySizeLimit: '20mb',
      },
  },
};

export default nextConfig;
