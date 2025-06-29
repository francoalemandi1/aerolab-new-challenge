"use client";

import React, { useState } from "react";
import { Share2, Copy, Check } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  url: string;
  title?: string;
  description?: string;
}

export default function ShareButton({ url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleWhatsAppShare = () => {
    // Solo enviar la URL para que WhatsApp haga el scraping de OpenGraph
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch (fallbackError) {
        console.error("Fallback copy failed:", fallbackError);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full p-0 text-violet-600 transition-colors",
            "hover:bg-violet-50",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-white"
          )}
          aria-label="Share game"
        >
          <Share2 className="h-5 w-5" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-50 w-52 rounded-lg border border-pink-600/20 bg-gray-white p-2 shadow-lg"
          align="end"
          sideOffset={8}
        >
          <DropdownMenu.Item
            onSelect={handleWhatsAppShare}
            className={cn(
              "flex w-full cursor-pointer items-center justify-start gap-3 rounded-md px-3 py-3 text-base text-gray-dark outline-none transition-colors",
              "hover:bg-gray-light",
              "focus-visible:bg-gray-light focus-visible:outline-none"
            )}
          >
            <div className="flex h-5 w-5 items-center justify-center text-green-600">
              <Image
                src="/whatsapp-icon.svg"
                alt="WhatsApp"
                width={20}
                height={20}
                className="text-green-600"
              />
            </div>
            <span className="text-left">WhatsApp</span>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="mx-2 my-1 h-px bg-pink-600/10" />

          <DropdownMenu.Item
            onSelect={handleCopyLink}
            className={cn(
              "flex w-full cursor-pointer items-center justify-start gap-3 rounded-md px-3 py-3 text-base text-gray-dark outline-none transition-colors",
              "hover:bg-gray-light",
              "focus-visible:bg-gray-light focus-visible:outline-none"
            )}
          >
            {copied ? (
              <>
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-left text-green-600">Link copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-5 w-5" />
                <span className="text-left">Copy link</span>
              </>
            )}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
