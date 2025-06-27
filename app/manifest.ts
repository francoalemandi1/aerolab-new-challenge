import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gaming Haven - Discover Your Next Favorite Game",
    short_name: "Gaming Haven",
    description:
      "Discover, save, and organize your favorite video games with Gaming Haven. Browse thousands of games, create your personal collection, and never miss a great game again.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#7c3aed",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
    categories: ["games", "entertainment", "lifestyle"],
    lang: "en",
    orientation: "portrait-primary",
    scope: "/",
  };
}
