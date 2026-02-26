import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pago pendiente – Centro Jurídico NOA",
  robots: { index: false },
};

export default function PagoPendientePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-5 py-16 bg-[#fffbeb]">
      <div className="bg-white rounded-2xl border border-[#fde68a] shadow-card px-8 py-10 max-w-md w-full text-center">
        {/* Ícono */}
        <div className="flex justify-center mb-4">
          <div className="bg-[#fef3c7] rounded-full p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-[#d97706]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-carbon mb-2">Pago en revisión</h1>
        <p className="text-metal-mid text-sm mb-2">
          Tu pago está siendo procesado. Esto puede tardar unos minutos.
        </p>
        <p className="text-metal-mid text-sm mb-6">
          Cuando se confirme, te enviamos la guía automáticamente. Si tenés
          alguna duda, escribinos.
        </p>

        <div className="flex flex-col gap-3">
          <a
            href={`https://wa.me/5493883119606?text=${encodeURIComponent("Hola, mi pago de la guía está en estado pendiente. ¿Me pueden ayudar?")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#25D366] text-white rounded-xl px-6 py-3 text-sm font-semibold hover:bg-[#1EBE5D] transition-colors"
          >
            👋 Consultar por WhatsApp
          </a>
          <Link
            href="/"
            className="inline-block text-metal-mid text-sm hover:underline"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
