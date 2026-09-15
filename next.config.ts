import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/terminal",
        destination: "/playground",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
