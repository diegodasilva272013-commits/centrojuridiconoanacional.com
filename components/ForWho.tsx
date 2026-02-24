"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionReveal from "./SectionReveal";

const items = [
  "Personas que no llegan con los años de aportes",
  "Personas que quieren entender antes de ir a ANSES",
  "Personas que quieren hacerlo por su cuenta",
];

export default function ForWho() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="forwho"
      aria-labelledby="forwho-h2"
      className="bg-white px-5 py-16 sm:py-20"
    >
      <div className="max-w-landing mx-auto flex flex-col items-center gap-10">
        <SectionReveal className="text-center">
          <h2
            id="forwho-h2"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-carbon tracking-tight"
          >
            ¿Para quién es esta guía?
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.08} className="w-full max-w-[640px]">
          <ul className="flex flex-col gap-4" role="list">
            {items.map((item, i) => (
              <motion.li
                key={item}
                initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.09, ease: "easeOut" }}
                className="flex items-start gap-4 bg-[#fafafa] border border-[#eaeaea] rounded-xl px-5 py-4"
              >
                <span className="text-wa font-bold text-lg flex-shrink-0 mt-[1px]" aria-hidden="true">✔</span>
                <span className="text-carbon text-sm sm:text-base leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </ul>
        </SectionReveal>

        <SectionReveal delay={0.28}>
          <p className="text-metal-mid text-sm sm:text-base text-center font-medium bg-[#fafafa] border border-[#eaeaea] rounded-xl px-6 py-3">
            Aplica en todo el país (ley nacional).
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
