import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return {
    rules: [
      // General crawlers
      {
        userAgent: "*",
        allow: [
          "/",
          "/auth/signin",
          "/auth/signup",
          "/auth/password-recovery",
          "/auth/reset-password",
          "/games/*",
        ],
        disallow: [
          "/api/",
          "/auth/callback*", // OAuth callback routes
          "/_next/", // Next.js internals
          "/_vercel/", // Vercel internals
          "/favicon.ico",
          "/*.json$",
          "/*?*", // Query parameters (to avoid duplicate content)
        ],
        crawlDelay: 1, // Be nice to servers
      },
      // Google-specific rules
      {
        userAgent: "Googlebot",
        allow: [
          "/",
          "/auth/signin",
          "/auth/signup",
          "/auth/password-recovery",
          "/auth/reset-password",
          "/games/*",
        ],
        disallow: ["/api/", "/auth/callback*", "/_next/", "/_vercel/"],
      },
      // Bing-specific rules
      {
        userAgent: "Bingbot",
        allow: ["/", "/auth/signin", "/auth/signup", "/games/*"],
        disallow: [
          "/api/",
          "/games/*",
          "/auth/callback*",
          "/auth/password-recovery",
          "/auth/reset-password",
        ],
        crawlDelay: 2,
      },
      // Block aggressive crawlers
      {
        userAgent: ["AhrefsBot", "SemrushBot", "MJ12bot", "DotBot"],
        disallow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
