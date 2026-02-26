"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackCTAClick } from "@/lib/track";
import MercadoPagoButton from "@/components/MercadoPagoButton";

export default function StickyWhatsApp() {
  const [visible, setVisible] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    function handleScroll() {
      const scrolled =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setVisible(scrolled > 0.25);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleClick() {
    trackCTAClick("sticky");
    window.open(buildWhatsAppUrl(), "_blank", "noopener,noreferrer");
  }

  return (
    // Only visible on mobile (sm:hidden)
    <div className="sm:hidden">
      <AnimatePresence>
        {visible && (
          <motion.div
            key="sticky-wa"
            initial={prefersReduced ? { opacity: 1 } : { y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { y: 80, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-3 bg-white border-t border-[#eaeaea] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
          >
            {/* Botón MercadoPago */}
            <MercadoPagoButton
              label="💳 COMPRAR CON MERCADO PAGO"
              size="default"
              className="mb-2"
            />
            {/* Divisor */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 h-px bg-[#eaeaea]" />
              <span className="text-metal-mid text-[10px] font-medium">o consultá</span>
              <div className="flex-1 h-px bg-[#eaeaea]" />
            </div>
            {/* Botón WhatsApp */}
            <button
              onClick={handleClick}
              className="
                w-full min-h-[44px] flex items-center justify-center
                bg-wa hover:bg-wa-hover active:bg-wa-hover
                text-white font-semibold text-sm tracking-wide
                rounded-[14px] shadow-wa-btn
                transition-colors duration-150
                select-none
              "
              aria-label="Consultar por WhatsApp"
            >
              👉 CONSULTAR POR WHATSAPP
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
