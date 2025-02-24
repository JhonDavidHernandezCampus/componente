export interface ProductList {
  index?: number;
  guid: string;
  id: number;
  name?: string;
  code?: string;
  barcode?: string;
  wooCode?: number;
  value?: number;
  costPrice?: number;
  image?: null;
  observations?: string;
  isInventory?: boolean;
  isAiu?: boolean;
  isFavorite?: boolean;
  discountAmount?: number;
  taxAmount?: number;
  subTotalAmount?: number;
  isStore?: boolean;
  isActive?: boolean;
  quantity: number;
  balanceQuantity?: number;
  status?: string;

  parentId?: number;
  isRemission?: boolean;
  basePrice: number; // <- base del producto (antes de Impuestos)
  group?: Group;
  unitValue?: number;
  salePrice?: number;
  taxes: MultipleAttributes[];
  discounts?: {
    Code: string;
    Percentage: string;
    Amount: string;
    BaseAmount: string;
    Reason: string;
  }[];

  bagValue?: number;
  totalPercentage?: number;

  charges?: MultipleAttributes[];
  retentions?: MultipleAttributes[];
  Taxes?: MultipleAttributes[];
  Discounts?: string;
  Charges?: MultipleAttributes[];
  Retentions?: MultipleAttributes[];

  SubTotalAmount?: number;

  // Properties for the product purchasing flow
  price: number;
  discount: number;
  description?: string;
  dateAdd?: string;
  baseWithTax?: number;
  valueAmount?: number;
  totalAmount?: number;
  item: Item;

  // Properties in case of Consepto
  Type?: "Devengo" | "Deduccion";
  Amount?: number;
}

export interface Group {
  id: number;
  name: string;
}

export interface Item {
  id: number;
  name: string;
  group?: Group;
  tax?: MultipleAttributes;
}
export interface MultipleAttributes {
  id: number | string;
  name: string;
  type?: "amount" | "percentage";
  value?: number; // valor del impuesto del producto en porcentaje
  authorization?: null;
  isUnitAmount?: boolean;
  document?: Group;
  category?: string;
  BaseAmount?: string;

  code?: string;
  percentage: number;
  // For bills
  amount?: number; //

  Code?: string;
  Amount?: number;
  Percentage?: number;
  TaxableAmount?: number; // modificado
  PerUnitAmount?: number; //
  Concept?: "amount" | "percentage" | "excluded" | "excluido" | "Excluido"; // Concepto si es de tipo pocentage o de tipo valor o si es IVA EXCLUIDO
  concept?: "amount" | "percentage" | "excluded" | "excluido" | "Excluido"; // Concepto si es de tipo pocentage o de tipo valor o si es IVA EXCLUIDO
}

interface Tax {
  id: number;
  name: string;
  value: number;
  isUnitAmount: boolean;
  percentage: number;
  category: string;
}
