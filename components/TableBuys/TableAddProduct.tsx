import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableProps,
  TableRow,
} from "@nextui-org/react";
import React, {
  Dispatch,
  Key,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  type FC,
} from "react";
import { ProductContext } from "./../context/ProductContext";
import { ProductList } from "./../interface/productList";
import { flattenObject } from "./../utils/objectUtils";
import { TaxView } from "./../layout/TaxView";
import { ClassNamesTable, InputsArray } from "./TableBuyComponent";
import { InputWrapper } from "../InputWrapper/InputWrapper";
import { MdDelete, TbEdit } from "../icons/icons";
import { formatNumToStr } from "../utils/formatNumber";

/**
 * * Props
 * @columnsTable  : Columnas que se pintaran en la tabla
 *
 */
interface ColumnsTable {
  name: string;
  key: string;
  type: string;
  width?: number | undefined;
  align?: "start" | "center" | "end";
}
interface Props {
  columnsTable: ColumnsTable[];
  inputsArray: InputsArray[];
  typeOrder: "sell" | "buy";
  propsTable?: Pick<
    TableProps,
    "isHeaderSticky" | "BaseComponent" | "classNames" | "isStriped"
  > & {
    classNames: ClassNamesTable;
  };
}

export const TableAddProduct: FC<Props> = ({
  columnsTable,
  propsTable,
  inputsArray,
  typeOrder,
}) => {
  // AutoComplete Products States
  const [productSelected, setProductSelected] = useState<ProductList>();

  // States Product
  const { productList, addProductList, theme } = useContext(ProductContext);

  const [columnsTableWidth, setColumnsTableWidth] = useState<ColumnsTable[]>(
    [],
  );
  // STATE OF THE TABLE
  const [table, setTable] = useState<React.JSX.Element>();

  const [width, getwidth] = useState(0);
  useEffect(() => {
    const validateWidth = window.innerWidth;
    getwidth(validateWidth);
  }, []);

  useEffect(() => {
    const parentTable = document.getElementById("tableComponent");

    const changeWhithTable = () => {
      const newColumns = columnsTable.map((element) => {
        const row = document.getElementById(
          element.name.toLocaleLowerCase(),
        )?.clientWidth;
        return {
          ...element,
          width: row ? row - 8 : row,
        };
      });
      setColumnsTableWidth(newColumns);
    };
    if (parentTable) {
      const resizeObserver = new ResizeObserver(() => {
        changeWhithTable();
      });
      resizeObserver.observe(parentTable);

      return () => {
        resizeObserver.disconnect();
      };
    }
    changeWhithTable();
  }, [table]); // productList.length, productList

  useEffect(() => {
    const formRow = document.getElementById("formRow");
    const parentTable = document.getElementById("tableComponent")
      ?.parentNode as HTMLElement;
    if (parentTable) {
      parentTable.id = "parentTable";
    }
    let isSyncing = false;

    // Función para sincronizar el scroll entre los dos elementos
    const asingtScroll = (nameChange: "form" | "parent") => {
      if (isSyncing) return;
      isSyncing = true;
      if (formRow && parentTable) {
        if (nameChange === "parent") {
          formRow.scrollLeft = parentTable.scrollLeft;
        } else {
          parentTable.scrollLeft = formRow.scrollLeft;
        }
      }
      isSyncing = false;
    };

    parentTable?.addEventListener("scroll", () => {
      asingtScroll("parent");
    });
    formRow?.addEventListener("scroll", () => {
      asingtScroll("form");
    });
  }, []);

  // UseEffect que me encarga de la igualacion del los estados del producto actual en linea entre el componente y al de el estado exterior
  useEffect(() => {
    inputsArray.map((element) => {
      if (element.type === "searchProduct" && element.setState) {
        element.setState({ ...element.state, ...productSelected });
      }
      const nameinput = element.input?.props.name as keyof ProductList;
      if (
        productSelected &&
        element.type === "select" &&
        productSelected[nameinput] !== undefined
      ) {
        element.setState(
          Array.isArray(element.state)
            ? [productSelected[nameinput]]
            : productSelected[nameinput],
        );
      }
    });
  }, [productSelected]);

  //* Use effect que me renderiza la table de nuevo para evitar el refresh en toda la tabla
  useEffect(() => {
    const table = (
      <Table
        id="tableComponent"
        {...propsTable}
        aria-label="Tabla de Compra de Productos"
        bottomContentPlacement="outside"
        className="max-h-[520px]"
        // bottomContent={}
      >
        <TableHeader columns={columnsTable}>
          {(column) => (
            <TableColumn key={column.key} id={column.name.toLocaleLowerCase()}>
              <p className={`text-${column.align}`}>{column.name}</p>
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={productList}
          // emptyContent={<p>No has agregado productos</p>}
          className="rounded-b-none shadow-none"
        >
          {productList.map((product, index) => (
            <TableRow key={product.guid}>
              {columnsTable.map((element) => (
                <TableCell key={element.key}>
                  <RenderCellProduts
                    indexProduct={index}
                    setProductSelected={setProductSelected}
                    columnKey={element.key}
                    typeOrder={typeOrder}
                    column={element}
                    product={product}
                    guidProduct={product.guid}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
    setTable(table);
  }, [productList]);

  return (
    <div
      className={`flex flex-col items-center ${propsTable?.classNames.parentContainer}`}
    >
      {table}
      <form
        id="formRow"
        className={`flex flex-col ms:flex-row ms:items-center gap-2 p-2 z-0 ${propsTable?.classNames.form ?? ""}`} // bg-white dark:bg-[#18181A]
        style={{
          backgroundColor: theme !== "dark" ? "#FFFFFF" : "#18181A", // theme === "light" ? "#FFFFFF" : "#18181A", // || theme === undefined
          flexDirection: width < 780 ? "column" : "row",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          let objectImput = {};
          let productOutside = {};
          if (productSelected) {
            const objectData = new FormData(e.target as HTMLFormElement);
            objectData.forEach((element, nameKey) => {
              const name = nameKey as keyof ProductList;
              if (
                !productSelected[name] ||
                (element !== "" && productSelected[name] !== element)
              ) {
                // !productSelected[name] ||
                objectImput = { ...objectImput, [name]: element };
              }
            });

            //* asignacion de id en caso de no existir
            // const id = productSelected.id
            //   ? productSelected.id
            //   : Math.random() * (100000 - 10000) + 10000;
            const id = productSelected.id ?? 0;
            let objectParset = { ...productSelected, ...objectImput, id };
            // let objectParset = { ...objectImput, ...productSelected, id };

            // * Parsear los campos string a numeros
            const newObject = Object.keys(objectParset);
            newObject.map((name) => {
              const valuePro = objectParset[name as keyof ProductList];
              if (typeof valuePro === "string") {
                const parseValue = isNaN(parseFloat(valuePro))
                  ? valuePro
                  : valuePro.includes("-") || valuePro.includes("/")
                    ? valuePro
                    : parseFloat(valuePro);
                objectParset = {
                  ...objectParset,
                  [name]: parseValue,
                };
              }
            });
            // handleEqualiseProduct();
            //* Guardamos los valores que tengan los select para conservar su stado
            let objectSelects = {};
            inputsArray.map((element) => {
              if (
                element.type === "select" &&
                !(element.input?.props.name in productSelected)
              ) {
                objectSelects = {
                  ...objectSelects,
                  [element.input?.props.name]: Array.isArray(element.state)
                    ? (element.state[0] ?? {})
                    : element.state,
                };
              }
            });
            // * Limpiar los inputs y estado externo del producto
            inputsArray.map((element) => {
              if (element.type === "searchProduct" && element.setState) {
                if (
                  JSON.stringify(productSelected) !==
                  JSON.stringify(element.state)
                ) {
                  productOutside = element.state;
                }
                // element.setState(undefined);
                element.setState(objectSelects);
              }
              const name = element.input?.props.name as keyof ProductList;
              switch (element.name) {
                case "quantity":
                  element.setState("1");
                  break;
                case "price":
                  element.setState("0");
                  break;
                case "date":
                  element.setState(objectParset[name]);
                  break;
                default:
                  if (
                    element.input?.props.name === "discounts" ||
                    element.input?.props.name === "deduction" ||
                    element.input?.props.name === "quantity" ||
                    element.input?.props.name === "accrual"
                  ) {
                    element.setState("0");
                  }
                  break;
              }
            });
            // Index product in array
            const index = objectParset?.index ?? productList.length;

            setProductSelected(undefined);
            addProductList({
              ...productOutside,
              ...objectParset,
              index,
            });
          }
        }}
      >
        {inputsArray.map((element, index) => {
          const nameInput = element.input?.props.name as keyof ProductList;

          const width = columnsTableWidth[index]?.width;
          if (element.input) {
            switch (element.type) {
              case "searchProduct":
                let newProps = {};

                if (
                  /* element.input.type?.name === "SearchSelectedProduct" ||
                  element.input.type?.name ===
                    "searchProducts_SearchSelectedProduct" */
                  "nameInput" in element.input?.props
                ) {
                  newProps = {
                    productSelected: productSelected,
                    setProductSelected: setProductSelected,
                    inputValue: productSelected?.name ?? "",
                  };
                }
                const clonedInput = React.cloneElement(element.input, {
                  ...element.input?.props,
                  ...newProps,
                });
                /* return (
                  <div key={index} style={{ width }}>
                    {clonedInput}
                  </div>
                ); */
                return (
                  <div key={index} style={{ width }}>
                    <InputWrapper
                      nameEvent={element.namePropsEvent}
                      name={nameInput}
                      type="other"
                      onChange={(item) => {
                        const value = item[nameInput] as any;
                        setProductSelected({
                          ...productSelected,
                          [nameInput]: value,
                          ...value,
                        });
                      }}
                    >
                      {clonedInput}
                    </InputWrapper>
                  </div>
                );
              case "taxView":
                /* const clonedInputTax = React.cloneElement(element.input?, {
                  ...element.input?.props,
                  productTarget: productSelected,
                  setProductTarget: setProductSelected,
                }); */

                return (
                  <div key={index} style={{ width }}>
                    {/* {clonedInputTax} */}
                    <TaxView
                      key={index}
                      {...element.input?.props}
                      //titleProp={element.input?.props.titleProp}
                      productTarget={productSelected}
                      setProductTarget={setProductSelected}
                      typeOrder={typeOrder}
                    />
                  </div>
                );
              case "button":
                const clonedButton = React.cloneElement(element.input, {
                  ...element.input?.props,
                  type: "submit",
                });
                return (
                  <div
                    key={index}
                    style={{ width }}
                    className="flex justify-center items-center"
                  >
                    {clonedButton}
                  </div>
                );

              default:
                const propsSelect =
                  element.type === "select"
                    ? {
                        selectedKeys: productSelected
                          ? productSelected[nameInput]
                            ? new Set([productSelected[nameInput]])
                            : element.state
                          : element.state,
                        productTarget: productSelected,
                        setProductTarget: setProductSelected,
                      }
                    : {};
                const inputCone = React.cloneElement(element.input, {
                  ...element.input?.props,
                  value: productSelected
                    ? element.name !== "date"
                      ? (productSelected[nameInput] ?? element.state) // ?? '0'
                      : element.state
                    : element.state,
                  ...propsSelect,
                });

                return (
                  <div key={index} style={{ width }}>
                    <InputWrapper
                      name={nameInput}
                      nameEvent={element.namePropsEvent}
                      onChange={(value) => {
                        let valueSet = value as any;
                        if (element.type === "select") {
                          const { anchorKey } = Object.values(value)[0] as any;
                          valueSet = anchorKey ?? value[nameInput];
                        }
                        valueSet =
                          element.type === "select"
                            ? { [nameInput]: valueSet }
                            : { ...value };

                        setProductSelected({
                          ...productSelected,
                          ...valueSet,
                        } as any);
                      }}
                      type="other"
                    >
                      {inputCone}
                    </InputWrapper>
                  </div>
                );
            }
          }
        })}
      </form>
    </div>
  );
};

interface PropsCell {
  indexProduct: number;
  columnKey: Key;
  column: ColumnsTable;
  product: ProductList;
  guidProduct: string;
  typeOrder: "sell" | "buy";
  setProductSelected: Dispatch<SetStateAction<ProductList | undefined>>;
}

const RenderCellProduts: FC<PropsCell> = ({
  indexProduct,
  columnKey,
  column,
  product,
  guidProduct,
  typeOrder,
  setProductSelected,
}) => {
  const { deleteProductList } = useContext(ProductContext);
  const productFlatten = flattenObject(product);
  const dataCol = productFlatten[columnKey as keyof ProductList];

  const textAlign = column.align ? `text-${column.align}` : "text-start";

  switch (column.type) {
    case "actions":
      return (
        <div className={`flex justify-center w-full ${textAlign} gap-1`}>
          <Button
            isIconOnly
            variant="flat"
            color="primary"
            size="sm"
            onPress={() => {
              setProductSelected({ ...product, index: indexProduct });
              deleteProductList(product.guid);
            }}
            startContent={<TbEdit size={18} />}
          />
          <Button
            isIconOnly
            variant="flat"
            color="danger"
            size="sm"
            onPress={() => deleteProductList(guidProduct)}
            startContent={<MdDelete size={18} />}
          />
        </div>
      );
    case "taxView":
      return (
        <TaxView
          titleProp={
            columnKey as
              | "taxes"
              // | "discounts"
              | "charges"
              | "retentions"
              | "Taxes"
              // | "Discounts"
              | "Charges"
              | "Retentions"
          }
          typeOrder={typeOrder}
          productTarget={product}
          // setProductTarget={setProdutTarget}
          styles={{
            background: "transparent",
          }}
        />
      );
    default:
      const dataParsed = isNaN(parseFloat(dataCol))
        ? dataCol
        : typeof dataCol === "string" &&
            (dataCol.includes("/") || dataCol.includes("-"))
          ? dataCol
          : formatNumToStr(dataCol);

      return <div className={textAlign}>{dataParsed}</div>;
  }
};
