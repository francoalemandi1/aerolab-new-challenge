"use client";

import React from "react";
import { Paragraph } from "@/ui/atoms/typography";
import { CheckCircle } from "lucide-react";

interface SignUpSuccessProps {
  email: string;
}

export const SignUpSuccess: React.FC<SignUpSuccessProps> = ({ email }) => {
  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <CheckCircle className="h-16 w-16 text-green-600" />
      </div>

      <Paragraph className="text-gray">
        We&apos;ve sent a confirmation email to <strong>{email}</strong>
      </Paragraph>

      <div className="rounded-secondary bg-green-50 p-4">
        <Paragraph className="text-sm font-medium text-green-600">
          Please check your email and click the confirmation link to complete
          your registration.
        </Paragraph>
      </div>
    </div>
  );
};
