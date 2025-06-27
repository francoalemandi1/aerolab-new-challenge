import { createSupabaseServerClient } from "@/lib/supabase";
import { H1 } from "@/ui/atoms/typography";
import { Card } from "@/ui/molecules/card";
import { WasdKeycaps } from "@/ui/atoms";
import type { CallbackStatus } from "@/hooks/useCallbackStatus";
import { CallbackStatus as CallbackStatusComponent } from "../_ui/organisms";

export default async function AuthCallbackPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // Await searchParams in Next.js 15
  const params = await searchParams;

  const code = Array.isArray(params.code) ? params.code[0] : params.code;
  const error = Array.isArray(params.error) ? params.error[0] : params.error;
  const errorCode = Array.isArray(params.error_code)
    ? params.error_code[0]
    : params.error_code;

  let status: CallbackStatus = "error";

  // If there's an error from the callback URL
  if (error || errorCode) {
    status = "error";
  }
  // If we have a code, try to exchange it for a session
  else if (code) {
    const supabase = await createSupabaseServerClient();

    try {
      const { data, error: supabaseError } =
        await supabase.auth.exchangeCodeForSession(code);

      if (supabaseError) {
        throw supabaseError;
      }

      if (data.user && data.session) {
        status = "success";
      } else {
        status = "error";
      }
    } catch {
      status = "error";
    }
  } else {
    // No code found in callback
    status = "error";
  }

  return (
    <div className="relative min-h-screen bg-gray-white">
      {/* Background Pattern */}
      <div className="absolute inset-x-0 top-0 z-0 h-80 overflow-hidden">
        <div
          className="absolute inset-0 md:hidden"
          style={{
            backgroundImage:
              "url('/mobile-background.svg'), url('/mobile-background.svg')",
            backgroundSize: "100vw auto, 100vw auto",
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundPosition: "top left, top 100vw",
          }}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: "url('/desktop-background.svg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top center",
          }}
        />
      </div>

      {/* Animated WASD Keys - For mobile and desktop */}
      <WasdKeycaps className="right-0 top-0 z-20" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="space-y-6 p-8 backdrop-blur-sm">
            <H1 className="animate-fade-in-from-bottom text-center">
              Email Confirmation
            </H1>
            <CallbackStatusComponent status={status} />
          </Card>
        </div>
      </div>
    </div>
  );
}
