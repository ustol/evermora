import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  allowedDevOrigins: ["**.modal.host", "*.modal.host", "*.anedai.com", "**.anedai.com", "localhost", "akornafa.com"],
};

export default nextConfig;
