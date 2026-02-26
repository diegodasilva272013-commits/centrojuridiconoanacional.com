import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "¡Pago exitoso! – Centro Jurídico NOA",
  robots: { index: false },
};

export default function PagoExitoPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-5 py-16 bg-[#f0fdf4]">
      <div className="bg-white rounded-2xl border border-[#d1fae5] shadow-card px-8 py-10 max-w-md w-full text-center">
        {/* Ícono */}
        <div className="flex justify-center mb-4">
          <div className="bg-[#dcfce7] rounded-full p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-[#16a34a]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-carbon mb-2">¡Pago recibido!</h1>
        <p className="text-metal-mid text-sm mb-6">
          Tu compra fue procesada correctamente. En breve vas a recibir un
          mensaje de WhatsApp con tu guía y los pasos para acceder.
        </p>

        <p className="text-xs text-metal-mid mb-6">
          ¿No recibiste nada en 10 minutos?{" "}
          <a
            href={`https://wa.me/5493883119606?text=${encodeURIComponent("Hola, acabo de realizar el pago y no recibí la guía.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#25D366] underline font-semibold"
          >
            Escribinos por WhatsApp
          </a>
        </p>

        <Link
          href="/"
          className="inline-block bg-carbon text-white rounded-xl px-6 py-3 text-sm font-semibold hover:opacity-80 transition-opacity"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
