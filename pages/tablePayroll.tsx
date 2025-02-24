import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import testApi from "./api/testApi";
import { useEffect, useState } from "react";
import {
  MultipleAttributes,
  ProductList,
} from "../components/interface/productList";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";

import { AutoComplete } from "./../components/autocomplete/AutoComplete";
import { generateGuid } from "./../components/utils/gererateGuid";
import TableBuyComponent, {
  ClassNamesTable,
  ColumnsTable,
  InputsArray,
} from "../components/TableBuys/TableBuyComponent";

import { SwitchTheme } from "../components/theme/SwichTheme";

interface City {
  id: number;
  code: string;
  name: string;
}

export interface ListArray {
  id: number | string;
  name: string;
}

import axios from "axios";
import { useTheme } from "next-themes";
import Link from "next/link";
import { FiPlus, IoIosAdd } from "../components/icons/icons";

const testPage: NextPage = () => {
  const invoiceColumns = [
    {
      name: "CONCEPTO",
      key: "Type",
      type: "default",
    },
    {
      name: "CANTIDAD",
      key: "quantity",
      type: "default",
    },
    {
      name: "Fecha",
      key: "dateItems",
      type: "default",
    },
    {
      name: "DEVENGADO",
      key: "accrual",
      type: "default",
    },
    {
      name: "DEDUCCIÓN",
      key: "deduction",
      type: "default",
    },
    {
      name: "DETALLE",
      key: "details",
      type: "actions",
    },
  ];
  const axiosInstance = testApi();
  // const companyId = "901084328"; // 6
  const companyId = "6"; // 6
  const apikey = "4d6356d5-c17c-4539-a679-cc9c27537a27";

  const handlePay = () => {
    console.log("hacemos accion de generar venta");
  };

  const [productSelected, setProductSelected] = useState<ProductList>();
  const [stateAmounts, setStateAmounts] = useState({});

  const [ItemQuantity, setItemQuantity] = useState("1");
  const [date, setDate] = useState("2022-12-22");
  const [ItemDiscount, setItemDiscount] = useState("0");
  const [ItemAmount, setItemAmount] = useState("0");
  const [ItemType, setItemType]: any = useState(new Set(["Devengo"]));
  const [ItemUnitValue, setItemUnitValue] = useState("0");

  // TAX LIST SELECT
  const [multipleListApi, setMultipleListApi] = useState<MultipleAttributes[]>(
    [],
  );

  useEffect(() => {
    const petiApi = async () => {
      const { data } = await testApi().get(
        "settings/invoices/items?companyId=6&apikey=4d6356d5-c17c-4539-a679-cc9c27537a27",
      );
      setMultipleListApi(data.taxes);
    };
    petiApi();
  }, [testApi]);

  const axiosAPI = axios.create({
    baseURL: "https://lab.cuental.com/api/v1",
  });
  const inputsArray: InputsArray[] = [
    /*  {
      name: "another",
      type: "searchProduct",
      state: productSelected,
      setState: setProductSelected,
      namePropsEvent: "none",
    }, */
    {
      /* name: "another",
      type: "select",
      state: ItemType,
      namePropsEvent: "onSelectionChange",
      setState: setItemType, */
      name: "another",
      type: "searchProduct",
      state: productSelected,
      setState: setProductSelected,
      namePropsEvent: "none",
      input: (
        <Select
          id="AccountType"
          name="Type"
          placeholder="Selecciona un tipo de cuenta"
          aria-label="Selecciona un tipo de cuenta"
          selectedKeys={ItemType}
          radius="none"
          onSelectionChange={setItemType}
          size="lg"
        >
          <SelectItem key={"Devengo"} value={"Devengo"}>
            Devengo
          </SelectItem>
          <SelectItem key={"Deducción"} value={"Deducción"}>
            Deducción
          </SelectItem>
        </Select>
      ),
    },
    {
      name: "another",
      type: "input",
      state: ItemQuantity,
      setState: setItemQuantity,
      namePropsEvent: "onValueChange",
      input: (
        <Input
          size="sm"
          name="quantity"
          radius="none"
          required
          value={ItemQuantity}
          onValueChange={(e) => {
            if (e.match("^[0-9.]*$") !== null) {
              setItemQuantity(e);
            }
          }}
          label="Cantidad"
        />
      ),
    },
    {
      name: "date",
      type: "input",
      state: date,
      setState: setDate,
      namePropsEvent: "onValueChange",
      input: (
        <Input
          size="sm"
          name="dateItems"
          type="date"
          radius="none"
          required
          value={date}
          onValueChange={(e) => {
            setDate(e);
          }}
          label="Fecha"
        />
      ),
    },
    {
      name: "another",
      type: "input",
      state: ItemAmount,
      namePropsEvent: "onValueChange",
      setState: setItemAmount,
      input: (
        <Input
          size="sm"
          name="accrual"
          radius="none"
          type="number"
          value={ItemAmount}
          onValueChange={(e) => {
            if (e.match("^[0-9.]*$") !== null) {
              setItemAmount(e);
            }
          }}
          label="Devengado"
        />
      ),
    },
    {
      name: "another",
      type: "input",
      state: ItemDiscount,
      namePropsEvent: "onValueChange",
      setState: setItemDiscount,
      input: (
        <Input
          size="sm"
          name="deduction"
          radius="none"
          type="number"
          value={ItemDiscount}
          onValueChange={(e) => {
            if (e.match("^[0-9.]*$") !== null) {
              setItemDiscount(e);
            }
          }}
          label="Deducción"
        />
      ),
    },
    {
      name: "another",
      type: "button",
      namePropsEvent: "onValueChange",
      input: (
        <div className="flex space-around">
          <Button
            color="success"
            endContent={<IoIosAdd size={23} />}
            size="md"
            radius="none"
            type="submit"
            className="w-full text-white"
            onPress={() => {}}
          />
          <Button
            variant="flat"
            isIconOnly
            color="success"
            radius="none"
            // onPress={() => onOpen()}
          >
            <FiPlus size={20} />
          </Button>
        </div>
      ),
    },
  ];

  /*   useEffect(() => {
    console.log(productSelected);
  }, [productSelected]);

  useEffect(() => {
    console.log(ItemType);
  }, [ItemType]);
 */
  const arrayAmounts = [
    { title: "Devengo", key: "accrual" },
    { title: "Deduccion", key: "deduction" },
  ];
  const [thirdSelected, setThirdSelected] = useState<ListArray[] | never[]>([]);

  const { theme } = useTheme();

  useEffect(() => {
    console.log(thirdSelected);
  }, [thirdSelected]);
  const [employe, setEmploye] = useState<ListArray[]>([
    /* { id: idEmploye as any, name: "" }, */
  ]);

  const classNames: ClassNamesTable = {
    wrapper: ["rounded-none", "shadow-none", "max-h-[382px]"],
    form: "px-0 ",
    table: "py-0",
    base: ["gap-0 "],
    th: [
      "bg-white dark:bg-inherit",
      "border",
      "rounded-none",
      "font-bold",
      "border-divider",
      "text-default-600",
      "text-sm",
    ],
    td: [
      // changing the rows border radius
      // first
      "border",
      "dark:border-none",
      "bg-white dark:bg-inherit",
      "group-data-[first=true]:first:before:rounded-none",
      "group-data-[first=true]:last:before:rounded-none",
      // middle
      "group-data-[middle=true]:before:rounded-none",
      // last
      "group-data-[last=true]:first:before:rounded-none",
      "group-data-[last=true]:last:before:rounded-none",
    ],
  };

  return (
    <>
      <Head>
        <title>Tabla en Venta</title>
      </Head>

      <TableBuyComponent
        columnsTable={invoiceColumns}
        handleEndBuy={(items) => {
          // const itemsFormatted = handleClickItem(items)
          // handleClick(itemsFormatted)
          console.log(items);
          // const itemsFormatted = handleClickItem(items as any);
          // handleClick(itemsFormatted);
        }}
        arrayAmounts={arrayAmounts}
        inputsArray={inputsArray}
        propsTable={{ classNames }}
        setStateAmounts={setStateAmounts}
        typeShowAmounts="payroll"
        typeOrder={"sell"}
        theme={theme}
      />
      <SwitchTheme color="primary" />

      <Link
        href="/tableBuy"
        type="button"
        className="bg-zinc-300 rounded-md p-3 hover:bg-zinc-500 cursor-pointer"
      >
        ir a compra
      </Link>
      <div className="flex gap-3 px-20 mt-10 items-center">
        <AutoComplete
          setValueSelected={setThirdSelected}
          OptionsSelects={[
            {
              id: "1",
              name: "SE SE PEUDE",
            },
          ]}
          onSelectionChange={(element) => {
            console.log(element);
          }}
          returnCompeteData
          nameCampsArray={["name", "id", "another"]}
          /*  setValueSelected={setThirdSelected}
          urlRequest={`settings/activities?companyId=6&page=0&apikey=4d6356d5-c17c-4539-a679-cc9c27537a27&warehouseId=29&contactId=12603&name=`}
          idFind="id"
          isStaticData={false}
          returnCompeteData={false}
          valueSelected={thirdSelected}
          // initValueInput={thirdSelected[0]?.name ?? "arandanos"}
          propsInput={{
            label: "Seleccione el tercero",
            placeholder: "Tercero",
          }}
          axiosInstance={axiosAPI}
          autoSelectedFirstValue={true}
          nameCampsArray={["name"]} */
        />
        <AutoComplete
          propsInput={{
            label: "Empleado",
          }}
          propsContainer={{
            boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.2)",
          }}
          axiosInstance={axiosAPI}
          urlRequest={`contacts/?companyId=${companyId}&page=0&apikey=${apikey}&name=`}
          isStaticData={false}
          returnCompeteData
          valueSelected={employe}
          setValueSelected={setEmploye}
          onSelectionChange={(employe: any) => {
            console.log(employe);
          }}
          nameCampsArray={[
            "name",
            "identification",
            "commercialName",
            "firstName",
            "middleName",
            "firstSurname",
            "secondSurname",
          ]}
        />
        <Button
          radius="none"
          variant="solid"
          color="success"
          onPress={() => {
            // setProductSelected((prev) => ({ ...prev, jefe: "Andres" }) as any);
            setThirdSelected([{ id: 2, name: "Andres Vargas " }]);
          }}
        >
          Press
        </Button>
        <Button
          radius="none"
          variant="solid"
          color="danger"
          onPress={() => {
            // setProductSelected((prev) => ({ ...prev, jefe: "Andres" }) as any);
            setThirdSelected([{ id: 2, name: "Alexander Candela" }]);
          }}
        >
          Press
        </Button>
        <Input
          size="md"
          type="date"
          radius="none"
          // required
          value={date}
          onValueChange={(e) => {
            console.log(date);
            console.log(e);
            if (e.match("^[0-9.]*$") !== null) {
              setDate(e);
            }
          }}
          label="Fecha now"
        />
      </div>
    </>
  );
};

export default testPage;
