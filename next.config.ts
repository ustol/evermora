import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  allowedDevOrigins: ["**.modal.host", "*.modal.host", "localhost","akornafa.com"],
};

export default nextConfig;
