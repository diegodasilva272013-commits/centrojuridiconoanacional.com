import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pago rechazado – Centro Jurídico NOA",
  robots: { index: false },
};

export default function PagoErrorPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-5 py-16 bg-[#fef2f2]">
      <div className="bg-white rounded-2xl border border-[#fecaca] shadow-card px-8 py-10 max-w-md w-full text-center">
        {/* Ícono */}
        <div className="flex justify-center mb-4">
          <div className="bg-[#fee2e2] rounded-full p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-[#dc2626]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-carbon mb-2">El pago no se completó</h1>
        <p className="text-metal-mid text-sm mb-6">
          Hubo un problema con el pago o fue cancelado. Podés volver a intentarlo
          o contactarnos si necesitás ayuda.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/#price"
            className="inline-block bg-mp text-white rounded-xl px-6 py-3 text-sm font-semibold hover:bg-mp-hover transition-colors"
          >
            💳 Intentar de nuevo
          </Link>
          <a
            href={`https://wa.me/5493883119606?text=${encodeURIComponent("Hola, tuve un problema al pagar la guía. ¿Me pueden ayudar?")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#25D366] text-white rounded-xl px-6 py-3 text-sm font-semibold hover:bg-[#1EBE5D] transition-colors"
          >
            👋 Contactar por WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
