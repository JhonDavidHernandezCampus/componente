import { ProductContext } from "./../context/ProductContext";
import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import React, { Dispatch, FC, useContext, useEffect, useState } from "react";
import {
  EstructureColor,
  ObjectAmounts,
  TablePropsComponent,
} from "../TableBuys/TableBuyComponent";
import { ProductList } from "../interface/productList";
import { TbShoppingCart } from "../icons/icons";
import { formatNumToNum, formatNumToStr } from "../utils/formatNumber";

interface Props {
  type: "normal" | "payroll" | "bills" | "none";
  title: string;
  borderRadius?: string;
  handlePay: (items: ProductList[]) => void;
  color?: EstructureColor;
  propsTable?: TablePropsComponent;
  arrayAmounts: { key: string; title: string; isVisible?: boolean }[];
  isLoading?: boolean;
  setStateAmounts: Dispatch<React.SetStateAction<ObjectAmounts>>;
  titleBtn?: string;
  typeOrder: "sell" | "buy";
}

export const CardAmount: FC<Props> = ({
  type,
  title,
  arrayAmounts,
  borderRadius = "10px",
  handlePay,
  color,
  propsTable,
  isLoading = false,
  setStateAmounts,
  titleBtn,
  typeOrder,
}) => {
  const currentDate = Date.now();
  const [totalsAmoun, setTotalsAmoun] = useState({});
  const today = new Date(currentDate).toISOString().substring(0, 10);

  const { productList } = useContext(ProductContext);

  const getAmountList = (propertie: string) => {
    return productList.reduce(
      (accumulator, element: any) => accumulator + element[propertie],
      0,
    );
  };

  const TaxExclusiveAmount = productList.reduce((accumulator, element) => {
    const ivaExcluded = element.taxes?.find(
      (tax) => tax.id.toString() === "105" /* ||
        tax.type?.toLocaleLowerCase() === "excluido" ||
        tax.type?.toLocaleLowerCase() === "excluded", */,
      // tax.Concept?.toLocaleLowerCase() === "excluido" ||
      // tax.Concept?.toLocaleLowerCase() === "excluded",
    );
    return accumulator + (ivaExcluded ? 0 : (element?.unitValue ?? 0));
  }, 0);

  let amounts: ObjectAmounts = {};

  useEffect(() => {
    if (JSON.stringify(amounts) !== JSON.stringify(totalsAmoun)) {
      setTotalsAmoun(amounts);
      setStateAmounts({ ...amounts, TaxExclusiveAmount });
    }
  }, [amounts]);

  switch (type) {
    case "normal":
      return (
        <div className="w-full flex justify-end 2xl:justify-center pr-6">
          <Card
            style={{
              borderRadius,
              border: "1px solid #D4D4D8",
              minWidth: "350px",
            }}
            className={"mb-5"}
            {...(propsTable?.propsCard ?? {})}
          >
            <CardHeader
              style={{
                backgroundColor: color?.colorApp ?? "#2B6FEE",
                borderRadius: "0",
                borderBottom: "1px solid #D4D4D8",
              }}
              className="dark:bg-inherit"
            >
              <div className="flex items-center w-full gap-3 py-2">
                <TbShoppingCart className="ml-2 text-white" size={24} />
                <h2 className="text-lg text-white font-semibold">
                  Información {title}
                </h2>
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex gap-5 my-2 ml-2">
                <p className="font-semibold">Fecha</p>
                <p className="font-light">{today.replaceAll("-", "/")}</p>
              </div>
              {arrayAmounts.map((element, index) => {
                const amount = getAmountList(element.key);
                amounts = { ...amounts, [element.key]: amount };
                if (element.isVisible === false) return ""; // Si se quiere que no se muestre se retorna vacio

                return (
                  <div key={index}>
                    {index === arrayAmounts.length - 1 ? (
                      <Divider className="my-2 w-full" />
                    ) : (
                      ""
                    )}
                    <div className="flex justify-end my-2 mr-2">
                      <p className="font-light w-full full ">
                        {element.title}:{" "}
                      </p>
                      <p className="text-end" style={{ minWidth: "208px" }}>
                        COP {formatNumToNum(amount, 2)}
                      </p>
                    </div>
                  </div>
                );
              })}
              <Button
                size="lg"
                className="mt-3 text-white"
                isDisabled={productList.length === 0}
                style={{ borderRadius }}
                isLoading={isLoading}
                color={color?.colorComponent ?? "success"}
                {...(propsTable?.btnEndBuyProps ?? {})}
                onPress={() => {
                  handlePay(productList);
                }}
              >
                {titleBtn ?? `Generar ${title}`}
              </Button>
            </CardBody>
          </Card>
        </div>
      );
    case "payroll":
      // amounts = { PayableAmount, DiscountAmount };
      return (
        <div className="w-full mt-5">
          {arrayAmounts.map((element, index) => {
            const amount = getAmountList(element.key);
            amounts = { ...amounts, [element.key]: amount };
            if (element.isVisible === false) return "";

            return (
              <div key={index}>
                <div className="flex justify-end items-end flex-col">
                  <div className="flex">
                    <h2 className="text-xl">{element.title}: </h2>
                    <p
                      className="font-semibold text-xl text-end"
                      style={{ minWidth: "208px" }}
                    >
                      COP {formatNumToStr(amount)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex justify-end items-end flex-col">
            <Divider className="my-2" style={{ width: "465px" }} />
            <div className="flex">
              <h2 className="text-xl">Total: </h2>
              <p
                className="font-semibold text-xl text-end"
                style={{ minWidth: "208px" }}
              >
                COP
                {formatNumToStr(
                  (amounts?.accrual ?? 0) - (amounts?.deduction ?? 0),
                )}
              </p>
            </div>
          </div>
        </div>
      );
    case "bills":
      return (
        <div className="w-full  mt-5">
          {arrayAmounts.map((element, index) => {
            const amount = getAmountList(element.key);
            amounts = { ...amounts, [element.key]: amount };
            if (element.isVisible === false) return "";

            return (
              <div key={index}>
                <div className="flex justify-end items-end flex-col">
                  {index === arrayAmounts.length - 1 ? (
                    <Divider className="my-2" style={{ width: "465px" }} />
                  ) : (
                    ""
                  )}
                  <div className="flex">
                    <h2 className="text-xl">{element.title}: </h2>
                    <p
                      className="font-semibold text-xl text-end"
                      style={{ minWidth: "208px" }}
                    >
                      COP {formatNumToStr(amount)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    default:
      return <div style={{ display: "none" }}></div>;
  }
};
