/**
 * Único helper para construir el link de WhatsApp.
 * Usarlo en TODOS los CTAs.
 */
export function buildWhatsAppUrl(): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "5491155555555";
  const message =
    process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ?? "QUIERO MI GUÍA";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
