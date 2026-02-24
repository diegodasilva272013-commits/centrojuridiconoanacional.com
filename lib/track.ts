export type TrackSection =
  | "hero"
  | "video"
  | "includes"
  | "forwho"
  | "price"
  | "faq"
  | "final"
  | "sticky";

/**
 * Envía un evento de tracking al backend sin bloquear la navegación.
 */
export async function trackCTAClick(section: TrackSection): Promise<void> {
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "cta_click",
        section,
        ts: Date.now(),
        userAgent: navigator.userAgent,
      }),
    });
  } catch {
    // silencioso – nunca bloquear al usuario
  }
}
