export * from "./settings"
export * from "./data"

export function toFraction(decimal: number, epsilon = 1.0e-10) {
  let numerator = 1;
  let denominator = 1;

  while (Math.abs(numerator / denominator - decimal) > epsilon) {
    if (numerator / denominator < decimal) {
      numerator++;
    } else {
      denominator++;
      numerator = Math.round(decimal * denominator);
    }
  }

  return denominator === 1 ? `${numerator}` : `${numerator}/${denominator}`;
}

export function camelToSentence(str: string) {
  const formatted = str.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
