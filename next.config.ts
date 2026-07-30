import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  allowedDevOrigins: [
    "localhost",
    "ta-01kysh6snzwchh7e7t73j7xets-3000-1fbrb7wojjjzllulsqnu8hsrp.w.modal.host",
  ],
};

export default nextConfig;
