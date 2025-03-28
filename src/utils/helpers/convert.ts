export const toNumber = (value: string): number => {
  const num = parseFloat(value)
  return isNaN(num) ? 0 : num
}