import { ProductListAccouting } from "../interface/productListAccouting";
import { generateGuid } from "./gererateGuid";

export const formatAccoutingProduct = (
  product: any,
  type: "paysheet" | "accounting",
): ProductListAccouting => {
  const guid = generateGuid();
  const name = ("name" in product ? product.name?.toString() : "") ?? "";

  if (type === "accounting") {
    product = calculesForAccounting(product);
  } else {
    product = calculesForPaySheel(product);
  }

  return {
    guid,
    name,
    ...product,
  };
};

const calculesForPaySheel = (product: any): ProductListAccouting => {
  const name =
    product.name !== undefined
      ? product.name
      : "code" in product
        ? product.code !== ""
          ? product.code // <- Si code no esta vacio
          : product.id // <- En ocaciones el noombre llega en la propiedad ID
        : "";

  const quantity =
    product.quantity !== undefined ? product.quantity : (product.Quantity ?? 1);

  let totalAmount = 0;
  let accrual = 0;
  let deduction = 0;

  if ("accrual" in product && "deduction" in product) {
    accrual = parseFloat((product.accrual as string).toString());
    deduction = parseFloat((product.deduction as string).toString());
    totalAmount =
      (isNaN(accrual) ? 0 : accrual) - (isNaN(deduction) ? 0 : deduction);
  } else if ("Amount" in product && ("Type" in product || "type" in product)) {
    const type = product.Type ?? product.type;
    accrual = type === "Devengo" ? product.Amount : 0;
    deduction = type === "Deduccion" ? product.Amount : 0;
  }

  const parseAccrual = isNaN(accrual) ? "" : accrual;
  const parseDeduction = isNaN(deduction) ? "" : deduction;
  return {
    ...product,
    totalAmount,
    name,
    accrual: parseAccrual,
    deduction: parseDeduction,
    quantity,
  };
};

//    <-- --- -->
const parseValue = (value: any) =>
  isNaN(parseFloat(value.toString())) ? "" : parseFloat(value);

const calculesForAccounting = (product: any): ProductListAccouting => {
  let totalAmount = 0;

  let debit =
    product?.debit !== undefined
      ? parseValue(product.debit)
      : (product?.debitAmount ?? 0);
  let credit =
    product?.credit !== undefined
      ? parseValue(product.credit)
      : (product?.creditAmount ?? 0);
  let baseValue = product?.baseValue ? parseFloat(product.baseValue ?? "0") : 0;
  let baseAmount = baseValue;

  let debitAmount = debit;
  let creditAmount = credit;

  if ("debit" in product && "credit" in product) {
    totalAmount = (isNaN(debit) ? 0 : debit) - (isNaN(credit) ? 0 : credit);
  }

  // Validacion que asigna en debit o credit si el otro tiene valor
  if (credit !== 0 || debit !== 0) {
    if (credit > debit) debit = 0;
    if (debit > credit) credit = 0;
  }

  if ("tax" in product && baseValue !== 0 && debit === 0 && product.tax !== 0) {
    const newCredit = (baseValue / 100) * product.tax;
    credit = newCredit; // product.tax
  }

  return {
    ...product,
    totalAmount,
    debit,
    credit,
    debitAmount,
    creditAmount,
    baseAmount,
  };
};
