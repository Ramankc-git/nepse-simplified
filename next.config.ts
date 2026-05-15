import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: "/admin/config.yml",
        destination: "/config.yml",
      },
    ];
  },
};

export default nextConfig;
