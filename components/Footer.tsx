"use client";

import Image from "next/image";
import { useState } from "react";

export default function Footer() {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="bg-carbon border-t border-white/[0.07] px-5 py-10">
      <div className="max-w-landing mx-auto flex flex-col items-center gap-6 text-center">

        {/* Logo */}
        <div className="flex items-center justify-center">
          {logoError ? (
            <div className="flex items-center gap-2 select-none" aria-label="Centro Jurídico NOA">
              <div className="flex items-center justify-center w-[40px] h-[40px] border border-metal-light/25 rounded">
                <span className="text-white font-bold text-base tracking-tight">CJ</span>
              </div>
              <div className="flex flex-col leading-none text-left">
                <span className="text-white text-[12px] font-bold tracking-[0.24em] uppercase">NOA</span>
                <span className="text-metal-mid text-[9px] tracking-[0.16em] uppercase mt-0.5">Centro Jurídico</span>
              </div>
            </div>
          ) : (
            <Image
              src="/logo-cjnoa.jpg"
              alt="Centro Jurídico NOA"
              width={140}
              height={44}
              className="h-[40px] w-auto object-contain opacity-60 hover:opacity-90 transition-opacity duration-300"
              onError={() => setLogoError(true)}
            />
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1.5">
          <p className="text-white/80 text-sm font-medium tracking-wide">
            Centro Jurídico NOA
          </p>
          <p className="text-metal-mid text-xs tracking-wide">
            Dr. Fabricio Reyes&nbsp;•&nbsp;Especialista en Derecho Previsional
          </p>
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-white/[0.12]" />

        {/* Legal */}
        <p className="text-metal-mid/60 text-[11px] leading-relaxed max-w-sm">
          © {new Date().getFullYear()} Centro Jurídico NOA. Todos los derechos reservados.
          <br />
          La guía es un producto digital informativo. No constituye asesoramiento legal directo.
        </p>
      </div>
    </footer>
  );
}
