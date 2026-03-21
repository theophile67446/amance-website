import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Share2 } from "lucide-react";

interface ShareActionsProps {
  title: string;
  path?: string;
  summary?: string;
  compact?: boolean;
  dark?: boolean;
}

export default function ShareActions({ title, path = "/", summary = "", compact = false, dark = false }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return path;
    return new URL(path, window.location.origin).toString();
  }, [path]);

  const shareText = summary ? `${title} - ${summary}` : title;

  const openShareWindow = (url: string) => {
    if (typeof window === "undefined") return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url: shareUrl });
      } catch {
        // User may cancel native share; no blocking UI needed.
      }
      return;
    }

    openShareWindow(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`);
  };

  const handleCopyLink = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      // Clipboard may be unavailable in restrictive contexts.
    }
  };

  const sizeClass = compact ? "h-8 px-3 text-xs" : "h-9 px-3.5 text-sm";
  const darkClass = dark ? "border-white/60 text-white hover:bg-white/20 hover:text-white" : "";
  const btnClass = `${sizeClass} ${darkClass}`.trim();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button type="button" variant="outline" className={btnClass} onClick={handleNativeShare}>
        <Share2 className="w-3.5 h-3.5 mr-1.5" />
        Partager
      </Button>
      <Button type="button" variant="outline" className={btnClass} onClick={handleCopyLink}>
        <Copy className="w-3.5 h-3.5 mr-1.5" />
        {copied ? "Copie" : "Copier"}
      </Button>
      <Button
        type="button"
        variant="outline"
        className={btnClass}
        onClick={() => openShareWindow(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`)}
      >
        WhatsApp
      </Button>
      <Button
        type="button"
        variant="outline"
        className={btnClass}
        onClick={() => openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`)}
      >
        Facebook
      </Button>
      <Button
        type="button"
        variant="outline"
        className={btnClass}
        onClick={() => openShareWindow(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`)}
      >
        X
      </Button>
    </div>
  );
}
