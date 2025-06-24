import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aerolab Challenge",
  description: "Secure authentication with Supabase and Next.js",
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-light">
      <div className="space-y-4 text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-pink-600"></div>
        <p className="text-gray-dark">Loading...</p>
        <p className="text-sm text-gray">
          Redirecting based on authentication status
        </p>
      </div>
    </div>
  );
}
