import { TypographyShowcase } from "@/ui/atoms/typography";
import { CardShowcase } from "@/ui/molecules/card";

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="rounded-secondary bg-white shadow-lg">
          <TypographyShowcase />
        </div>

        <div className="mt-8 rounded-secondary bg-white shadow-lg">
          <CardShowcase />
        </div>
      </div>
    </div>
  );
}
