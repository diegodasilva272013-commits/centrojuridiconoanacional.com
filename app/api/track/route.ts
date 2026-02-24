import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import path from "path";

// ─── In-memory store ─────────────────────────────────────────────────────────
type CTAEvent = {
  event: string;
  section: string;
  ts: number;
  userAgent: string;
  receivedAt: string;
};

const VALID_SECTIONS = new Set([
  "hero",
  "video",
  "includes",
  "forwho",
  "price",
  "faq",
  "final",
  "sticky",
]);

const eventsStore: CTAEvent[] = [];

const TMP_PATH = path.join("/tmp", "cjnoa-events.json");

async function persistEvent(event: CTAEvent) {
  try {
    let existing: CTAEvent[] = [];
    try {
      const raw = await readFile(TMP_PATH, "utf-8");
      existing = JSON.parse(raw);
    } catch {
      // archivo no existe aún – ok
    }
    existing.push(event);
    await writeFile(TMP_PATH, JSON.stringify(existing, null, 2), "utf-8");
  } catch {
    // /tmp puede no estar disponible en algunos runtimes – silencioso
  }
}

// ─── POST /api/track ──────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { event, section, ts, userAgent } = body;

    // Validación básica
    if (
      typeof event !== "string" ||
      typeof section !== "string" ||
      typeof ts !== "number" ||
      typeof userAgent !== "string"
    ) {
      return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
    }

    if (event !== "cta_click") {
      return NextResponse.json({ error: "unknown_event" }, { status: 400 });
    }

    if (!VALID_SECTIONS.has(section)) {
      return NextResponse.json({ error: "unknown_section" }, { status: 400 });
    }

    const record: CTAEvent = {
      event,
      section,
      ts,
      userAgent: userAgent.slice(0, 300), // limitar tamaño
      receivedAt: new Date().toISOString(),
    };

    eventsStore.push(record);
    console.log("[CJ NOA Track]", record);

    // Persistir en /tmp sin bloquear la respuesta
    persistEvent(record).catch(() => {});

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

// ─── GET /api/track (debug interno) ─────────────────────────────────────────
export async function GET() {
  return NextResponse.json(
    {
      count: eventsStore.length,
      events: eventsStore.slice(-50), // últimos 50
    },
    { status: 200 }
  );
}
