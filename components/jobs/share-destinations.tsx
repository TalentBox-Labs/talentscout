"use client";

import * as React from "react";
import Link from "next/link";
import { ExternalLink, Linkedin, MessageCircle, Send, Share2 } from "lucide-react";
import { CopyLinkButton } from "@/components/jobs/copy-link-button";
import { Button } from "@/components/ui/button";

type ShareDestinationsProps = {
  path: string;
  title: string;
  className?: string;
};

function getAbsoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  if (typeof window === "undefined") {
    return path;
  }

  return new URL(path.startsWith("/") ? path : `/${path}`, window.location.origin).toString();
}

export function ShareDestinations({ path, title, className }: ShareDestinationsProps) {
  const absoluteUrl = getAbsoluteUrl(path);
  const encodedUrl = encodeURIComponent(absoluteUrl);
  const encodedText = encodeURIComponent(`Apply for ${title}`);
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Apply for ${title}: ${absoluteUrl}`)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
  const xUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;

  return (
    <div className={className}>
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[var(--color-fg)]">
        <Share2 className="h-4 w-4 text-[var(--color-primary)]" />
        Share to recruiter destinations
      </div>
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" asChild>
          <Link href={path} target="_blank" rel="noreferrer">
            <ExternalLink className="h-4 w-4" />
            Career site
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <a href={linkedInUrl} target="_blank" rel="noreferrer">
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href={xUrl} target="_blank" rel="noreferrer">
            <Share2 className="h-4 w-4" />
            Social post
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href={telegramUrl} target="_blank" rel="noreferrer">
            <Send className="h-4 w-4" />
            Telegram
          </a>
        </Button>
        <CopyLinkButton value={absoluteUrl} label="Copy link" />
      </div>
    </div>
  );
}
