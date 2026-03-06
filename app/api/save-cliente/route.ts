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

  let dbError;

  if (payment_id) {
    // Upsert: si ya existe una fila con ese payment_id, actualiza los datos del form.
    ({ error: dbError } = await supabase
      .from("clientes")
      .upsert(record, { onConflict: "payment_id" }));
  } else {
    // Sin payment_id (no debería pasar) hacemos insert normal.
    ({ error: dbError } = await supabase.from("clientes").insert(record));
  }

  if (dbError) {
    console.error("[save-cliente] Supabase error:", dbError.message);
    return NextResponse.json(
      { error: "No se pudieron guardar los datos. Intentá de nuevo." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
