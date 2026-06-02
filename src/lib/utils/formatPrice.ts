export function formatPrice(price: string | number): string {
  const num = typeof price === "string" ? parseFloat(price.replace(/[^0-9.]/g, "")) : price;
  if (isNaN(num)) return "$0";
  return "$" + Math.round(num).toLocaleString("es-AR");
}
