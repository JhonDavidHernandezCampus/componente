import { calculateValuesTaxItem } from "../utils/calculateTaxItem";
import {
  calculateInvoiceItem,
  ItensInvoice,
} from "../utils/calculateCompleteTaxes";
import { MultipleListInfo } from "./../Tax/MultipleListInfo";
import { MultipleTax } from "./../Tax/MultitpleTax";
import { calculateProductBase, calculateTax } from "./../utils/calculateTaxes";
import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import type { MultipleAttributes, ProductList } from "../interface/productList";
/* 
export interface ProductList {
  id: number;
  name?: string;
  quantity: number;
  price: number;
  discountAmount?: number;
  taxAmount?: number;
  subTotalAmount?: number;
  basePrice: number;
  taxes: MultipleAttributes[];
  discounts: number;
  charges?: MultipleAttributes[];
  retentions?: MultipleAttributes[];
  Taxes?: MultipleAttributes[];
  Discounts?: string;
  Charges?: MultipleAttributes[];
  Retentions?: MultipleAttributes[];
} */

interface Props<T extends ProductList> {
  titleProp:
    | "taxes"
    // | "discounts"
    | "charges"
    | "retentions"
    | "Taxes"
    // | "Discounts"
    | "Charges"
    | "Retentions";
  typeOrder: "sell" | "buy";
  infoBaseForCalcules?: ItensInvoice;
  multipleListApi?: MultipleAttributes[];
  setTaxAmount?: Dispatch<SetStateAction<number>>;
  productTarget?: T;
  setProductTarget?: Dispatch<SetStateAction<T | undefined>>;
  onChangeTaxes?: (taxes: any[]) => void;
  styles?: CSSProperties;
  onUpdate?: (element: Partial<T>) => void;
  showModalAdd?: boolean;
  showAmountTax?: boolean;
}
/**
 * @param titleProp - Titulo.
 * @param typeOrder - Tipo de orden si es (Compra o Venta) .
 * @param infoBaseForCalcules - Datos básicos para la realización de cálculos.
 * @param multipleListApi - Listado de impuestos.
 * @param productTarget - Estado que contiene el producto.
 * @param setProductTarget - Funcion de cambio del estado que contiene el producto.
 * @param onChangeTaxes - Función que retorna el listado de Impuestos cada vez que se cambian los impuestos.
 * @param showModalAdd - Parametro que valida si estara habilidata la modal para agregar impuestos
 * @param styles - stylos css para el contenedor del componente
 * @param showAmountTax - Mostrar el total de los impuesto o sus nombres
 */
export const TaxView = <T extends ProductList>({
  titleProp,
  typeOrder,
  multipleListApi,
  productTarget,
  setProductTarget,
  showModalAdd = true,
  infoBaseForCalcules,
  styles,
  onChangeTaxes,
  setTaxAmount,
  showAmountTax = false,
}: Props<T>) => {
  // Modal Multiple Selects
  // const [isOpenPopover, setIsOpenPopover] = useState(false);
  let amount = 0;
  // State for product local data
  const [infoLocalProduct, setInfoLocalProduct] = useState(infoBaseForCalcules);
  // let arrayListInfo: any[] = [];
  const [arrayListInfo, setArrayListInfo] = useState<
    {
      taxName: string;
      name: string;
      value: number;
    }[]
  >([]);
  useEffect(() => {
    if (productTarget?.taxes) {
      try {
        const productEdit = calculateInvoiceItem({
          type: typeOrder,
          product: productTarget,
        });

        const quantity = productTarget.quantity
          ? parseFloat(productTarget.quantity?.toString().replaceAll(",", "."))
          : 1;
        const arrayListInfo = calculateValuesTaxItem(
          productEdit.basePrice - productEdit.discount,
          quantity,
          productTarget.taxes,
        );
        setArrayListInfo(arrayListInfo);
        if (
          setProductTarget &&
          JSON.stringify(productEdit) !== JSON.stringify(productTarget)
        ) {
          setProductTarget(productEdit);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (setTaxAmount) {
      setTaxAmount(amount);
    }
  }, [productTarget]);

  useEffect(() => {
    if (infoLocalProduct) {
      const productEdit = calculateInvoiceItem({
        type: typeOrder,
        product: infoLocalProduct,
      });

      const quantity = infoLocalProduct.quantity
        ? parseFloat(infoLocalProduct.quantity?.toString().replaceAll(",", "."))
        : 1;
      const arrayListInfo = calculateValuesTaxItem(
        productEdit.basePrice - productEdit.discount,
        quantity,
        infoLocalProduct.taxes,
      );
      setArrayListInfo(arrayListInfo);
    }
  }, [infoLocalProduct]);
  return (
    <div>
      <div
        className={`flex items-center justify-center w-[100%] rounded-lg`}
        style={styles}
        // onClick={() => setIsOpenPopover((prev) => !prev)}
      >
        <MultipleListInfo
          title="Impuestos"
          showAmountTax={showAmountTax}
          arrayListInfo={arrayListInfo}
          amount={amount}
          // isOpenPopover={isOpenPopover}
          // setIsOpenPopover={setIsOpenPopover}
        />
        {((productTarget !== undefined && setProductTarget !== undefined) ||
          onChangeTaxes) &&
        multipleListApi !== undefined &&
        showModalAdd ? (
          <MultipleTax
            multipleListApi={multipleListApi}
            productTarget={productTarget}
            setProductTarget={setProductTarget}
            infoBaseForCalcules={infoLocalProduct}
            setInfoLocalProduct={setInfoLocalProduct}
            titleProp={titleProp}
            typeOrder={typeOrder}
            onChange={onChangeTaxes}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
