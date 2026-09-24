const formatters = new Map<number, Intl.NumberFormat>();

/** Formats a number with Turkish separators, e.g. 1250000 -> "1.250.000". */
export function formatNumber(value: number, decimals = 0): string {
  let formatter = formatters.get(decimals);
  if (!formatter) {
    formatter = new Intl.NumberFormat("tr-TR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    formatters.set(decimals, formatter);
  }
  return formatter.format(value);
}

/** Short lira amounts for dense UI: 2480000 -> "2,48 Mn ₺", 412000 -> "412 bin ₺". */
export function formatLiraCompact(value: number): string {
  if (Math.abs(value) >= 1_000_000) return `${formatNumber(value / 1_000_000, 2)} Mn ₺`;
  if (Math.abs(value) >= 1_000) return `${formatNumber(value / 1_000, 0)} bin ₺`;
  return `${formatNumber(value, 0)} ₺`;
}

/** Signed change with a Turkish percent sign: 18.4 -> "+%18,4", -7.5 -> "−%7,5". */
export function formatSignedPercent(value: number, decimals = 0): string {
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return `${sign}%${formatNumber(Math.abs(value), decimals)}`;
}
