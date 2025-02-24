//* Compoenents
// Impuestos
export { TaxView } from "./components/layout/TaxView";

// Tablas para la generacion de facturas
export { TableBuyComponent } from "./components/TableBuys/TableBuyComponent";
export { TableAccounting } from "./components/TableAccounting/TableBuyComponent";

// Componentes adicionales
export { SearchSelectedProduct } from "./components/searchProducts/SearchSelectedProduct";
export { WarningInvoice } from "./components/alerts/warningInvoice";
export { ImageRound } from "./components/utils/ImageRound";
export { TruncateText } from "./components/utils/TruncateText";
export {
  calculateProductBase,
  calculateTax,
  calculateTaxes,
} from "./components/utils/calculateTaxes";
// Format product
export { formatAccoutingProduct } from "./components/utils/formatAccoutingProduct";

export { AutoComplete } from "./components/autocomplete/AutoComplete";
export { SelectCustom } from "./components/JComponentes/CustomSelect";
export { Autocomplete } from "./components/JComponentes/Autocomplete";
export { SwitchTheme } from "./components/theme/SwichTheme";

// Funciones y utilidades
export { flattenObject, unflattenObject } from "./components/utils/objectUtils";
export { generateGuid } from "./components/utils/gererateGuid";
export {
  formatNumToNum,
  formatNumToStr,
  formatNumCompact,
} from "./components/utils/formatNumber";

export {
  calculateInvoiceItem,
  totalTaxPer,
} from "./components/utils/calculateCompleteTaxes";

/**
 * @description calcula el valor de todos los impuestos de un producto
 */
export { calculateValuesTaxItem } from "./components/utils/calculateTaxItem";

/**
 * Export of types
 * */

export type { ListArray } from "./components/autocomplete/AutoComplete";
