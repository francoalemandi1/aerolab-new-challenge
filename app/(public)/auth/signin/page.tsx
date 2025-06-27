import { Metadata } from "next";
import { SignInContent } from "../_ui/organisms";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your Gaming Haven account to access your game collection and dashboard",
  openGraph: {
    title: "Sign In | Gaming Haven",
    description:
      "Sign in to your Gaming Haven account to access your game collection and dashboard",
    images: [
      {
        url: "/game-logo.svg",
        width: 512,
        height: 512,
        alt: "Gaming Haven - Sign In",
        type: "image/svg+xml",
      },
    ],
    type: "website",
    siteName: "Gaming Haven",
  },
  twitter: {
    card: "summary",
    title: "Sign In | Gaming Haven",
    description:
      "Sign in to your Gaming Haven account to access your game collection and dashboard",
    images: [
      {
        url: "/game-logo.svg",
        alt: "Gaming Haven - Sign In",
      },
    ],
  },
};

export default function SignInPage() {
  return <SignInContent />;
}
