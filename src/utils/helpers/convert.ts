
// convert the stringed value into a number.
export const toNumber = (value: string): number => {
  const num = parseFloat(value) // default state values will result in num = isNaN
  return isNaN(num) ? 0 : num
}