import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  let nombre: string;
  let apellido: string;
  let celular: string;
  let payment_id: string | null;
  let preference_id: string | null;

  try {
    const body = await req.json();
    nombre = (body.nombre ?? "").trim();
    apellido = (body.apellido ?? "").trim();
    celular = (body.celular ?? "").trim();
    payment_id = body.payment_id ?? null;
    preference_id = body.preference_id ?? null;
  } catch {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  if (!nombre || !apellido || !celular) {
    return NextResponse.json(
      { error: "Nombre, apellido y celular son obligatorios." },
      { status: 400 }
    );
  }

  // Si hay payment_id usamos upsert para evitar duplicados si el usuario
  // recarga la página o envía el formulario más de una vez.
  const record = {
    nombre_form: nombre,
    apellido_form: apellido,
    celular_form: celular,
    payment_id: payment_id ?? undefined,
    preference_id: preference_id ?? undefined,
  };

  // Intento 1: guardar con todos los campos (payment_id, preference_id)
  let { error: dbError } = payment_id
    ? await supabase.from("clientes").upsert(record, { onConflict: "payment_id" })
    : await supabase.from("clientes").insert(record);

  // Intento 2: si falló por columnas inexistentes, guardar solo los campos base
  if (dbError) {
    console.warn("[save-cliente] Reintentando sin campos MP:", dbError.message);
    ({ error: dbError } = await supabase.from("clientes").insert({
      nombre_form: nombre,
      apellido_form: apellido,
      celular_form: celular,
    }));
  }

  if (dbError) {
    console.error("[save-cliente] Supabase error:", dbError.message);
    return NextResponse.json(
      { error: "No se pudieron guardar los datos. Intentá de nuevo." },
      { status: 500 }
    );
  }

  // ── Disparar n8n con todos los datos del cliente ──────────────────────────
  try {
    await fetch(
      "https://setteriaarete-n8n.ts3f2b.easypanel.host/webhook/mercadopago-webhook",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_form: nombre,
          apellido_form: apellido,
          celular_form: celular,
          payment_id,
          preference_id,
          mp_status: "approved",
        }),
      }
    );
  } catch (err) {
    // No bloqueamos la respuesta al cliente si n8n falla
    console.error("[save-cliente] n8n webhook error:", err);
  }

  return NextResponse.json({ ok: true });
}
