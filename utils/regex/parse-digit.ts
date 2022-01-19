export const parseDigit = (str: string) => {
  return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
