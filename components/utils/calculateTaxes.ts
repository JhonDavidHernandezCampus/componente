import { MultipleAttributes, ProductList } from "./../interface/productList";

export const calculateTaxes = (
  tax: MultipleAttributes,
  product: ProductList,
) => {
  const subtotal = product.price! / (tax.percentage! / 100 + 1);
  // console.log(product)
  if (tax.isUnitAmount) {
    return tax.value ?? 0;
  } else {
    // es un porcentaje
    return product.price! - subtotal;
  }
};

export const calculateTax = (
  isPercentage: boolean,
  taxValue: number,
  base: number,
) => {
  // console.log('percentage', isPercentage)
  // console.log('taxValue', taxValue)
  if (isPercentage) {
    return base * (taxValue / 100);
  } else {
    return taxValue;
  }
};

export const calculateProductBase = (
  priceProduct: number,
  totalPercentages: number,
  totalValues: number,
  totalDiscounts: number,
) => {
  return (
    (priceProduct - totalValues) / (totalPercentages / 100 + 1) - totalDiscounts
  );
};
