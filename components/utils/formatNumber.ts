// Esta funcion me retorna un numero como string formateado a dos decimales y con puntos
// Recibe dos parametros, el numero y la cantidad de decimales deceados en el numero de retorno

export const formatNumToStr = (
  number: number | string,
  countDecimales?: number,
): string => {
  const intNumber = parseFloat(number.toString());
  const formatDouble = new Intl.NumberFormat("en-DE", {
    maximumFractionDigits: countDecimales ?? 2,
  });
  return formatDouble.format(intNumber);
};

export const formatNumCompact = (
  number: number | string,
  countDecimales?: number,
): string => {
  const intNumber = parseFloat(number.toString());
  return intNumber.toFixed(countDecimales ?? 2);
};

/**
 * Formatea un number a dos decimales
 */
export const formatNumToNum = (
  number: number | string,
  countDecimales?: number,
): number => {
  const numberParsed = parseFloat(number.toString());
  if (!isNaN(numberParsed)) {
    const formatDouble = Number(numberParsed.toFixed(countDecimales ?? 2));
    return formatDouble;
  }
  return 0;
};
