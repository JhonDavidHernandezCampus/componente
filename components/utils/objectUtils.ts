/**
 * Un tipo que representa un objeto con claves de tipo string y valores de cualquier tipo.
 */
type FlattenedObject = { [key: string]: any };

/**
 * Aplana un objeto profundamente anidado en un objeto de un solo nivel con claves separadas por puntos.
 *
 * @param obj - El objeto que se va a aplanar.
 * @param prefix - El prefijo utilizado para las claves durante el proceso de aplanamiento. Por defecto es una cadena vacía.
 * @param result - El objeto donde se almacenan los pares clave-valor aplanados. Por defecto es un objeto vacío.
 * @returns Un objeto aplanado con claves separadas por puntos.
 *
 * @example
 * const nestedObject = {
 *   a: {
 *     b: {
 *       c: 1,
 *       d: 2
 *     },
 *     e: 3
 *   },
 *   f: 4
 * };
 *
 * const flattened = flattenObject(nestedObject);
 * console.log(flattened);
 * // Resultado: { 'a.b.c': 1, 'a.b.d': 2, 'a.e': 3, 'f': 4 }
 */
export const flattenObject = (
  obj: { [key: string]: any },
  prefix = "",
  result: FlattenedObject = {},
): FlattenedObject => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        flattenObject(value, newKey, result);
      } else {
        result[newKey] = value;
      }
    }
  }
  return result;
};

/**
 * Desaplana un objeto aplanado a su forma anidada original.
 *
 * @param obj - El objeto aplanado a convertir.
 * @returns El objeto anidado resultante.
 */
export const unflattenObject = (
  obj: FlattenedObject,
): { [key: string]: any } => {
  const result: { [key: string]: any } = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const keys = key.split(".");
      let currentLevel = result;

      for (let i = 0; i < keys.length; i++) {
        const subKey = keys[i];

        if (i === keys.length - 1) {
          currentLevel[subKey] = obj[key];
        } else {
          if (!currentLevel[subKey]) {
            currentLevel[subKey] = {};
          }
          currentLevel = currentLevel[subKey];
        }
      }
    }
  }

  return result;
};
