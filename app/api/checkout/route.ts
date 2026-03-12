import { NextRequest, NextResponse } from "next/server";
import MercadoPagoConfig, { Preference } from "mercadopago";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function POST(_req: NextRequest) {
  const token = process.env.MP_ACCESS_TOKEN;

  if (!token || token.startsWith("TEST-REEMPLAZA")) {
    return NextResponse.json(
      { error: "No configuraste el Access Token de MercadoPago." },
      { status: 500 }
    );
  }

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
            unit_price: 100,
            currency_id: "ARS",
          },
        ],
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
