import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["lucide-react"],
  experimental: {
    optimizeCss: false, // disables LightningCSS
  },
   eslint: {
    // ⚠️ This allows production builds to complete even with ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
