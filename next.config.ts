import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.igdb.com",
        port: "",
        pathname: "/**",
      },
    ],
    // Optimizaciones para imágenes estáticas
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 año para imágenes estáticas
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Headers para cachear archivos estáticos
  async headers() {
    return [
      {
        source: "/:path*\\.(ico|png|jpg|jpeg|gif|webp|svg|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // 1 año
          },
        ],
      },
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
