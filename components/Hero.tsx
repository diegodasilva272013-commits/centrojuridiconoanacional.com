"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import WhatsAppButton from "./WhatsAppButton";

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const cardY = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [0, -30]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative bg-carbon overflow-hidden min-h-[92dvh] flex flex-col items-center justify-center px-5 py-16 sm:py-20"
      aria-labelledby="hero-h1"
    >
      {/* Grain texture */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Metallic glow */}
      <div className="hero-glow" aria-hidden="true" />

      {/* Copy block */}
      <div className="relative z-10 w-full max-w-landing mx-auto text-center flex flex-col items-center gap-6">
        <motion.h1
          id="hero-h1"
          initial={prefersReduced ? {} : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight max-w-[780px]"
        >
          Comprá tus aportes y avanzá con tu jubilación{" "}
          <span className="text-metal-light">sin depender de nadie</span>
        </motion.h1>

        <motion.p
          initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-metal-light/80 text-base sm:text-lg max-w-[640px] leading-relaxed"
        >
          Guía paso a paso explicada simple, con formularios, notas listas para
          presentar en ANSES y calculadora incluida.
        </motion.p>

        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex justify-center"
        >
          <WhatsAppButton
            label="👉 QUIERO MI GUÍA AHORA"
            section="hero"
            size="large"
          />
        </motion.div>

        {/* Floating card */}
        <motion.div
          style={{ y: cardY }}
          className={`
            mt-4 bg-white rounded-2xl px-8 py-6 max-w-[380px] w-full
            border border-[#eaeaea] text-center
            ${prefersReduced ? "" : "float-card"}
          `}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-metal-mid font-semibold mb-2">
            Incluye
          </p>
          <p className="text-carbon font-semibold text-base sm:text-lg leading-snug">
            Guía digital + bonus + calculadora
          </p>
          <div className="mt-3 flex justify-center gap-3 flex-wrap">
            {["📘 Guía", "🎁 Bonus", "🧮 Calculadora"].map((item) => (
              <span
                key={item}
                className="bg-[#f5f5f5] text-carbon text-xs font-medium px-3 py-1 rounded-full border border-[#eaeaea]"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
