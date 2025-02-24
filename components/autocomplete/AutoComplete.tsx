"use client";
import { Input, InputProps, Spinner } from "@nextui-org/react";
import type { AxiosInstance } from "axios";
import { useTheme } from "next-themes";
import {
  CSSProperties,
  type Dispatch,
  type FC,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  IoCheckmarkOutline,
  IoClose,
  IoIosArrowDown,
  IoIosArrowUp,
} from "../icons/icons";

interface Props {
  axiosInstance?: AxiosInstance;
  OptionsSelects?: any[];
  urlRequest?: string; //* Url a la cual se ara la peticion GET al API
  propsInput?: InputProps;
  setValueSelected: Dispatch<SetStateAction<ListArray[] | never[]>>; //* Funcion de estado donde asignaremos el valor seleccionado
  valueSelected?: ListArray[] | never[]; //* Funcion de estado donde asignaremos el valor seleccionado
  idFind?: string; //* Nombre de la propiedad por la cual seleccionaremos el elemento (Por defecto 'id')
  isStaticData?: boolean; //* Si desea que se haga una peticion al API cada que escriba (Por defecto 'true')
  nameCampsArray?: string[]; //* Array de strings que contiene el nombre de los campos que deseamos mostrar (Por defecto ['name'])
  returnCompeteData?: boolean; //* indica si desea que se asigne el objeto completo retornado por el API o solo el id y name. true:completo, false:{id:value,name:value}
  initValueInput?: string; //* Valor inicial del Input con el cual se realizara el primer filtro al API.
  autoSelectedFirstValue?: boolean; //* Seleccion automatica del primer elemento retornado por el API.
  onSelectionChange?: (element: ListArray | never) => void;
  isDivider?: string;
  propsContainer?: CSSProperties;
  placement?: "top" | "bottom";
  name?: string;
  autoMatchSelection?: { value: string; keyName: string };
}
export interface ListArray {
  id: number | string;
  name: string;
}

/**
 * @param axiosInstance - Instancia de Axios con la cual se realizara la peticion al API
 * @param OptionsSelects - Array de elementos los cuales seran las opciones a seleccionar de automplete.
 * @param urlRequest - URL a la cual se ara la petición GET a la API! Debe tener el parámetro `&name=` al final.
 * @param propsInput - Props del input ("className" | "classNames" | "size" | "radius"| "color" | "variant" | "label" | "name")
 * @param setValueSelected - Función de estado donde asignaremos el valor seleccionado
 * @param valueSelected - Estado donde se encuentra el valor actual seleccionado []
 * @param idFind - Nombre de la propiedad por la cual seleccionaremos el elemento (Por defecto 'id')
 * @param isStaticData - Si desea que se haga una petición a la API cada que escriba (Por defecto 'true')
 * @param nameCampsArray - Array de strings que contiene el nombre de los campos que deseamos mostrar (Por defecto ['name'])
 * @param returnCompeteData - indica si desea que se asigne el objeto completo retornado por la API o solo el id y name. true:completo, false:{id:value,name:value}
 * @param initValueInput - Valor inicial del Input con el cual se realizara el primer filtro al API.
 * @param autoSelectedFirstValue - Selección automática del primer elemento retornado por la API.
 * @param onSelectionChange - Funcion que se ejecuta cuando se selecciona un elemento y retorna el elemento
 * @param isDivider - Caracter que dividira las diferentes secciones del nombre
 * @param propsContainer - Propiedad de estilos que se le aplicaran al contenedor del listado de productos
 * @param placement - ubicación hacia donde saldrá el listado de los productos
 * @param autoMatchSelection - En caso de que desees seleccionar un dato utilizando una propiedad diferente a la que se muestra por defecto, puedes pasar un objeto a la propiedad autoMatchSelection. El objeto debe tener el siguiente formato:
 *                              `{ value: `Valor que deseas seleccionar`, keyName: `Nombre de la propiedad por la cual deseas realizar la selección` } Es importante tener en cuenta que no se realizará una nueva petición, lo que significa que la búsqueda se llevará a cabo con los datos obtenidos en la última solicitud realizada.                              
 *
 *? Documentación y notas a tener encuentra
 ** Para que el autoSelectedFirstValue funcione el valor initValueInput debe ser
 ** diferente de '', debe tener un valor que no sea vacío
* 
 ** la propiedad urlRequest es un string indicando la dirección del api de donde traerá los datos
 ** es muy ! Importante que la propiedad del parámetro de búsqueda este al final de la cadena¡
 *TODO: Ejemplo: contacts/?companyId=${companyId}&page=0&apikey=${apikey}&name= <- ultima

 *?Posibles problemas 
 ** Es muy importante estar seguro de que data y propiedades retorna el Api para no obtener un 'undefined'
 ** en las propiedades
* 
 *? AUTOSELECCION DE UN ELEMENTO DETERMINADO
 ** Si lo que desea es tener un valor seleccionado por defecto ya sea uno determinado o uno cualquiera usted puede:
 ** Combinar las propiedades initValueInput y autoSelectedFirstValue = true, donde initValueInput tenga el nombre
 ** del elemento que desea seleccionar.
 ** O si lo desea puede initValueInput='bucaramanga' y seleccionara el primer elemento que coincida con ese valor 
 *? 
* 
 */

export const AutoComplete: FC<Props> = ({
  axiosInstance,
  OptionsSelects,
  urlRequest = "",
  propsInput,
  setValueSelected,
  valueSelected,
  idFind = "id",
  isStaticData = true,
  nameCampsArray = ["name"],
  returnCompeteData = false,
  initValueInput = "",
  autoSelectedFirstValue = false,
  onSelectionChange,
  isDivider = "",
  propsContainer = {},
  placement = "bottom",
  autoMatchSelection,
}) => {
  // States for Basic Funtionality
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [idSelected, setIdSelected] = useState(0);
  const [inputValue, setInputValue] = useState(initValueInput);
  const [inputValueSuplement, setInputValueSuplement] = useState("");
  const { theme } = useTheme();

  const [dataFind, setDataFind] = useState<ListArray[]>([]);
  const [dataComplete, setDataComplete] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stateIdSetTimeOut, setStateIdSetTimeOut] = useState<NodeJS.Timeout>();
  const [state, setState] = useState(autoMatchSelection);

  //* Logica para la instancia de axios
  const functionApi = axiosInstance;

  const concatenateNames = (element?: any) => {
    let name = "";
    nameCampsArray.map((elementName: string | undefined, index) => {
      if (!elementName || !element || !(elementName in element)) return name;
      name =
        `${name} ${index + 1 < nameCampsArray.length ? `${element[elementName]} ${isDivider} ` : element[elementName]}`.trim();
      return name;
    });
    return name;
  };

  //* Asignacion al valor del input cada vez que cambien el valor inicial del input desde afuera
  useEffect(() => {
    setInputValue(initValueInput);
  }, [initValueInput]);

  //* Controla y selecciona un valor teniendo encuenta los valores pasados por la propiedad
  useEffect(() => {
    if (
      JSON.stringify(state) !== JSON.stringify(autoMatchSelection) &&
      autoMatchSelection
    ) {
      setState(autoMatchSelection);
      const { keyName, value } = autoMatchSelection;
      const valueSelected = dataComplete.find((element) => {
        const date = element[keyName] as string;
        return date.toString().toUpperCase() === value.toUpperCase();
      }) as ListArray | undefined;
      if (valueSelected) {
        if ("id" in valueSelected) handleSelectedItem(valueSelected.id);
        if (onSelectionChange) onSelectionChange(valueSelected);
      }
    }
  }, [autoMatchSelection]);

  const request = async () => {
    setIsLoading(true);
    try {
      if (!functionApi && !OptionsSelects) {
        throw "La propiedad ´AxiosInstance´ no puede ser indefinida si no se pasa la propiedad OptionsSelects";
      }
      const response = await functionApi?.get(
        `${urlRequest}${isStaticData ? "" : inputValue}`,
      );
      const dataResponse = functionApi ? response?.data : OptionsSelects;

      setDataComplete(dataResponse);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataMap: ListArray[] = dataResponse.map((element: any) => {
        return {
          id: element[idFind],
          name: concatenateNames(element),
        };
      });

      // * Si el valor esta vacio y la autoseleccion del primer elemento es verdadero
      // * Seleccionamos el primer elemento que retorna el api.
      if (
        inputValue !== inputValueSuplement &&
        autoSelectedFirstValue &&
        dataResponse[0] !== undefined
      ) {
        setIdSelected(parseInt(dataResponse[0].id.toString()));
        if (returnCompeteData) {
          setValueSelected([dataResponse[0]]);
          setInputValue(concatenateNames(dataResponse[0]));
        } else {
          const objectSelect = dataMap.filter(
            (element) =>
              element.id.toString() === dataResponse[0][idFind].toString(),
          );
          setValueSelected(objectSelect);
          setInputValue(objectSelect[0].name);
        }
      }
      setDataFind(dataMap);
    } catch (error) {
      console.log("Error en el Componente Autocomplete", error);
    }
  };

  const requestStatic = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataMap: ListArray[] = dataComplete.map((element: any) => {
      return {
        id: element[idFind],
        name: concatenateNames(element),
      };
    });
    const dataFilter = dataMap.filter((element) =>
      element.name.toUpperCase().includes(inputValue.toUpperCase()),
    );
    if (
      inputValue !== inputValueSuplement &&
      autoSelectedFirstValue &&
      dataFilter[0] !== undefined
    ) {
      setValueSelected([dataFilter[0]]);
      setInputValue(dataFilter[0].name);
    }

    setDataFind(dataFilter);
  };

  const hadleChangeValueInput = () => {
    if (!isStaticData) {
      setIsLoading(true);
    }
    if (isStaticData && dataComplete.length !== 0) {
      requestStatic();
      setIsLoading(false);
    } else {
      clearTimeout(stateIdSetTimeOut);
      const idSetTimeOut = setTimeout(
        () => {
          request();
          setIsLoading(false);
        },
        dataComplete.length !== 0 ? 1000 : 0,
      );
      setStateIdSetTimeOut(idSetTimeOut);
    }
  };

  // Hace la peticion de carga (Cuando se carga el conponente)
  useEffect(() => {
    hadleChangeValueInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectedItem = (id: number | string) => {
    const newSelected = dataFind.find((element) => element.id === id);
    setIdSelected(parseInt(id.toString()));
    if (returnCompeteData) {
      const dataSelected: never[] = [];
      dataComplete.map((element) => {
        if (element[idFind] === id) {
          dataSelected.push(element);
        }
        return "";
      });
      setValueSelected(dataSelected);
      if (onSelectionChange) {
        onSelectionChange(dataSelected[0]);
      }
    } else {
      setValueSelected(newSelected !== undefined ? [newSelected] : []);
      if (onSelectionChange) {
        onSelectionChange(
          newSelected !== undefined ? newSelected : { id: 0, name: "" },
        );
      }
    }

    setInputValue(newSelected !== undefined ? newSelected.name : "");
    // setIsOpen(false);
  };

  const handleValueChange = (value: string) => {
    setInputValue(value);
    setInputValueSuplement(value);
    hadleChangeValueInput();
  };
  const listProducts = (
    <div className="relative w-full">
      {isOpen && (
        <div
          className="absolute w-11/12 z-30 bg-inherit rounded-md p-3 bg-white dark:bg-neutral-600 animate-fade-down animate-duration-300"
          style={{
            overflow: "scroll",
            maxHeight: "200px",
            top: placement === "bottom" ? "100%" : "unset",
            bottom: placement === "top" ? "100%" : "unset",
            background:
              theme !== "dark" //  || theme === "linght" || theme === undefined
                ? "white"
                : "#27272A",
            ...propsContainer,
          }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <Spinner size="sm" />
            </div>
          ) : (
            dataFind.map((element, index) => (
              <div
                key={index}
                onClick={() => {
                  setIsOpen(false);
                  handleSelectedItem(element.id);
                }}
                className="w-full flex items-center bg-inherit justify-between dark:hover:bg-neutral-600 p-1 rounded-xl cursor-pointer duration-200 shadow-sm mb-1 min-h-10 z-40"
                style={{
                  background:
                    theme !== "dark" // ||
                      ? // theme === "linght" ||
                        // theme === undefined
                        "white"
                      : "#18181A",
                }}
              >
                <p className="px-2 uppercase text-sm dark:text-white">
                  {element.name}
                </p>
                {idSelected.toString() === element.id.toString() && (
                  <p>
                    <IoCheckmarkOutline size={20} />
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="relative w-full">
      {placement === "top" && listProducts}
      <Input
        label="Seleccione"
        size="sm"
        color="default"
        variant="flat"
        autoComplete="off"
        ref={inputRef}
        value={
          valueSelected && valueSelected.length > 0
            ? concatenateNames(valueSelected[0]) === "undefined"
              ? ""
              : concatenateNames(valueSelected[0])
            : inputValue
        }
        {...propsInput}
        onValueChange={handleValueChange}
        onFocusChange={(focus) => {
          setTimeout(
            () => {
              setIsOpen(focus);
              setIdSelected((prev) => {
                if (!focus && prev === 0) {
                  //  setInputValue("");
                }
                return prev;
              });
            },
            isOpen ? 300 : 100,
          );
        }}
        endContent={
          <div className="flex h-full gap-2">
            <button
              type="button"
              onClick={() => {
                setInputValue("");
                setInputValueSuplement("");
                setIdSelected(0);
                setValueSelected([]);
                if (!isOpen) {
                  setIsOpen(true);
                }
                inputRef.current?.focus();
                if (onSelectionChange) onSelectionChange({ id: 0, name: "" });
              }}
            >
              <IoClose size={20} color="#74747E" />
            </button>
            <button
              className="focus:outline-none"
              type="button"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <IoIosArrowUp
                  size={20}
                  color="#74747E"
                  className="animate-flip-up"
                />
              ) : (
                <IoIosArrowDown
                  size={20}
                  color="#74747E"
                  className="animate-flip-down"
                />
              )}
            </button>
          </div>
        }
      />
      {placement === "bottom" && listProducts}
    </div>
  );
};
