/**
 * @description Funcion que retorna un GUID (Globally Unique Identifier)
 */
export const generateGuid = () => {
  const guid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xg]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
  return guid;
};
