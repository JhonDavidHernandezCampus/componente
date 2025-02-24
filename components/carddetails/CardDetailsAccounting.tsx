import {
  ProductContext,
  ProductContextAccounting,
} from "../context/ProductContext";
import { Card, CardProps, Divider } from "@nextui-org/react";
import React, { Dispatch, FC, useContext, useEffect, useState } from "react";
import { ObjectAmounts } from "../TableBuys/TableBuyComponent";
import { ProductListAccouting } from "../interface/productListAccouting";
import { formatNumToStr } from "../utils/formatNumber";

interface Props {
  // children?: ReactNode;
  title?: string;
  propsCard?: CardProps;
  handlePay?: (items: ProductListAccouting[]) => void;
  arrayAmounts: { key: string; title: string; isVisible?: boolean }[];
  isLoading?: boolean;
  setStateAmounts?: Dispatch<React.SetStateAction<ObjectAmounts>>;
}

export const CardAmountAccounting: FC<Props> = ({
  title,
  arrayAmounts,
  propsCard,
  handlePay,
  isLoading = false,
  setStateAmounts,
}) => {
  const [totalsAmoun, setTotalsAmoun] = useState({});

  const { productList } = useContext(ProductContextAccounting);

  const getAmountList = (propertie: string) => {
    return productList.reduce((accumulator, element: any) => {
      return accumulator + element[propertie];
    }, 0);
  };

  let amounts: ObjectAmounts = {};

  useEffect(() => {
    if (JSON.stringify(amounts) !== JSON.stringify(totalsAmoun)) {
      setTotalsAmoun(amounts);
      if (setStateAmounts) setStateAmounts({ ...amounts });
    }
  }, [amounts]);

  return (
    <div className="mt-5 px-4 flex justify-end w-full ">
      <Card
        className="w-[400px]  bg-transparent shadow-none rounded-none"
        {...propsCard}
      >
        {arrayAmounts.map((element, index) => {
          const amount = getAmountList(element.key);
          amounts = { ...amounts, [element.key]: amount };
          if (element.isVisible === false) return "";

          return (
            <div key={index} className="">
              <div className="flex justify-end items-end flex-col ">
                {index === arrayAmounts.length - 1 && (
                  <Divider className="my-2 " />
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
      </Card>
    </div>
  );
};
