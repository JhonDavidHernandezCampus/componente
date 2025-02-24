import { MultipleAttributes } from "./../interface/productList";

export const totalTaxPer = (taxes: MultipleAttributes[]) => {
    const totalPercentage = taxes.reduce(
        (accumulator: number, currentValue: MultipleAttributes) => 
            currentValue.percentage !== undefined 
                ? accumulator + currentValue.percentage 
                : 0,
        0
    )

    const totalValue = taxes.reduce(
        (accumulator: number, currentValue: MultipleAttributes) =>
            currentValue.value !== undefined ? currentValue.value + accumulator : 0,
        0
    )

    return {totalPercentage, totalValue}
}