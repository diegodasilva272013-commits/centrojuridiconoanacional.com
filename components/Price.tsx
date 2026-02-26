"use client";

import SectionReveal from "./SectionReveal";
import WhatsAppButton from "./WhatsAppButton";
import MercadoPagoButton from "./MercadoPagoButton";
import { motion, useReducedMotion } from "framer-motion";

export default function Price() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="price"
      aria-labelledby="price-h2"
      className="bg-[#fafafa] px-5 py-16 sm:py-20"
    >
      <div className="max-w-landing mx-auto flex flex-col items-center gap-8">
        <SectionReveal className="text-center">
          <h2
            id="price-h2"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-carbon tracking-tight"
          >
            Precio
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <motion.div
            whileHover={prefersReduced ? {} : { scale: 1.015, boxShadow: "0 12px 40px 0 rgba(0,0,0,0.13)" }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-2xl border border-[#eaeaea] shadow-card px-8 sm:px-12 py-8 sm:py-10 text-center max-w-[440px] w-full"
          >
            {/* Normal price (tachado) */}
            <p className="text-metal-mid text-base sm:text-lg line-through mb-1">
              Precio normal $39.000
            </p>

            {/* Destacado */}
            <p className="text-carbon text-3xl sm:text-4xl font-bold mt-2 mb-1">
              <span className="text-wa">💲</span> $21.900
            </p>
            <p className="text-metal-mid text-xs sm:text-sm font-semibold tracking-wide uppercase mb-1">
              Precio SOLO POR HOY
            </p>

            {/* Divider */}
            <div className="divider my-5" />

            <p className="text-metal-mid text-sm">
              Pago único – no es mensual.
            </p>
          </motion.div>
        </SectionReveal>

        <SectionReveal delay={0.2} className="flex justify-center w-full">
          <div className="flex flex-col items-center gap-3 w-full">
            <MercadoPagoButton
              label="💳 COMPRAR CON MERCADO PAGO"
              size="large"
            />
            <div className="flex items-center gap-3 w-full sm:max-w-[420px]">
              <div className="flex-1 h-px bg-[#eaeaea]" />
              <span className="text-metal-mid text-xs font-medium">o si preferís hablar primero</span>
              <div className="flex-1 h-px bg-[#eaeaea]" />
            </div>
            <WhatsAppButton
              label="👉 CONSULTAR POR WHATSAPP"
              section="price"
              size="large"
            />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
