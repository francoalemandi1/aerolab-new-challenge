import Link from "next/link";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import { H1, H2, Paragraph } from "@/ui/atoms/typography";
import { Button } from "@/ui/atoms/button";
import { Card } from "@/ui/molecules/card";

export default function GameNotFound() {
  return (
    <div className="min-h-screen px-6 py-8 md:px-12 md:py-16">
      <div className="mx-auto max-w-2xl">
        {/* Back Button */}
        <Link
          href="/games"
          className="mb-8 inline-flex items-center gap-2 text-violet-600 transition-colors hover:text-violet-700"
        >
          <ArrowLeft className="h-5 w-5" />
          <H2 className="text-violet-600">Back to Games</H2>
        </Link>

        {/* Content */}
        <div className="flex min-h-96 items-center justify-center">
          <Card className="space-y-6 p-8 text-center">
            <div className="flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-50">
                <Gamepad2 className="h-10 w-10 text-violet-600" />
              </div>
            </div>

            <div className="space-y-2">
              <H1 className="text-violet-600">Game Not Found</H1>
              <Paragraph className="text-gray">
                The game you&apos;re looking for doesn&apos;t exist or may have
                been removed.
              </Paragraph>
            </div>

            <div className="space-y-3">
              <Link href="/games">
                <Button className="w-full border-0 bg-gradient-violet text-white hover:opacity-90">
                  Browse All Games
                </Button>
              </Link>

              <Link href="/games">
                <Button
                  variant="outline"
                  className="w-full border-violet-600 text-violet-600 hover:bg-violet-50"
                >
                  Search for Games
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
