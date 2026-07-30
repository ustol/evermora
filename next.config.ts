import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  allowedDevOrigins: [
    "ta-01kyrwy4rm9x6w172qe12p3mzs-3000-ckdhcze8csmibj54wx6s55z1f.w.modal.host",
    "localhost",
  ],
};

export default nextConfig;
