import { H1, Paragraph } from "@/ui/atoms/typography";
import { Button } from "@/ui/atoms/button";
import { Card } from "@/ui/molecules/card";
import Link from "next/link";
import { Gamepad2 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-8">
      <Card className="space-y-6 p-8 text-center">
        <Paragraph className="mb-6 text-gray">
          The page you&apos;re looking for doesn&apos;t exist.
        </Paragraph>

        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-50">
            <Gamepad2 className="h-10 w-10 text-violet-600" />
          </div>
        </div>

        <div className="space-y-2">
          <H1 className="text-violet-600">Page Not Found</H1>
        </div>

        <div className="space-y-3">
          <Link href="/">
            <Button className="w-full border-0 bg-gradient-violet text-white hover:opacity-90">
              Go Home
            </Button>
          </Link>

          <Link href="/games">
            <Button
              variant="outline"
              className="w-full border-violet-600 text-violet-600 hover:bg-violet-50"
            >
              Browse Games
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
