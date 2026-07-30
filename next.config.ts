import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  allowedDevOrigins: [
    "localhost",
    "https://akornafa.com",
  ],
};

export default nextConfig;
