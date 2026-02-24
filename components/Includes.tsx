"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionReveal from "./SectionReveal";
import WhatsAppButton from "./WhatsAppButton";

const guideItems = [
  "Cómo comprar con Ley 24.476 (la más económica)",
  "Cómo comprar con Ley 27.705",
  "Cómo combinarlas si corresponde",
  "Explicado sin palabras difíciles",
];

const bonusItems = [
  "Formularios ANSES listos",
  "Modelos de notas para presentar",
  "Calculadora para saber cuánto podés comprar",
];

function CheckItem({ text, delay }: { text: string; delay: number }) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.li
      initial={prefersReduced ? {} : { opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="flex items-start gap-3 text-sm sm:text-base text-carbon"
    >
      <span className="text-wa font-bold mt-[2px] flex-shrink-0" aria-hidden="true">✔</span>
      <span>{text}</span>
    </motion.li>
  );
}

export default function Includes() {
  return (
    <section
      id="includes"
      aria-labelledby="includes-h2"
      className="bg-[#fafafa] px-5 py-16 sm:py-20"
    >
      <div className="max-w-landing mx-auto flex flex-col items-center gap-10">
        <SectionReveal className="text-center">
          <h2
            id="includes-h2"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-carbon tracking-tight"
          >
            ¿Qué incluye exactamente?
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
          {/* Block A */}
          <SectionReveal delay={0.05}>
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#eaeaea] shadow-card h-full">
              <p className="font-bold text-base sm:text-lg text-carbon mb-5">
                📘 La guía contiene:
              </p>
              <ul className="flex flex-col gap-3.5" role="list">
                {guideItems.map((item, i) => (
                  <CheckItem key={item} text={item} delay={0.08 + i * 0.07} />
                ))}
              </ul>
            </div>
          </SectionReveal>

          {/* Block B */}
          <SectionReveal delay={0.12}>
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#eaeaea] shadow-card h-full">
              <p className="font-bold text-base sm:text-lg text-carbon mb-5">
                🎁 Bonus incluidos:
              </p>
              <ul className="flex flex-col gap-3.5" role="list">
                {bonusItems.map((item, i) => (
                  <CheckItem key={item} text={item} delay={0.12 + i * 0.07} />
                ))}
              </ul>
            </div>
          </SectionReveal>
        </div>

        <SectionReveal delay={0.2} className="flex justify-center w-full">
          <WhatsAppButton label="👉 QUIERO MI GUÍA" section="includes" />
        </SectionReveal>
      </div>
    </section>
  );
}
