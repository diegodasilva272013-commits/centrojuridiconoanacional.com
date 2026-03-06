"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

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
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [celular, setCelular] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_form: nombre,
          apellido_form: apellido,
          celular_form: celular,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.init_point) {
        setError(data.error ?? "No se pudo iniciar el pago. Intentá de nuevo.");
        return;
      }

      window.location.href = data.init_point;
    } catch {
      setError("Error de conexión. Verificá tu internet e intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* ── Botón principal ── */}
      <div className="flex flex-col items-center gap-2 w-full sm:max-w-[420px]">
        <motion.button
          onClick={() => setShowModal(true)}
          whileHover={{ scale: 1.025 }}
          whileTap={{ scale: 0.97 }}
          className={cn(
            "relative inline-flex items-center justify-center gap-2 overflow-hidden",
            "bg-mp text-white font-semibold tracking-wide",
            "rounded-[14px] cursor-pointer select-none",
            "transition-colors duration-200 hover:bg-mp-hover",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mp focus-visible:ring-offset-2",
            "shadow-mp-btn active:shadow-none",
            size === "large"
              ? "min-h-[56px] px-8 py-4 text-base sm:text-lg w-full"
              : "min-h-[52px] px-7 py-3 text-sm sm:text-base w-full",
            className
          )}
          aria-label="Comprar con MercadoPago"
        >
          {label}
        </motion.button>
      </div>

      {/* ── Modal con formulario ── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowModal(false);
            }}
          >
            <motion.div
              key="modal-card"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 relative"
            >
              {/* Cerrar */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
                aria-label="Cerrar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              <h2 className="text-xl font-bold text-gray-900 mb-1">Antes de continuar</h2>
              <p className="text-sm text-gray-500 mb-6">Completá tus datos para procesar la compra.</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    placeholder="Ej: María"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-mp focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Apellido <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                    placeholder="Ej: González"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-mp focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Celular <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={celular}
                    onChange={(e) => setCelular(e.target.value)}
                    required
                    placeholder="Ej: 11 1234-5678"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-mp focus:border-transparent transition"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-xs text-center">⚠️ {error}</p>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={loading ? {} : { scale: 1.02 }}
                  whileTap={loading ? {} : { scale: 0.98 }}
                  className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-mp hover:bg-mp-hover text-white font-semibold rounded-xl min-h-[52px] px-6 py-3 text-sm sm:text-base transition-colors shadow-mp-btn disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      <span>Procesando...</span>
                    </>
                  ) : (
                    "💳 Continuar con la compra"
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
