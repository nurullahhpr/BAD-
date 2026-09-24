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
