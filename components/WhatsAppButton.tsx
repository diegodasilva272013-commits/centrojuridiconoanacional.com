"use client";

import { motion } from "framer-motion";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackCTAClick, type TrackSection } from "@/lib/track";
import { cn } from "@/lib/cn";

interface WhatsAppButtonProps {
  label?: string;
  section: TrackSection;
  className?: string;
  size?: "default" | "large";
}

export default function WhatsAppButton({
  label = "👉 QUIERO MI GUÍA POR WHATSAPP",
  section,
  className,
  size = "default",
}: WhatsAppButtonProps) {
  async function handleClick() {
    trackCTAClick(section); // fire & forget
    window.open(buildWhatsAppUrl(), "_blank", "noopener,noreferrer");
  }

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "wa-btn-shine",
        "relative inline-flex items-center justify-center overflow-hidden",
        "bg-wa text-white font-semibold tracking-wide",
        "rounded-[14px] cursor-pointer select-none",
        "transition-colors duration-200 hover:bg-wa-hover",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wa focus-visible:ring-offset-2",
        "shadow-wa-btn active:shadow-none",
        size === "large"
          ? "min-h-[56px] px-8 py-4 text-base sm:text-lg w-full sm:max-w-[420px]"
          : "min-h-[52px] px-7 py-3 text-sm sm:text-base w-full sm:max-w-[420px]",
        className
      )}
      aria-label={label.replace(/👉\s?/, "")}
    >
      {label}
    </motion.button>
  );
}
