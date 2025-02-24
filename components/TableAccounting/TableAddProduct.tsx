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
  FormEvent,
  Key,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  type FC,
} from "react";
import { ProductContextAccounting } from "./../context/ProductContext";
import { flattenObject } from "./../utils/objectUtils";
import { inputsArrayAccouting } from "./TableBuyComponent";
import { InputWrapper } from "../InputWrapper/InputWrapper";
import { MdDelete, TbEdit } from "../icons/icons";
import { formatNumToStr } from "../utils/formatNumber";
import { ClassNamesTable } from "../TableBuys/TableBuyComponent";
import { ProductListAccouting } from "../interface/productListAccouting";
import { formatAccoutingProduct } from "../utils/formatAccoutingProduct";

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
  inputsArray: inputsArrayAccouting[];
  type: "paysheet" | "accounting";
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
  type,
}) => {
  // AutoComplete Products States
  const [productSelected, setProductSelected] =
    useState<ProductListAccouting>();

  // States Product
  const { productList, addProductList, theme } = useContext(
    ProductContextAccounting,
  );

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
        changeWhithTable(); // <-- No se ejecuta esta funcion
      });
      resizeObserver.observe(parentTable);

      return () => {
        resizeObserver.disconnect();
      };
    }
    changeWhithTable();
  }, []); // productList.length, productList

  useEffect(() => {
    const formRow = document.getElementById("formRow");
    const parentTable = document.getElementById("tableComponent")
      ?.parentNode as HTMLElement;
    if (parentTable) {
      // parentTable.scrollTop = parentTable?.scrollHeight;
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
  }, [table]);

  // UseEffect que me encarga de la igualacion del los estados del producto
  // actual en linea entre el componente y al de el estado exterior
  useEffect(() => {
    inputsArray.map((element) => {
      if (element.type === "searchProduct" && element.setState) {
        element.setState({ ...element.state, ...productSelected });
      }
      if (element.setState && productSelected && element.type === "select") {
        const name = element.input?.props.name as keyof ProductListAccouting;
        element.setState(productSelected[name]);
      }
    });
  }, [productSelected]);

  useEffect(() => {
    setTable(
      <Table
        {...propsTable}
        id="tableComponent"
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
                    column={element}
                    product={product}
                    guidProduct={product.guid}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>,
    );
  }, [productList]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let objectImput = {};
    let productOutside = {};
    if (productSelected) {
      const objectData = new FormData(e.target as HTMLFormElement);
      objectData.forEach((element, nameKey) => {
        const name = nameKey as keyof ProductListAccouting;
        if (
          (!productSelected[name] || element !== productSelected[name]) &&
          typeof productSelected[name] !== "object"
        ) {
          objectImput = { ...objectImput, [name]: element };
        }
      });

      //* asignacion de id en caso de no existir
      const id = productSelected.id ?? 0;
      let objectParset = { ...productSelected, ...objectImput, id };

      // * Parsear los campos string a numeros
      const newObject = Object.keys(objectParset);
      newObject.map((name) => {
        const valuePro = objectParset[name as keyof ProductListAccouting];

        if (typeof valuePro === "string") {
          const parseValue =
            valuePro.match("^[0-9.]*$") === null ||
            valuePro.includes("-") ||
            valuePro.includes("/") ||
            valuePro === ""
              ? valuePro
              : parseFloat(valuePro);
          // const parseValue = typeValidation(valuePro);

          objectParset = {
            ...objectParset,
            [name]: parseValue,
          };
        }
      });

      //* Guardamos los valores que tengan los select para conservar su stado
      let objectSelects = {};
      inputsArray.map((element) => {
        if (element.type === "select") {
          objectSelects = {
            ...objectSelects,
            [element.input?.props.name]: Array.isArray(element.state)
              ? (element.state[0] ?? {})
              : element.state,
          };
        }
        if (element.type === "searchProduct") {
          const isAutoComplete = element.input?.type.name === "AutoComplete";

          const valueSelected = isAutoComplete
            ? (element.input?.props.valueSelected ?? {})
            : {}; // <- Debe Tener esta prop el Select

          objectSelects = {
            ...objectSelects,
            ...(Array.isArray(valueSelected)
              ? (valueSelected[0] ?? {})
              : valueSelected),
          };
        }
      });
      // * Limpiar los inputs y estado externo del producto
      let debitAmount = productList?.reduce(
        (acumulador: number, element) =>
          parseFloat((element?.debitAmount ?? 0)?.toString()) + acumulador,
        0,
      );

      let creditAmount = productList.reduce(
        (acumulador: number, element) =>
          parseFloat((element?.creditAmount ?? 0)?.toString()) + acumulador,
        0,
      );

      debitAmount += parseFloat(productSelected?.debitAmount ?? "0");
      creditAmount += parseFloat(productSelected?.creditAmount ?? "0");
      inputsArray.map((element) => {
        if (element.type === "searchProduct" && element.setState) {
          if (
            JSON.stringify(productSelected) !== JSON.stringify(element.state)
          ) {
            productOutside = element.state;
          }
          // element.setState(undefined);
          element.setState(objectSelects);
        }
        const name = element.input?.props.name as keyof ProductListAccouting;

        const diference = debitAmount - creditAmount;
        if (name === "credit" || name === "debit") {
          if (element.setState) element.setState("0");
        }
        if (diference !== 0) {
          if (debitAmount < creditAmount && name === "debit") {
            element.setState(Math.abs(diference));
          } else if (debitAmount > creditAmount && name === "credit") {
            element.setState(Math.abs(diference));
          }
        }
        switch (name) {
          case "quantity":
            element.setState("1");
            break;
          case "dateAdd":
            element.setState(objectParset[name]);
            break;
          default:
            if (
              name === "deduction" ||
              name === "accrual" ||
              name === "baseValue"
            ) {
              element.setState("0");
            }
            break;
        }
      });
      // Index product in array
      const index = objectParset?.index ?? productList.length;

      setProductSelected(objectSelects as any);
      addProductList({ ...productOutside, ...objectParset, index });
    }
  };

  return (
    <div
      className={`flex flex-col items-center ${propsTable?.classNames.parentContainer}`}
    >
      {table}
      <form
        id="formRow"
        className={`flex flex-col ms:flex-row ms:items-center gap-2 p-2 ${propsTable?.classNames.form ?? ""}`} // bg-white dark:bg-[#18181A]
        style={{
          backgroundColor: theme === "light" ? "#FFFFFF" : "#18181A", // || theme === undefined
          flexDirection: width < 780 ? "column" : "row",
        }}
        onSubmit={onSubmit}
      >
        {inputsArray.map((element, index) => {
          const nameInput = element.input?.props
            .name as keyof ProductListAccouting;

          const width = columnsTableWidth[index]?.width;
          if (element.input) {
            switch (element.type) {
              case "searchProduct":
                const clonedInput = React.cloneElement(element.input, {
                  ...element.input?.props,
                  initValueInput: productSelected?.name ?? "",
                  propsInput: {
                    ...(element.input?.props?.propsInput ?? {}),
                    value: productSelected?.name ?? "",
                  },
                  // productSelected: productSelected,
                  // setProductSelected: setProductSelected,
                  // inputValue: productSelected?.name ?? "",
                });
                return (
                  <div key={index} style={{ width }}>
                    <InputWrapper
                      nameEvent={element.namePropsEvent ?? ""}
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
              case "select":
                const propsSelect = {
                  selectedKeys: productSelected
                    ? productSelected[nameInput]
                      ? new Set([productSelected[nameInput]])
                      : element.state
                    : element.state,
                  valueSelected:
                    productSelected && productSelected[nameInput]
                      ? [productSelected[nameInput] ?? {}]
                      : element.state,
                  productTarget: productSelected,
                  setProductTarget: setProductSelected,
                };

                const inputClone = React.cloneElement(element.input, {
                  ...element.input?.props,
                  ...propsSelect,
                });

                return (
                  <div key={index} style={{ width }}>
                    <InputWrapper
                      name={nameInput}
                      nameEvent={element.namePropsEvent ?? ""}
                      onChange={(value) => {
                        let valueSet = value as any;
                        const { anchorKey } = (Object.values(
                          value,
                        )[0] as any) ?? { anchorKey: "" };
                        valueSet = anchorKey ?? value[nameInput];

                        valueSet = {
                          [nameInput]: Array.isArray(valueSet) // SI es un array asignamos el primer elemento
                            ? valueSet[0]
                            : valueSet,
                        };
                        if (element.setState) element.setState(valueSet);

                        const formatProduct = formatAccoutingProduct(
                          { ...productSelected, ...valueSet },
                          type,
                        );
                        setProductSelected({
                          ...productSelected,
                          ...valueSet,
                          ...formatProduct,
                        } as any);
                      }}
                      type="other"
                    >
                      {inputClone}
                    </InputWrapper>
                  </div>
                );

              default:
                const propsAdded = {};
                const inputCone = React.cloneElement(element.input, {
                  ...element.input?.props,
                  value: productSelected
                    ? element.type !== "date"
                      ? (productSelected[nameInput] ?? element.state)
                      : element.state
                    : element.state,
                  ...propsAdded,
                });

                return (
                  <div key={index} style={{ width }}>
                    <InputWrapper
                      name={nameInput}
                      nameEvent={element.namePropsEvent ?? ""}
                      onChange={(value) => {
                        let valueSet = value as any;
                        valueSet = { ...value };

                        const formatProduct = formatAccoutingProduct(
                          { ...productSelected, ...valueSet },
                          type,
                        );
                        setProductSelected({
                          ...productSelected,
                          ...valueSet,
                          ...formatProduct,
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
  product: ProductListAccouting;
  guidProduct: string;
  setProductSelected: Dispatch<
    SetStateAction<ProductListAccouting | undefined>
  >;
}

const RenderCellProduts: FC<PropsCell> = ({
  indexProduct,
  columnKey,
  column,
  product,
  guidProduct,
  setProductSelected,
}) => {
  const { deleteProductList } = useContext(ProductContextAccounting);
  const productFlatten = flattenObject(product);
  const dataCol = productFlatten[columnKey as keyof ProductListAccouting];

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

    default:
      const dataParsed = typeValidation(dataCol);
      return <div className={textAlign}>{dataParsed}</div>;
  }
};

const typeValidation = (data: any) => {
  // Validacion de numeros
  if (
    isNaN(parseFloat(data)) ||
    (typeof data === "string" && (data.includes("/") || data.includes("-"))) ||
    (typeof data === "string" && data.match("^[0-9.]*$") === null)
  ) {
    return data;
    // Validacion para fechas
  } else {
    return formatNumToStr(data);
  }
};
