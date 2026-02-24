"use client";

import SectionReveal from "./SectionReveal";
import { motion, useReducedMotion } from "framer-motion";

const faqs = [
  {
    q: "¿Es por mes?",
    a: "No, es pago único. Pagás una sola vez y la guía es tuya para siempre.",
  },
  {
    q: "¿Sirve en mi provincia?",
    a: "Sí, aplica en todo el país. Es ley nacional (Ley 24.476 y Ley 27.705).",
  },
  {
    q: "¿Cuándo la recibo?",
    a: "El mismo día, tras verificar el pago. Te llega por WhatsApp.",
  },
  {
    q: "¿Es digital?",
    a: "Sí, se envía en PDF al número de WhatsApp con el que contactaste.",
  },
];

export default function FAQ() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="faq"
      aria-labelledby="faq-h2"
      className="bg-white px-5 py-16 sm:py-20"
    >
      <div className="max-w-landing mx-auto flex flex-col items-center gap-10">
        <SectionReveal className="text-center">
          <h2
            id="faq-h2"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-carbon tracking-tight"
          >
            Preguntas frecuentes
          </h2>
        </SectionReveal>

        <div className="w-full max-w-[720px] flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={prefersReduced ? {} : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}
            >
              <details className="group bg-[#fafafa] border border-[#eaeaea] rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer font-semibold text-carbon text-sm sm:text-base select-none hover:bg-[#f0f0f0] transition-colors duration-150">
                  {faq.q}
                  <svg
                    className="chevron w-4 h-4 flex-shrink-0 text-metal-mid"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="px-5 pb-5 pt-1 text-metal-mid text-sm sm:text-base leading-relaxed">
                  {faq.a}
                </div>
              </details>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
