import { MultipleAttributes, ProductList } from "./../interface/productList";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";

import {
  RiAddFill,
  RiErrorWarningFill,
  TbCurrencyDollar,
  TbPercentage,
  TbTrash,
} from "../icons/icons";
import {
  calculateInvoiceItem,
  ItensInvoice,
} from "../utils/calculateCompleteTaxes";

interface Props<T extends ProductList> {
  multipleListApi: MultipleAttributes[];
  productTarget?: T;
  setProductTarget?: Dispatch<SetStateAction<T | undefined>>;
  infoBaseForCalcules?: ItensInvoice;
  setInfoLocalProduct?: Dispatch<SetStateAction<ItensInvoice | undefined>>;
  typeOrder?: "sell" | "buy";
  titleProp:
    | "taxes"
    | "charges"
    | "retentions"
    | "Taxes"
    | "Charges"
    | "Retentions";
  // onChange?: (element: Partial<T>) => void;
  onChange?: (element: any[]) => void;
}

export const MultipleTax = <T extends ProductList>({
  multipleListApi,
  productTarget,
  infoBaseForCalcules,
  setInfoLocalProduct,
  typeOrder,
  setProductTarget,
  titleProp,
  onChange,
}: Props<T>) => {
  // Discloruse Modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Impuestos, Descuentos, Cargos, Retenciones
  const validProptitleProp = () => {
    switch (titleProp.toLowerCase()) {
      case "taxes":
        return "Impuestos";
      case "charges":
        return "Cargos";
      case "retentions":
        return "Retenciones";
      default:
        return "Impuestos";
    }
  };

  // TAX LIST SELECT
  const [newTax, setNewTax] = useState<MultipleAttributes[]>(
    productTarget
      ? (productTarget[titleProp] ?? [])
      : infoBaseForCalcules
        ? (infoBaseForCalcules.taxes ?? [])
        : [],
  );

  const handlerAddTax = () => {
    const ValidateNewTax = newTax.find((element) => element.id === 0);
    if (!ValidateNewTax) {
      const newTaxObject = [
        ...newTax,
        {
          id: 0,
          name: "",
          code: "0",
          value: 0,
          percentage: 0,
          isUnitAmount: titleProp.toLowerCase() === "taxes" ? false : true,
        },
      ];
      setNewTax(newTaxObject);
    }
  };

  const handleAddTotal = (onClose: () => void) => {
    const saveTax = newTax.filter((element) => element.id !== 0);
    if (setProductTarget && productTarget)
      setProductTarget({ ...productTarget, [titleProp]: saveTax });

    // if (onChange) onChange({ ...productTarget, [titleProp]: saveTax });
    if (infoBaseForCalcules && onChange) {
      const productFormated = calculateInvoiceItem({
        type: typeOrder ?? "sell",
        product: { ...infoBaseForCalcules, taxes: saveTax },
      });
      onChange(productFormated.taxes ?? []);
    }
    if (setInfoLocalProduct && infoBaseForCalcules)
      setInfoLocalProduct({ ...infoBaseForCalcules, taxes: saveTax });

    setNewTax(saveTax);
    onClose();
  };

  return (
    <>
      <Button variant="light" isIconOnly onPress={onOpen}>
        <RiAddFill size={20} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <div className="w-full flex justify-between items-center mt-10">
                  <p className="text-md">Lista de {validProptitleProp()}</p>
                  <Button
                    size="sm"
                    onClick={handlerAddTax}
                    variant="flat"
                    isIconOnly
                    color="success"
                  >
                    <RiAddFill size={20} />
                  </Button>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="w-full flex flex-col items-center gap-3">
                  {newTax.length > 0 ? (
                    newTax.map((elementTax, index) =>
                      titleProp.toLowerCase() === "taxes" ||
                      titleProp.toLowerCase() === "retentions" ? (
                        <SelectObject
                          key={index}
                          isUnitAmount={elementTax.isUnitAmount}
                          arrayFind={multipleListApi}
                          elementIterations={elementTax}
                          newTax={newTax}
                          setNewTax={setNewTax}
                          titleProp={titleProp}
                        />
                      ) : (
                        // <SelectValue
                        //     key={index}
                        //     arrayFind={multipleListApi}
                        //     elementIterations={elementTax}
                        //     newTax={newTax}
                        //     setNewTax={setNewTax}
                        // />
                        <div></div>
                      ),
                    )
                  ) : (
                    <div
                      className="w-full h-[48px] bg-[#FCEEDA] rounded-lg"
                      style={{ backgroundColor: "#FCEEDA" }}
                    >
                      <div className="flex justify-between items-center h-full">
                        <RiErrorWarningFill
                          size={23}
                          strokeWidth="2.5"
                          className="ml-5 text-[#C4841D]"
                        />
                        <p className="mr-5 text-[#C4841D] font-medium">
                          Sin {validProptitleProp()}
                        </p>
                        <div></div>
                      </div>
                    </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button onPress={() => handleAddTotal(onClose)}>Guardar</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

interface PropsSelectObject {
  arrayFind: MultipleAttributes[];
  elementIterations?: MultipleAttributes;
  newTax: MultipleAttributes[];
  setNewTax: Dispatch<SetStateAction<MultipleAttributes[]>>;
  isUnitAmount?: boolean;
  titleProp: string;
}

const SelectObject: FC<PropsSelectObject> = ({
  arrayFind,
  elementIterations,
  newTax,
  setNewTax,
  isUnitAmount = false,
  titleProp,
}) => {
  const [taxsReadiSelected, setTaxsReadiSelected] = useState<string[]>([]);
  const [taxSelexteKey, setTaxSelexteKey] = useState<string[]>([]);
  /*  const [valueInputTax, setValueInputTax] = useState(
    elementIterations?.value === undefined
      ? "0"
      : elementIterations.value.toString(),
  ); */
  const [valueInputTax, setValueInputTax] = useState(
    (elementIterations?.value ?? elementIterations?.amount ?? 0).toString(),
  );

  const handleSelectionChangeTax = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const indexArrayEditTax = newTax.findIndex(
      (element) => element.id === elementIterations?.id,
    );
    const objectTax = arrayFind.find(
      (element) => parseInt(element.id.toString()) === parseInt(e.target.value), // parseInt(element.id.toString())
    );
    const arrayEditTax = newTax.map((element, index) => {
      if (indexArrayEditTax === index) {
        if (objectTax) {
          element = objectTax;
        }
      }
      return element;
    });
    setNewTax(arrayEditTax);
  };

  // Asignacion del valor a los impuestos que son de tipo valor
  useEffect(() => {
    const indexArrayEditTax = newTax.findIndex(
      (element) => element.id === elementIterations?.id,
    );
    const arrayEditTax = newTax.map((element, index) => {
      if (indexArrayEditTax === index) {
        // En casos puede llegar del API type o isUnitAmount, por esto se validan las dos
        if (
          element.isUnitAmount ||
          element.type === "amount" ||
          element.concept === "amount"
        ) {
          if (titleProp.toLowerCase() === "taxes") {
            element.value = parseFloat(valueInputTax);
          } else {
            element.percentage = parseFloat(valueInputTax);
          }
        }
      }
      return element;
    });
    setNewTax(arrayEditTax);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueInputTax]);

  // Function delete in Tax
  const deleteProductOfCar = (idEliminar: number) => {
    const arrayDelete = newTax.filter(
      (element) => parseInt(element.id.toString()) !== idEliminar,
    );
    setNewTax(arrayDelete);
  };

  useEffect(() => {
    if (elementIterations?.id !== undefined) {
      const arrayItemsReadiSelect = newTax.map((element) => {
        return element.id.toString();
      });
      setTaxsReadiSelected(arrayItemsReadiSelect);
    } else {
      const newKey = newTax.length >= 1 ? [newTax[0].id.toString()] : [];
      setTaxSelexteKey(newKey);
    }
  }, [elementIterations?.id, newTax]);

  return (
    <>
      <div className="w-full flex items-center gap-2">
        <Select
          size="sm"
          label={titleProp.toLowerCase() === "taxes" ? "Impuesto" : "Retención"}
          placeholder={
            titleProp.toLowerCase() === "taxes" ? "Impuesto" : "Retención"
          }
          className="w-full"
          disabledKeys={taxsReadiSelected}
          selectedKeys={
            elementIterations?.id
              ? [elementIterations?.id.toString()]
              : taxSelexteKey
          }
          defaultSelectedKeys={
            elementIterations?.id
              ? [elementIterations?.id.toString()]
              : taxSelexteKey
          }
          onChange={handleSelectionChangeTax}
        >
          {arrayFind.map((element) => {
            return (
              <SelectItem key={element.id} value={element.id}>
                {element.name}
              </SelectItem>
            );
          })}
        </Select>
        {isUnitAmount ||
        elementIterations?.type === "amount" ||
        elementIterations?.concept === "amount" ? (
          <Input
            type="number"
            size="sm"
            className="w-full"
            label={titleProp.toLowerCase() === "taxes" ? "Valor" : "Porcentaje"}
            value={valueInputTax}
            onValueChange={setValueInputTax}
            startContent={
              titleProp.toLowerCase() === "taxes" ? (
                <TbCurrencyDollar
                  size={16}
                  className="mb-[2px] text-default-500"
                />
              ) : (
                <TbPercentage size={15} className="mb-[2px] text-default-500" />
              )
            }
          />
        ) : (
          <></>
        )}
        {arrayFind.length > 0 &&
          // arrayFind[0].percentage !== undefined &&
          ((elementIterations?.id !== newTax[0].id &&
            titleProp.toLowerCase() === "taxes") ||
            titleProp.toLowerCase() === "retentions") && (
            <Button
              onClick={() => {
                deleteProductOfCar(
                  parseInt((elementIterations?.id ?? "0").toString()),
                );
              }}
              isIconOnly
              color="danger"
              variant="flat"
              size="sm"
              edaria-label="Take a photo"
            >
              <TbTrash size={15} />
            </Button>
          )}
      </div>
    </>
  );
};
