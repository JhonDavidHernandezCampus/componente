import { ProductContext } from "./../context/ProductContext";
import { ProductList } from "./../interface/productList";
import React, { Dispatch, FC, useEffect, useState } from "react";
import { TableAddProduct } from "./TableAddProduct";
import { CardAmount } from "../carddetails/CardDetails";
import {
  Button,
  ButtonProps,
  CardProps,
  divider,
  TableProps,
} from "@nextui-org/react";
import { generateGuid } from "../utils/gererateGuid";

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
export interface ComponentsProps {
  propsCard?: CardProps;
  btnEndBuyProps?: ButtonProps;
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
 * @param parentContainer -> Clases de tailwindCss que se aplicaran al contenedos de todo el componente
 * @param form -> Clases de tailwindCss que se aplicaran al formulario o linea del producto
 */
export type ClassNamesTable = {
  emptyWrapper?: string | string[];
  loadingWrapper?: string | string[];
  sortIcon?: string | string[];
  table?: string | string[];
  tbody?: string | string[];
  td?: string | string[];
  tfoot?: string | string[];
  thead?: string | string[];
  tr?: string | string[];
  base?: string | string[];
  wrapper?: string | string[];
  th?: string | string[];
  parentContainer?: string;
  form?: string;
};
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
export interface InputsArray {
  name: "quantity" | "price" | "subTotal" | "another" | "unitValue" | "date";
  namePropsEvent: string;
  type: "searchProduct" | "input" | "button" | "taxView" | "select";
  input?: JSX.Element;
  state?: any;
  setState?: any;
}

export type TablePropsComponent = Pick<
  TableProps,
  "isHeaderSticky" | "BaseComponent" | "isStriped" | "content" | "classNames"
> & {
  classNames: ClassNamesTable;
} & ComponentsProps;

interface Props {
  columnsTable: ColumnsTable[];
  inputsArray: InputsArray[];

  handleEndBuy: (items: ProductList[]) => void;
  handleChangeItems?: (items: ProductList[]) => void;
  setStateAmounts: Dispatch<React.SetStateAction<ObjectAmounts>>;
  arrayAmounts: { key: string; title: string; isVisible?: boolean }[];
  typeOrder: "sell" | "buy";
  propsTable?: TablePropsComponent;
  color?: EstructureColor;
  typeShowAmounts?: "normal" | "payroll" | "bills" | "none";
  isResponsive?: boolean;
  isLoading?: boolean;
  theme?: string;
  initItems?: ProductList[];
  titleBtn?: JSX.Element | string;
}

/**
 * @param columnsTable - Columnas de la tabla
 * @param inputsArray:  Array Inputs para cada una de las columnas de de la tabla
 * @param handleEndBuy:  Funcion a ejecutar al finalizar la compra
 * @param handleChangeItems:  Funcion que se ejecuta cada vez que se agrega o se alimina un producto
 * @param setStateAmounts -> Función para asignar los totales obtenidos de la sumatoria de los productos
 * @param arrayAmounts -> Typo de transaccion (compra o venta), usado para calcular los totales
 * @param typeOrder -> Tipo de transaccion (compra o venta), usado para calcular los totales
 * @param propsTable: Props de la tabla, Las props son las mismas que las de NextUI
 * @param color:  Objeto con los colores que desea marcar los componentes
 * @param typeShowAmounts: Typo de estilo con el que desea mostrar los totales
 * @param isResponsive:  Si desea el componente responsivo
 * @param isLoading: Estado de carga del boton de envio
 * @param theme: propiedad theme de la funcion UseTheme()
 * @param initItems: Ítems con los cuales se inicializara el contexto
 * @param titleBtn: Mensaje que se mostrara en el Botón de finalizar la venta
 */
export const TableBuyComponent: FC<Props> = ({
  columnsTable,
  inputsArray,
  propsTable,
  handleEndBuy,
  handleChangeItems,
  typeShowAmounts = "bills",
  isResponsive,
  arrayAmounts,
  color,
  isLoading = false,
  theme = "light",
  setStateAmounts,
  typeOrder,
  initItems,
  titleBtn,
}) => {
  const [productList, setProductList] = useState<ProductList[]>(
    initItems ?? [],
  );
  const addProductList = (productAdd: ProductList) => {
    const arrayTem = productList;
    const date = new Date();
    // Si Existe un index en el product lo agregamos hay si no lo agregamos al final
    const index = productAdd?.index ?? productList.length + 1;

    const productFormated = {
      ...productAdd,
      guid: generateGuid(),
      dateAdd: date.toString(),
      item: {
        ...productAdd.item,
        id: productAdd.id ?? 0,
        name: productAdd.name ?? "",
      },
    };
    arrayTem.splice(index, 0, productFormated);
    // setProductList([...productList, productFormated]);
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
      <ProductContext.Provider
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
            typeOrder={typeOrder}
          />
        </div>
        <div
          // className="col-span-2 pr-5"
          style={{ gridColumn: "span 2 / span 2" }}
        >
          <CardAmount
            title="Compra"
            arrayAmounts={arrayAmounts}
            typeOrder={typeOrder}
            handlePay={handleEndBuy}
            isLoading={isLoading}
            setStateAmounts={setStateAmounts}
            type={typeShowAmounts}
            color={color}
          />
        </div>
        {typeShowAmounts === "bills" || typeShowAmounts === "payroll" ? (
          <div className="flex items-center justify-center w-full col-start-5 pt-3 z-0">
            <Button
              size="lg"
              className="text-white z-0"
              type="submit"
              radius="none"
              isDisabled={productList.length === 0}
              color={color?.colorComponent ?? "success"}
              style={{ width: "300px" }}
              isLoading={isLoading}
              {...(propsTable?.btnEndBuyProps ?? {
                content: "",
              })}
              onPress={() => {
                handleEndBuy(productList);
              }}
            >
              {titleBtn ?? "Guardar"}
            </Button>
          </div>
        ) : (
          ""
        )}
      </ProductContext.Provider>
    </div>
  );
};

export default TableBuyComponent;
