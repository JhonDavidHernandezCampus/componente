import { ProductList } from "./../interface/productList";
import { ImageRound } from "./../utils/ImageRound";
import { TruncateText } from "./../utils/TruncateText";
import {
  Button,
  Card,
  CardBody,
  Input,
  InputProps,
  Spinner,
} from "@nextui-org/react";
import { AxiosInstance } from "axios";
import {
  CSSProperties,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { flattenObject } from "../utils/objectUtils";
import { useTheme } from "next-themes";
import { capitaliceString } from "../utils/capitaliceString";
import { IoClose, RiShoppingBag3Line } from "../icons/icons";
import { formatNumToStr } from "../utils/formatNumber";

interface Props {
  functionApi: AxiosInstance;
  nameInput: string;
  urlItems: string;
  setProductSelected?: Dispatch<SetStateAction<ProductList | undefined>>;
  productSelected?: ProductList | undefined;
  onSelect?: (product: ProductList) => void;
  propsInput?: Pick<
    InputProps,
    | "className"
    | "classNames"
    | "size"
    | "radius"
    | "label"
    | "radius"
    | "labelPlacement"
    | "placeholder"
  >;
  /** @param mainName ->Nombre de la propiedad principal @param secondaryName Nombre de la propiedad secondaria @param priceName Nombre de la propiedad que contiene el precio del producto*/
  namesPropetiesShow: {
    mainName: string;
    secondaryName: string;
    priceName: string;
  };
  styles?: CSSProperties;
  lengthText?: { mainName: number; secondaryName: number };
  inputValue?: string;
  selectedEmpyProduct?: boolean;
}

/**
 * @param functionApi -> instancia de axios utilizada para hacer la peticion
 * @param nameInput -> nombre del input que contiene el nombre o descripción del producto
 * (la propiedad en el objeto se nombrara de la misma forma)
 * @param urlItems -> Url del api del listado de los items, (debe tener la query name al final)
 * @param setProductSelected -> Funcion para cambiar el producto seleccionado
 * @param productSelected -> Producto seleccionado actualmente
 * @param propsInput -> Props del input ("className" | "classNames" | "size" | "radius")
 * @param styles -> Clases CSS para le contenedor de la lista de productos
 * @param lengthText -> Tamaño de los titulos antes de aplicar el Truncate Component
 * @param onSelect -> Funcion que me retorna el producto seleccionado
 * @param selectedEmpyProduct -> Permite o no seleccionar un producto vacio (Inexistente)
 *
 */
export const SearchSelectedProduct: FC<Props> = ({
  functionApi,
  urlItems,
  productSelected,
  setProductSelected,
  nameInput,
  inputValue,
  propsInput,
  namesPropetiesShow,
  styles,
  lengthText = { mainName: 20, secondaryName: 22 },
  onSelect,
  selectedEmpyProduct = false,
}) => {
  const [inputNameProduct, setInputNameProduct] = useState(inputValue ?? "");
  const [showProducts, setShowProducts] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idSetTimeOut, setIdSetTimeOut] = useState<NodeJS.Timeout>();
  const [allProductsApi, setAllProductsApi] = useState<ProductList[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const { theme } = useTheme();
  // este se debera pasar por las Props
  useEffect(() => {
    const request = async () => {
      setIsLoading(true);
      // setShowProducts(true)
      try {
        const { data } = await functionApi.get<ProductList[]>(
          `${urlItems}${inputNameProduct}`,
        );
        setAllProductsApi(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    clearTimeout(idSetTimeOut);
    const idTime = setTimeout(() => {
      if (inputNameProduct.length > 2) {
        request();
      }
    }, 800);
    setIdSetTimeOut(idTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputNameProduct]);

  useEffect(() => {
    if (!productSelected) {
      setInputNameProduct("");
    } else if (inputValue) {
      setInputNameProduct(inputValue);
    }
  }, [productSelected]);

  const product = {
    price: 0,
    quantity: 1,
    code: 0,
    description: inputNameProduct,
    name: inputNameProduct,
    discountAmount: 0,
    taxAmount: 0,
    subTotalAmount: 0,
    charges: [
      {
        Code: "00",
        Percentage: 0.0,
        Amount: 0.0,
        BaseAmount: 0.0,
        Reason: "razon/motivo del descuento",
      },
    ],
    // discounts: 0,
    /* discounts: [
      {
        Code: "00",
        Percentage: 0.0,
        Amount: 0.0,
        BaseAmount: 0.0,
        Reason: "razon/motivo del descuento",
      },
    ], */ // Array.isArray(element.discounts) ? 0 : element.discounts,
    taxes: [
      {
        id: 105,
        name: "IVA Excluido",
        value: 0,
        concept: "excluded",
        code: "01",
        type: "excluded",
        percentage: 0.0,
        isUnitAmount: false,
        category: "Impuesto",
      },
    ],
  };

  return (
    <div className="relative z-30">
      <Input
        radius="md"
        size="sm"
        label="Producto"
        name={nameInput}
        value={inputNameProduct}
        ref={inputRef}
        autoComplete="off"
        // placeholder="Producto"
        endContent={
          // productSelected ? (
          inputNameProduct.length >= 3 ? (
            <Button
              isIconOnly
              endContent={<IoClose size={20} />}
              className="bg-transparent pt-2"
              onPress={() => {
                setInputNameProduct("");
                setProductSelected ? setProductSelected(undefined) : "";
                setShowProducts(true);
                inputRef?.current?.focus();
              }}
            />
          ) : (
            ""
          )
        }
        {...propsInput}
        onValueChange={setInputNameProduct}
        onFocusChange={(e) => {
          setTimeout(
            () => {
              setShowProducts(e);
            },
            showProducts ? 200 : 0,
          );
          if (
            !e &&
            setProductSelected &&
            selectedEmpyProduct &&
            inputNameProduct !== ""
          ) {
            setProductSelected(product as any);
          }
        }}
      />
      {showProducts ? (
        <div
          className="absolute z-50 bg-inherit p-3 rounded-xl animate-fade-down" // bg-white dark:bg-[#18181A]
          style={{
            overflow: "scroll",
            maxHeight: "300px",
            minWidth: "500px",
            background:
              // theme === "light" || theme === "linght" ? "white" : "#18181A",
              theme !== "dark" ? "white" : "#18181A",
            ...styles,
          }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Spinner color="success" />
            </div>
          ) : inputNameProduct.length < 2 ? (
            <div className="text-center text-gray-400 text-sm">
              Escriba al menos 3 caracteres
            </div>
          ) : allProductsApi.length === 0 ? (
            <div className="text-center text-gray-400 text-sm">
              {selectedEmpyProduct ? (
                <Card
                  className="shadow-lg w-full my-2 p-1 "
                  isPressable
                  onPress={() => {
                    if (setProductSelected) {
                      setProductSelected(product as any);
                    }
                  }}
                >
                  <CardBody className="p-0">
                    <div className="flex items-center h-full">
                      <ImageRound
                        image={null}
                        icon={<RiShoppingBag3Line size={25} color="#2A2C5E" />}
                        backgroundColor="#DBDCEC"
                        heigth="70px"
                        borderRadius={12}
                      />
                      <div className="flex flex-col ml-3">
                        <p className="text-small text-default-500">
                          Seleccionar "{capitaliceString(inputNameProduct)}"
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ) : (
                `Ningún producto coincide con "${inputNameProduct}"`
              )}
            </div>
          ) : (
            allProductsApi.map((element, index) => {
              const flatElement = flattenObject(element);
              return (
                <Card
                  aria-label={flatElement[namesPropetiesShow.mainName]}
                  key={index}
                  className="shadow-lg w-full my-2 p-1 "
                  isPressable
                  onPress={() => {
                    const product = {
                      ...element,
                      quantity: element.quantity ?? 1,
                      discountAmount: 0,
                      taxAmount: 0,
                      subTotalAmount: 0,
                      discount: productSelected?.discount ?? 0,
                      discounts: productSelected?.discounts,
                      // discounts: Array.isArray(element.discounts)
                      //   ? 0
                      //   : element.discounts,
                      taxes:
                        element?.taxes?.length === 0
                          ? [
                              {
                                id: 105,
                                name: "IVA Excluido",
                                value: 0,
                                concept: "Excluido",
                                // ---
                                // id: 101,
                                // name: "IVA 0",
                                percentage: 0.0,
                                isUnitAmount: false,
                                category: "Impuesto",
                              } as any,
                            ]
                          : element.taxes,
                    };
                    setProductSelected ? setProductSelected(product) : "";
                    setShowProducts(false);
                    setInputNameProduct(
                      flatElement[namesPropetiesShow.mainName].toUpperCase(),
                    );
                    onSelect ? onSelect(product) : "";
                  }}
                >
                  <CardBody className="p-0">
                    <div className="flex items-center h-full">
                      <ImageRound
                        image={element.image ?? null}
                        icon={<RiShoppingBag3Line size={25} color="#2A2C5E" />}
                        backgroundColor="#DBDCEC"
                        heigth="70px"
                        borderRadius={12}
                      />
                      <div className="flex flex-col ml-3">
                        <p className="font-semibold">
                          {TruncateText(
                            flatElement[namesPropetiesShow.mainName],
                            lengthText?.mainName,
                          )}
                        </p>
                        <p className="text-small text-default-500">
                          {TruncateText(
                            flatElement[namesPropetiesShow.secondaryName] ?? "",
                            lengthText?.secondaryName,
                          )}
                        </p>
                        <p>
                          {formatNumToStr(
                            flatElement[namesPropetiesShow.priceName] ?? 0,
                          )}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              );
            })
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchSelectedProduct;
