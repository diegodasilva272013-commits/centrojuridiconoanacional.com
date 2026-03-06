import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  let nombre: string;
  let apellido: string;
  let celular: string;
  let payment_id: string | null;

  try {
    const body = await req.json();
    nombre = (body.nombre ?? "").trim();
    apellido = (body.apellido ?? "").trim();
    celular = (body.celular ?? "").trim();
    payment_id = body.payment_id ?? null;
  } catch {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  if (!nombre || !apellido || !celular || !payment_id) {
    return NextResponse.json(
      { error: "Todos los campos son obligatorios." },
      { status: 400 }
    );
  }

  console.log("[save-cliente] payment_id recibido:", payment_id);

  const { error: dbError, data: updated } = await supabase
    .from("clientes")
    .update({
      nombre_form: nombre,
      apellido_form: apellido,
      celular_form: celular,
    })
    .ilike("mp_payment_id", `${payment_id}%`)
    .select();

  console.log("[save-cliente] filas actualizadas:", updated?.length ?? 0, "| error:", dbError?.message ?? "ninguno");

  if (dbError) {
    console.error("[save-cliente] Supabase error:", dbError.message);
    return NextResponse.json(
      { error: "No se pudieron guardar los datos. Intentá de nuevo." },
      { status: 500 }
    );
  }

  // Si no actualizó ninguna fila, insertar directamente
  if (!updated || updated.length === 0) {
    const { error: insertError } = await supabase.from("clientes").insert({
      nombre_form: nombre,
      apellido_form: apellido,
      celular_form: celular,
      mp_payment_id: payment_id,
    });
    if (insertError) {
      console.error("[save-cliente] Supabase insert error:", insertError.message);
      return NextResponse.json(
        { error: "No se pudieron guardar los datos. Intentá de nuevo." },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ ok: true });
}
