import { MultipleAttributes } from "../interface/productList";

export const calculateValuesTaxItem = (
  basePrice: number,
  quantity: number,
  taxes: MultipleAttributes[],
) => {
  return taxes.map((tax) => {
    const typeTaxValidate = tax.isUnitAmount
      ? tax.isUnitAmount
      : tax?.type === "amount" || tax.concept === "amount";

    let taxValue = 0;

    // Es valor fijo
    if (typeTaxValidate && parseInt(tax.id.toString()) !== 220 && tax.value) {
      taxValue = tax.value * quantity;
    }
    // Es impuesto bolsa
    if (typeTaxValidate && parseInt(tax.id.toString()) === 220) {
      taxValue = tax.value ?? tax.amount ?? 0;
    }
    // Es porcentaje
    if (!typeTaxValidate) {
      const percentage = tax.percentage ?? tax.value;
      taxValue = basePrice * (percentage / 100) * quantity;
    }
    return {
      taxName: tax.name ?? "0",
      name: `Impuesto (${typeTaxValidate ? tax.name : `${tax.percentage ?? tax.value}%`})`,
      value: taxValue,
    };
  });
};

export const calculateValueTax = (
  basePrice: number,
  quantity: number,
  tax: MultipleAttributes,
): MultipleAttributes => {
  const typeTaxValidate = tax?.isUnitAmount
    ? tax.isUnitAmount
    : tax?.type === "amount" || tax.concept === "amount";

  let taxValue = 0;

  tax.id = tax.id === undefined ? 0 : tax.id;
  tax.code = tax.code === undefined ? "0" : tax.code;

  // Es valor fijo
  if (
    typeTaxValidate &&
    (parseInt(tax?.id?.toString()) === 901 ||
      parseInt(tax?.code?.toString()) === 34) &&
    tax.value
  ) {
    taxValue = tax.value * quantity;
  }

  // Es impuesto bolsa
  if (
    typeTaxValidate &&
    (parseInt(tax?.id?.toString()) === 220 ||
      parseInt(tax?.code?.toString()) === 22)
  ) {
    taxValue = tax.value ?? tax.amount ?? 0;
  }

  // Es porcentaje
  if (!typeTaxValidate) {
    const percentage = tax.percentage ?? tax.value;
    taxValue = basePrice * (percentage / 100) * quantity;
  }
  const Concept = typeTaxValidate ? "amount" : "percentage";
  const PerUnitAmount = typeTaxValidate ? taxValue : 0;
  const Percentage = !typeTaxValidate ? (tax?.percentage ?? tax.value) : 0;

  return {
    ...tax,
    amount: taxValue,
    TaxableAmount: basePrice,
    PerUnitAmount,
    Concept,
    Code: tax.code ? tax.code?.toString() : "",
    Amount: taxValue,
    Percentage,
  };
};
