import { Item, MultipleAttributes } from "../interface/productList";
import { calculateValueTax } from "./calculateTaxItem";
import { formatNumCompact } from "./formatNumber";

export interface Group {
  id: number;
  name: string;
}

export type ItensInvoice = {
  id?: number;
  item?: Item;
  name?: string;
  group?: Group;
  tax?: MultipleAttributes;
  quantity: number;
  price: number;
  taxes: MultipleAttributes[];
  discount: number;
  discounts?: {
    Code: string;
    Percentage: string;
    Amount: string;
    BaseAmount: string;
    Reason: string;
  }[];
};

type Props<T extends ItensInvoice> = {
  type: "buy" | "sell";
  product: T;
};

export const calculateInvoiceItem = <T extends ItensInvoice>({
  type,
  product,
}: Props<T>) => {
  // Total porcentages, Ej, IVA
  const priceIsNan = isNaN(parseFloat(product.price?.toString()));

  const taxes = product.taxes ?? [];
  const price = priceIsNan ? 0 : parseFloat(product.price?.toString() ?? "0");
  const quantity = product.quantity ?? 1;
  const discount = product.discount ?? 0;

  const { bagValue, totalPercentage, totalValue } = totalTaxPer(taxes);

  // Precio Producto sin impuestos
  let basePrice = 0;
  // Precio producto con impuestos
  let taxPrice = 0;
  // Valor total del los impuestos para el producto
  let taxValueAmount = 0;

  // Recibe precio sin impuestos

  if (type === "buy") {
    taxPrice = price * ((100 + totalPercentage) / 100) + totalValue;
    basePrice = price;
    taxValueAmount =
      (basePrice - discount) * (totalPercentage / 100) + totalValue;
  }
  // Recibe precio con impuestos
  if (type === "sell") {
    taxPrice = price;
    basePrice = (price - totalValue) / ((100 + totalPercentage) / 100);
    taxValueAmount =
      (basePrice - discount) * (totalPercentage / 100) + totalValue;
  }

  // Descuentos + impuestos
  const taxDiscount = discount * ((100 + totalPercentage) / 100);

  // Precio por unidad del producto
  const priceUnit = taxPrice - totalValue - taxDiscount;

  // Subtotal del producto incluido la cantidad
  const subtotalItem = priceUnit + totalValue;

  const baseWithTax = priceUnit + totalValue;

  const valueAmount = basePrice * quantity;
  const discountAmount = discount * quantity;
  const taxAmount = taxValueAmount * quantity + bagValue;
  const subTotalAmount = subtotalItem * quantity + bagValue;
  const totalAmount = subTotalAmount - discountAmount + taxAmount;
  const SubTotalAmount = valueAmount - discountAmount;

  const taxesCalculateAmount = taxes.map((element) =>
    calculateValueTax(basePrice - discount, quantity, element),
  );

  // Calculate and format discounts
  const productFormated = formatProduct(basePrice, discount, quantity, product);

  const objectReturn = {
    ...productFormated,
    discount,
    // discounts,
    basePrice,
    baseWithTax,
    unitValue: basePrice,
    valueAmount,
    discountAmount,
    taxAmount,
    subTotalAmount,
    SubTotalAmount,
    totalAmount,
    taxes: taxesCalculateAmount,
  };
  return objectReturn;
};

export const totalTaxPer = (
  taxes: MultipleAttributes[],
  priceProduct?: number,
) => {
  let totalPercentage = taxes.reduce(
    (accumulator: number, tax) =>
      tax.isUnitAmount !== undefined && !tax.isUnitAmount
        ? accumulator + tax.percentage
        : tax?.type === "percentage" || tax?.concept === "percentage"
          ? accumulator + (tax?.value ?? tax?.percentage ?? 0)
          : 0 + accumulator,
    0,
  );
  const totalValue = taxes.reduce((accumulator, tax) => {
    if (
      parseInt(tax?.code?.toString() ?? "34") === 34 ||
      (parseInt(tax?.id?.toString()) !== 220 && tax?.id)
    ) {
      return tax?.isUnitAmount ||
        tax?.type === "amount" ||
        tax?.concept === "amount"
        ? (tax?.value ?? tax?.amount ?? 0 + accumulator)
        : 0 + accumulator;
    }
    return 0 + accumulator;
  }, 0);

  const bagValue = taxes.reduce((accumulator, tax) => {
    if (
      parseInt(tax?.code?.toString() ?? "22") === 22 ||
      (tax?.id && parseInt(tax?.id?.toString()) === 220)
    ) {
      return tax?.isUnitAmount ||
        tax?.type === "amount" ||
        tax?.concept === "amount"
        ? (tax?.value ?? tax?.amount ?? 0 + accumulator)
        : 0 + accumulator;
    }
    return 0 + accumulator;
  }, 0);

  if (priceProduct) {
    totalPercentage = priceProduct - priceProduct / (totalPercentage / 100 + 1);
  }
  return { totalPercentage, totalValue, bagValue };
};

const formatProduct = <T extends ItensInvoice>(
  unitValue: number,
  discount: number,
  quantity: number,
  product: T,
): T => {
  const percentage = discount !== 0 ? (discount / (unitValue ?? 0)) * 100 : 0;
  const baseAmount = (unitValue ?? 0) * quantity;
  const discounts = [
    {
      Code: "00",
      Percentage: formatNumCompact(percentage),
      Amount: formatNumCompact(discount),
      BaseAmount: formatNumCompact(baseAmount),
      Reason: "razon/motivo del descuento",
    },
  ];
  let item = product.item ?? { id: product.id, name: product.name };
  if (product.group) {
    item = { ...item, group: product.group };
  }
  if (product.tax) {
    item = { ...item, tax: product.tax };
  }
  // Pendiente por agregar
  /* 
    attorney: {id:0, name:''}
*/

  return {
    ...product,
    parentId: product.id ?? 0,
    item,
    discounts,
  };
};
