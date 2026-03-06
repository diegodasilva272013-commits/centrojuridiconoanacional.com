import { NextRequest, NextResponse } from "next/server";
import MercadoPagoConfig, { Preference } from "mercadopago";
import { supabase } from "@/lib/supabase";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function POST(req: NextRequest) {
  const token = process.env.MP_ACCESS_TOKEN;

  if (!token || token.startsWith("TEST-REEMPLAZA")) {
    return NextResponse.json(
      { error: "No configuraste el Access Token de MercadoPago." },
      { status: 500 }
    );
  }

  let nombre_form: string;
  let apellido_form: string;
  let celular_form: string;

  try {
    const body = await req.json();
    nombre_form = (body.nombre_form ?? "").trim();
    apellido_form = (body.apellido_form ?? "").trim();
    celular_form = (body.celular_form ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  if (!nombre_form || !apellido_form || !celular_form) {
    return NextResponse.json(
      { error: "Nombre, apellido y celular son obligatorios." },
      { status: 400 }
    );
  }

  // ── 1. Guardar cliente en Supabase ────────────────────────────────────────
  const external_reference = crypto.randomUUID();

  const { error: dbError } = await supabase.from("clientes").insert({
    nombre_form,
    apellido_form,
    celular_form,
    external_reference,
  });

  if (dbError) {
    console.error("[checkout] Supabase insert error:", dbError.message);
    // No bloqueamos el pago por un error de DB
  }

  // ── 2. Crear preferencia en MercadoPago ───────────────────────────────────
  try {
    const client = new MercadoPagoConfig({ accessToken: token });
    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            id: "guia-jubilaciones-noa",
            title: "Guía para jubilarte con Noa – Plan de Jubilación",
            description:
              "Guía digital paso a paso para tramitar tu jubilación en Argentina.",
            quantity: 1,
            unit_price: 21900,
            currency_id: "ARS",
          },
        ],
        payer: {
          name: nombre_form,
          surname: apellido_form,
          phone: { number: celular_form },
        },
        external_reference,
        back_urls: {
          success: `${BASE_URL}/pago/exito`,
          failure: `${BASE_URL}/pago/error`,
          pending: `${BASE_URL}/pago/pendiente`,
        },
        auto_return: "approved",
        statement_descriptor: "NOA JUBILACIONES",
      },
    });

    return NextResponse.json({ init_point: result.init_point });
  } catch (err: unknown) {
    let msg = "Error desconocido";
    if (err instanceof Error) msg = err.message;
    else if (typeof err === "object" && err !== null) msg = JSON.stringify(err);
    console.error("[checkout] MP error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
