/**
 * Parses WooCommerce price strings and formats as ARS without decimals.
 * WooCommerce returns prices in Argentine format: "$&nbsp;15.000,00"
 * where . = thousands separator and , = decimal separator.
 */
export function formatPrice(price: string | number | null | undefined): string {
  if (price === null || price === undefined) return "Consultar precio";

  if (typeof price === "number") {
    if (isNaN(price)) return "Consultar precio";
    return "$" + Math.round(price).toLocaleString("es-AR");
  }

  // Strip HTML entities (&nbsp; etc), currency symbols, spaces
  let cleaned = price
    .replace(/&[a-z]+;/gi, " ")   // &nbsp; → space
    .replace(/[^0-9.,]/g, "")      // keep only digits, dots, commas
    .trim();

  if (!cleaned) return "Consultar precio";

  // WooCommerce ARS format: 15.000,00 (dot=thousands, comma=decimal)
  // Remove thousands dots, replace decimal comma with dot
  cleaned = cleaned.replace(/\./g, "").replace(",", ".");

  const num = parseFloat(cleaned);
  if (isNaN(num)) return "Consultar precio";

  return "$" + Math.round(num).toLocaleString("es-AR");
}
