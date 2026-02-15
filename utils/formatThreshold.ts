export default function formatSmartThreshold(
  value: number, 
  precision: number = 1
) {
  const threshold = Math.pow(10, -precision);
  const roundedValue = +value.toFixed(precision);

  if (value !== 0 && roundedValue < threshold) {
    return `< ${threshold.toFixed(precision)}`;
  }

  return roundedValue;
}