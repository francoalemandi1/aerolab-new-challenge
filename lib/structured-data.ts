/**
 * Structured Data (JSON-LD) utilities for SEO
 * These help search engines understand the content and context of our pages
 */

export interface StructuredDataProps {
  url?: string;
  title?: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
}

/**
 * Generates WebSite structured data for the main site
 */
export function generateWebsiteStructuredData(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Gaming Haven",
    alternateName: "Gaming Haven - Game Collection Platform",
    description:
      "Discover, save, and organize your favorite video games with Gaming Haven. Browse thousands of games, create your personal collection, and never miss a great game again.",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/games?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "Gaming Haven",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/game-logo.svg`,
        width: 512,
        height: 512,
      },
    },
  };
}

/**
 * Generates WebApplication structured data
 */
export function generateWebApplicationStructuredData(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Gaming Haven",
    description:
      "A comprehensive gaming collection platform where users can discover, save, and organize their favorite video games.",
    url: baseUrl,
    applicationCategory: "GameApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Game Discovery",
      "Personal Game Collection",
      "Game Search and Filtering",
      "User Authentication",
      "Responsive Design",
    ],
    screenshot: `${baseUrl}/game-logo.svg`,
  };
}

/**
 * Generates Organization structured data
 */
export function generateOrganizationStructuredData(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Gaming Haven",
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/game-logo.svg`,
      width: 512,
      height: 512,
    },
    description:
      "Gaming Haven is a platform dedicated to helping gamers discover, collect, and organize their favorite video games.",
    foundingDate: "2024",
    knowsAbout: [
      "Video Games",
      "Game Collection",
      "Gaming Platform",
      "Game Discovery",
    ],
  };
}

/**
 * Generates BreadcrumbList structured data
 */
export function generateBreadcrumbStructuredData(
  baseUrl: string,
  breadcrumbs: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url,
    })),
  };
}

/**
 * Generates WebPage structured data for individual pages
 */
export function generateWebPageStructuredData({
  url,
  title,
  description,
  image,
  datePublished,
  dateModified,
}: StructuredDataProps) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://the-gaming-haven.vercel.app";

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
    image: image || `${baseUrl}/game-logo.svg`,
    datePublished,
    dateModified: dateModified || new Date().toISOString(),
    isPartOf: {
      "@type": "WebSite",
      name: "Gaming Haven",
      url: baseUrl,
    },
    author: {
      "@type": "Organization",
      name: "Gaming Haven",
      url: baseUrl,
    },
  };
}
