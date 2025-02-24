import { type FC, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { IoIosArrowBack, IoIosArrowDown } from "../icons/icons";
import { formatNumToStr } from "../utils/formatNumber";

interface Props {
  arrayListInfo: Prices[];
  amount: number;
  title: string;
  showAmountTax: boolean;
  // isOpenPopover: boolean;
  // setIsOpenPopover: Dispatch<SetStateAction<boolean>>;
}

interface Prices {
  name: string;
  value: number;
  taxName: string;
}

export const MultipleListInfo: FC<Props> = ({
  arrayListInfo,
  amount,
  title,
  showAmountTax,
  // isOpenPopover,
  // setIsOpenPopover,
}) => {
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const ChickInProvider = (e: boolean) => {
    setIsOpenPopover(e);
  };
  const cadena = arrayListInfo
    .map((element, index) => `${index !== 0 ? " " : ""}${element.taxName}`)
    .toString();

  return (
    <div className="cursor-pointer">
      <Popover
        isOpen={isOpenPopover}
        onOpenChange={(e) => {
          ChickInProvider(e);
        }}
        showArrow={true}
        placement="bottom"
      >
        <PopoverTrigger>
          {showAmountTax ? (
            <div
              className="flex flex-col items-center justify-center"
              onClick={() => {
                setIsOpenPopover(!isOpenPopover);
              }}
            >
              <p className="mr-2 text-[15px] text-default-500">Total {title}</p>
              <div className="flex items-center text-[15px]">
                <p className="mr-1">$</p>
                {formatNumToStr(amount)}
                {isOpenPopover ? (
                  <IoIosArrowBack size={15} className="ml-1" />
                ) : (
                  <IoIosArrowDown size={15} className="ml-1" />
                )}
              </div>
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center"
              onClick={() => {
                setIsOpenPopover(!isOpenPopover);
              }}
            >
              <p className="mr-2 text-[15px] text-default-500">{title}:</p>

              <div className="flex items-center text-[15px]">
                <p className="mr-2 text-[13px] text-black dark:text-white truncate ">
                  {`${cadena.length > 14 ? cadena.substring(0, 14) + "..." : cadena}`}
                </p>
                {isOpenPopover ? (
                  <IoIosArrowBack size={15} className="ml-1" />
                ) : (
                  <IoIosArrowDown size={15} className="ml-1" />
                )}
              </div>
            </div>
          )}
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex p-2 ">
            <div className=" text-default-500">
              {arrayListInfo.map((element, index) => (
                <p key={index} className="text-black dark:text-white">
                  {element.name}
                </p>
              ))}
            </div>
            <div className="flex flex-col items-end w-[100px] ">
              {arrayListInfo.map((element, index) => (
                <span key={index}> $ {formatNumToStr(element.value)}</span>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
