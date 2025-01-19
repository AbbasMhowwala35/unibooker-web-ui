import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['installer-vehicle.unibooker.app', 'vehicle.unibooker.app'],
  },
};

export default nextConfig;
