"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

type CopyLinkButtonProps = {
  value: string;
  label?: string;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
};

function resolveCopyValue(value: string) {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  if (typeof window === "undefined") {
    return value;
  }

  return new URL(value.startsWith("/") ? value : `/${value}`, window.location.origin).toString();
}

export function CopyLinkButton({ value, label = "Copy link", variant = "outline", className }: CopyLinkButtonProps) {
  const [copied, setCopied] = React.useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(resolveCopyValue(value));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Button type="button" variant={variant} className={className} onClick={() => void handleCopy()}>
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied" : label}
    </Button>
  );
}
