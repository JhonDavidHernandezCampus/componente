import {
  ProductContext,
  ProductContextAccounting,
} from "./../context/ProductContext";
import React, { Dispatch, FC, useEffect, useState } from "react";
import { TableAddProduct } from "./TableAddProduct";
import { Button, TableProps } from "@nextui-org/react";
import { CardAmountAccounting } from "../carddetails/CardDetailsAccounting";
import {
  ClassNamesTable,
  ComponentsProps,
} from "../TableBuys/TableBuyComponent";
import { formatAccoutingProduct } from "../utils/formatAccoutingProduct";
import { ProductListAccouting } from "../interface/productListAccouting";

export interface ObjectAmounts {
  subTotalAmount?: number;
  SubTotalAmount?: number;
  discountAmount?: number;
  taxAmount?: number;
  valueAmount?: number;
  totalAmount?: number;
  TaxExclusiveAmount?: number;
  PayableAmount?: number;
  DiscountAmount?: number;
  accrual?: number;
  deduction?: number;
}

/**
 * @param name - Nombre que aparecerá en el th de la columna
 * @param key - Nombre de propiedad en el objeto que se mostrara en la columna
 * @param type - tipo componente que se mostrara en la columna (actions | taxView | default)
 * @param width - Ancho de la columna
 * @param aling - Alineación del texto dentro del th elemento
 */
export interface ColumnsTable {
  name: string;
  key: string;
  type: string;
  width?: number | undefined;
  align?: "start" | "center" | "end";
}
export interface EstructureColor {
  colorApp: string;
  colorProduct: string;
  colorComponent:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
}

/**
 * ? Notas
 * * Si el elemento es de `type select` es hobligatorio que el elemento en la propiedad input cuente con una `prop` llamada `name`
 *
 * @param name -> Nombre del tipo de dato que contiene el componente
 * (Se usa para saber que valores multilicar para calcular el subtotal)
 * @param namePropsEvent -> Nombre de la funcion del evento que se ejecuta cuando cambia el valor de un input o un select
 * @param type -> Tipo de componenete que se encuentra en el propiedad input
 * @param input -> Componenete HTML que se renderizara en la columna
 * @param state -> Estado del componente
 * @param setState -> Funcion para asegnar el valor del estado del componente
 */

export interface inputsArrayAccouting {
  // name: "quantity" | "price" | "subTotal" | "another" | "unitValue" | "date";
  namePropsEvent: string;
  type: "searchProduct" | "input" | "button" | "select" | "date";
  input?: JSX.Element;
  state?: any;
  setState?: any;
}

interface Props {
  columnsTable: ColumnsTable[];
  inputsArray: inputsArrayAccouting[];
  handleEndBuy: (items: ProductListAccouting[]) => void;
  handleChangeItems?: (items: ProductListAccouting[]) => void;
  setStateAmounts?: Dispatch<React.SetStateAction<ObjectAmounts>>;
  arrayAmounts?: { key: string; title: string; isVisible?: boolean }[];
  type: "paysheet" | "accounting";

  propsTable?: Pick<
    TableProps,
    "isHeaderSticky" | "BaseComponent" | "isStriped" | "content" | "classNames"
  > & {
    classNames: ClassNamesTable;
  } & ComponentsProps;
  isResponsive?: boolean;
  isLoading?: boolean;
  theme?: string;
  initItems?: ProductListAccouting[];
  showBtnEnd?: boolean;
}

/**
 * @param columnsTable - Columnas de la tabla
 * @param inputsArray:  Array Inputs para cada una de las columnas de de la tabla
 * @param handleEndBuy:  Funcion a ejecutar al finalizar la compra
 * @param handleChangeItems:  Funcion que se ejecuta cada vez que se agrega o se alimina un producto
 * @param setStateAmounts -> Función para asignar los totales obtenidos de la sumatoria de los productos
 * @param arrayAmounts -> Typo de transaccion (compra o venta), usado para calcular los totales
 * @param propsTable: Props de la tabla, Las props son las mismas que las de NextUI
 * @param isResponsive:  Si desea el componente responsivo
 * @param isLoading: Estado de carga del boton de envio
 * @param theme: propiedad theme de la funcion UseTheme()
 * @param initItems: Ítems con los cuales se inicializara el contexto
 * @param showBtnEnd: Booleano que retorna los datos al finalizar
 */
export const TableAccounting: FC<Props> = ({
  columnsTable,
  inputsArray,
  handleEndBuy,
  handleChangeItems,
  setStateAmounts,
  arrayAmounts,
  propsTable,
  isResponsive,
  isLoading = false,
  theme = "light",
  type,
  initItems,
  showBtnEnd,
}) => {
  const [productList, setProductList] = useState<ProductListAccouting[]>(
    initItems ?? [],
  );
  const addProductList = (productAdd: ProductListAccouting) => {
    const arrayTem = productList;
    const index = productAdd?.index ?? productList.length + 1;
    const productFormat = formatAccoutingProduct(productAdd, type);

    arrayTem.splice(index, 0, productFormat);
    setProductList([...arrayTem]);
  };

  const deleteProductList = (guid: string) => {
    setProductList(productList.filter((element) => element.guid !== guid));
  };

  const [width, getwidth] = useState(0);
  useEffect(() => {
    const validateWidth = window.innerWidth;
    getwidth(validateWidth);
  }, []);

  useEffect(() => {
    if (handleChangeItems) {
      handleChangeItems(productList);
    }
  }, [productList]);

  return (
    <div
      style={
        isResponsive
          ? width < 1600
            ? { maxWidth: "100%", display: "flex", flexDirection: "column" }
            : {
                display: "grid",
                gridTemplateColumns: "repeat(9, minmax(0, 1fr))",
              }
          : { maxWidth: "100%", display: "flex", flexDirection: "column" }
      }
    >
      <ProductContextAccounting.Provider
        value={{
          productList,
          setProductList,
          addProductList,
          deleteProductList,
          theme,
        }}
      >
        <div style={{ gridColumn: "span 7 / span 7" }}>
          <TableAddProduct
            propsTable={propsTable}
            columnsTable={columnsTable}
            inputsArray={inputsArray}
            type={type}
          />
        </div>
        {arrayAmounts && (
          <div
            // className="col-span-2 pr-5"
            style={{ gridColumn: "span 2 / span 2" }}
          >
            <CardAmountAccounting
              title="Compra"
              propsCard={propsTable?.propsCard ?? {}}
              arrayAmounts={arrayAmounts}
              handlePay={handleEndBuy}
              isLoading={isLoading}
              setStateAmounts={setStateAmounts}
            />
          </div>
        )}
        {showBtnEnd && (
          <div className="flex items-center justify-center w-full col-start-5 pt-3 z-0">
            <Button
              size="lg"
              className="text-white z-0"
              type="submit"
              radius="none"
              isDisabled={productList.length === 0}
              color={"success"}
              style={{ width: "300px" }}
              isLoading={isLoading}
              {...(propsTable?.btnEndBuyProps ?? {})}
              onPress={() => {
                handleEndBuy(productList);
              }}
            >
              Guardar
            </Button>
          </div>
        )}
      </ProductContextAccounting.Provider>
    </div>
  );
};

export default TableAccounting;
