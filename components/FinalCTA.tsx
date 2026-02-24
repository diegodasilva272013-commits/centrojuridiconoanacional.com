"use client";

import SectionReveal from "./SectionReveal";
import WhatsAppButton from "./WhatsAppButton";

export default function FinalCTA() {
  return (
    <section
      id="final"
      aria-labelledby="final-h2"
      className="bg-carbon px-5 py-16 sm:py-20 relative overflow-hidden"
    >
      {/* Subtle grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      <div className="relative z-10 max-w-landing mx-auto flex flex-col items-center gap-8 text-center">
        <SectionReveal>
          <h2
            id="final-h2"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight max-w-[680px]"
          >
            Si querés avanzar hoy con tu jubilación,{" "}
            <span className="text-metal-light">empezá ahora.</span>
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.12}>
          <p className="text-metal-light/70 text-sm sm:text-base">
            Dr. Fabricio Reyes&nbsp;•&nbsp;Especialista&nbsp;•&nbsp;+500 jubilaciones exitosas
          </p>
        </SectionReveal>

        <SectionReveal delay={0.2} className="flex justify-center w-full">
          <WhatsAppButton
            label="👉 QUIERO MI GUÍA POR WHATSAPP"
            section="final"
            size="large"
          />
        </SectionReveal>
      </div>
    </section>
  );
}
