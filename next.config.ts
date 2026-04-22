import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
  { protocol: "https", hostname: "image.shutterstock.com" },
  { protocol: "https", hostname: "media-cdn.tripadvisor.com" },
  { protocol: "https", hostname: "images.adsttc.com" },
  { protocol: "https", hostname: "i.pinimg.com" },  
],
  },
};

export default nextConfig;
