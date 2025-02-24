export const capitaliceString = (cadena: string) => {
  const search = cadena.slice(0)
  const firshUpper = search.charAt(0).toUpperCase()
  const stringAppLower = search.slice(1)
  return `${firshUpper + stringAppLower}`
}
