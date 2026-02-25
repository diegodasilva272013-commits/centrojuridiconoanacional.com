"use client";

import SectionReveal from "./SectionReveal";
import WhatsAppButton from "./WhatsAppButton";

export default function VideoSection() {
  return (
    <section
      id="video"
      aria-labelledby="video-h2"
      className="bg-white px-5 py-16 sm:py-20"
    >
      <div className="max-w-landing mx-auto flex flex-col items-center gap-10">
        <SectionReveal className="text-center">
          <h2
            id="video-h2"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-carbon tracking-tight"
          >
            Mirá qué incluye exactamente la guía
          </h2>
        </SectionReveal>

        {/* Video local 16:9 */}
        <SectionReveal delay={0.1} className="w-full">
          <div className="w-full rounded-2xl overflow-hidden border border-[#eaeaea] shadow-card bg-[#0b0b0b]">
            <video
              src="/vsl guia.mp4"
              controls
              playsInline
              preload="metadata"
              className="w-full h-auto block"
              aria-label="Guía de Jubilación – Centro Jurídico NOA"
            />
          </div>
        </SectionReveal>

        <SectionReveal delay={0.18} className="flex flex-col items-center gap-5 text-center">
          <p className="text-metal-mid text-sm sm:text-base font-medium">
            Dr. Fabricio Reyes&nbsp;•&nbsp;Especialista&nbsp;•&nbsp;+500 jubilaciones exitosas
          </p>
          <WhatsAppButton
            label="👉 QUIERO MI GUÍA POR WHATSAPP"
            section="video"
          />
        </SectionReveal>
      </div>
    </section>
  );
}
