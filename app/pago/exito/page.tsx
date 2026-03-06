"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function PagoExitoContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id") ?? searchParams.get("collection_id");
  const status = searchParams.get("status") ?? searchParams.get("collection_status");

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [celular, setCelular] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/save-cliente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido, celular, payment_id: paymentId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "No se pudieron guardar los datos. Intentá de nuevo.");
        return;
      }
      setDone(true);
    } catch {
      setError("Error de conexión. Verificá tu internet e intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-5 py-16 bg-[#f0fdf4]">
      <div className="bg-white rounded-2xl border border-[#d1fae5] shadow-card px-8 py-10 max-w-md w-full">

        {/* Confirmación MP */}
        <div className="flex flex-col items-center text-center mb-8 pb-8 border-b border-[#d1fae5]">
          <div className="bg-[#dcfce7] rounded-full p-4 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#16a34a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-carbon mb-1">¡Tu compra fue aprobada!</h1>
          <p className="text-sm text-[#16a34a] font-semibold mb-2">Pago aprobado por MercadoPago</p>
          {(paymentId || status) && (
            <div className="inline-flex flex-col gap-1 bg-[#f0fdf4] rounded-xl px-4 py-3 text-xs text-gray-500 mt-2">
              {status && <span>Estado: <span className="font-semibold text-[#16a34a]">{status === "approved" ? "Aprobado ✓" : status}</span></span>}
              {paymentId && <span>N° de pago: <span className="font-semibold text-gray-700">{paymentId}</span></span>}
            </div>
          )}
        </div>

        {/* Form o confirmación final */}
        {done ? (
          <div className="flex flex-col items-center text-center gap-4">
            <div className="bg-[#dcfce7] rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#16a34a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-carbon">¡Todo listo!</h2>
            <p className="text-sm text-metal-mid">Recibimos tus datos. En breve te enviamos la guía por WhatsApp.</p>
            <p className="text-xs text-metal-mid mt-2">
              ¿No recibiste nada en 10 minutos?{" "}
              <a href={`https://wa.me/5493883119606?text=${encodeURIComponent("Hola, acabo de realizar el pago y no recibí la guía.")}`} target="_blank" rel="noopener noreferrer" className="text-[#25D366] underline font-semibold">
                Escribínos por WhatsApp
              </a>
            </p>
            <Link href="/" className="mt-2 inline-block bg-carbon text-white rounded-xl px-6 py-3 text-sm font-semibold hover:opacity-80 transition-opacity">Volver al inicio</Link>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-bold text-carbon mb-1">Para completar la entrega</h2>
            <p className="text-sm text-metal-mid mb-6">Ingresá tus datos para enviarte la guía por WhatsApp.</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre <span className="text-red-500">*</span></label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required placeholder="Ej: María" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-mp focus:border-transparent transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Apellido <span className="text-red-500">*</span></label>
                <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} required placeholder="Ej: González" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-mp focus:border-transparent transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Celular <span className="text-red-500">*</span></label>
                <input type="tel" value={celular} onChange={(e) => setCelular(e.target.value)} required placeholder="Ej: 11 1234-5678" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-mp focus:border-transparent transition" />
              </div>
              {error && <p className="text-red-500 text-xs text-center">⚠️ {error}</p>}
              <button type="submit" disabled={loading} className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold rounded-xl min-h-[52px] px-6 py-3 text-sm sm:text-base transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? (
                  <><svg className="animate-spin h-4 w-4 text-white shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg><span>Guardando...</span></>
                ) : "✅ Confirmar mis datos"}
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}

export default function PagoExitoPage() {
  return (
    <Suspense fallback={<main className="min-h-screen flex items-center justify-center bg-[#f0fdf4]"><div className="text-sm text-gray-500">Cargando...</div></main>}>
      <PagoExitoContent />
    </Suspense>
  );
}