"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

// Ícono oficial de MercadoPago (SVG simplificado, colores de marca)
function MPIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 54 34"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Fondo azul redondeado */}
      <rect width="54" height="34" rx="6" fill="#009EE3" />
      {/* Letra "m" simplificada en blanco */}
      <text
        x="27"
        y="24"
        textAnchor="middle"
        fontSize="20"
        fontWeight="bold"
        fill="white"
        fontFamily="Arial, sans-serif"
      >
        mp
      </text>
    </svg>
  );
}

interface MercadoPagoButtonProps {
  label?: string;
  className?: string;
  size?: "default" | "large";
}

export default function MercadoPagoButton({
  label = "💳 COMPRAR CON MERCADO PAGO",
  className,
  size = "default",
}: MercadoPagoButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/create-preference", { method: "POST" });
      const data = await res.json();

      if (!res.ok || !data.init_point) {
        setError(data.error ?? "No se pudo iniciar el pago. Intentá de nuevo.");
        return;
      }

      // Redirigir a la página de pago de MercadoPago
      window.location.href = data.init_point;
    } catch {
      setError("Error de conexión. Verificá tu internet e intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-2 w-full sm:max-w-[420px]">
      <motion.button
        onClick={handleClick}
        disabled={loading}
        whileHover={loading ? {} : { scale: 1.025 }}
        whileTap={loading ? {} : { scale: 0.97 }}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 overflow-hidden",
          "bg-mp text-white font-semibold tracking-wide",
          "rounded-[14px] cursor-pointer select-none",
          "transition-colors duration-200 hover:bg-mp-hover",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mp focus-visible:ring-offset-2",
          "shadow-mp-btn active:shadow-none",
          "disabled:opacity-70 disabled:cursor-not-allowed",
          size === "large"
            ? "min-h-[56px] px-8 py-4 text-base sm:text-lg w-full"
            : "min-h-[52px] px-7 py-3 text-sm sm:text-base w-full",
          className
        )}
        aria-label="Comprar con MercadoPago"
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4 text-white shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            <span>Preparando pago...</span>
          </>
        ) : (
          label
        )}
      </motion.button>

      {error && (
        <p className="text-red-500 text-xs text-center max-w-[340px]">
          ⚠️ {error}
        </p>
      )}
    </div>
  );
}
