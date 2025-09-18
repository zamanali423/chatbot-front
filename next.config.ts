import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["lucide-react"],
  experimental: {
    optimizeCss: false, // disables LightningCSS
  },
};

export default nextConfig;
