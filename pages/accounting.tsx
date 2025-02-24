import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import testApi from "./api/testApi";
import { useEffect, useState } from "react";
import {
  MultipleAttributes,
  ProductList,
} from "../components/interface/productList";

import {
  AutoComplete,
  ListArray,
} from "../components/autocomplete/AutoComplete";
import { Button, Input } from "@nextui-org/react";
import { Autocomplete } from "../components/JComponentes/Autocomplete";
import {
  inputsArrayAccouting,
  TableAccounting,
} from "../components/TableAccounting/TableBuyComponent";

import { useTheme } from "next-themes";
import { IoIosAdd, IoIosArrowUp } from "../components/icons/icons";
import awsApi from "../types/awsApi";
import { ClassNamesTable } from "../components/TableBuys/TableBuyComponent";
import { ProductListAccouting } from "../components/interface/productListAccouting";
import { formatAccoutingProduct } from "../components/utils/formatAccoutingProduct";
import axios from "axios";

const testPage: NextPage = () => {
  interface ColumnsTable {
    name: string;
    key: string;
    type: "actions" | "default";
    width?: number | undefined;
    aling?: "start" | "center" | "end";
  }

  const invoiceColumns: ColumnsTable[] = [
    {
      name: "CONCEPTO",
      key: "name",
      type: "default",
    },
    {
      name: "MESA XD",
      key: "mesaName",
      type: "default",
    },
    {
      name: "CANTIDAD",
      key: "quantity",
      type: "default",
    },
    {
      name: "DEVENGADO",
      key: "accrual",
      type: "default",
    },
    {
      name: "DEDUCCION",
      key: "deduction",
      type: "default",
    },
    {
      name: "ACCIONES",
      key: "actions",
      type: "actions",
    },
  ];

  const invoiceColumnsAccouting: ColumnsTable[] = [
    {
      name: "CUENTA",
      key: "secondNameSandbox",
      type: "default",
    },
    {
      name: "DEBITO",
      key: "debit",
      type: "default",
    },
    {
      name: "Name Sandbox",
      key: "name",
      type: "default",
    },
    {
      name: "CREDITO",
      key: "credit",
      type: "default",
    },
    {
      name: "VALOR BASE",
      key: "baseValue",
      type: "default",
    },
    {
      name: "ACCIONES",
      key: "actions",
      type: "actions",
    },
  ];

  const axiosInstance = testApi();
  const axiosAPI = axios.create({
    baseURL: "https://lab.globho.com/api/v1",
  });
  const bilidoxInstance = awsApi(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MTUyMTc0NSIsImVtYWlsIjoiZ2VyZW5jaWFAZ3JhZm9zb2Z0LmNvbSIsInNjb3BlIjpbImJpbGlkb3giLCJkaWFuIl0sInB1cmNoYXNlb3JkZXJJZCI6IiIsImNvbXBhbnlJZCI6IjkwMTA4NDMyOCIsIm5iZiI6MTcyNDE2MTE0NywiZXhwIjozMzAwOTQzMTQ3LCJpYXQiOjE3MjQxNjExNDcsImlzcyI6IkJpbGlkb3gifQ.RfP-6D6BZpQdF9d8yPS0nca3mcv6exR63hcioRPJaaE",
  );
  const companyId = "6";
  const companyIdBilidox = "901084328"; // 6
  const apikey = "794340c3-4956-4763-b8ab-145da3510100";
  // const apikey = "4d6356d5-c17c-4539-a679-cc9c27537a27";

  const [productSelected, setProductSelected] = useState<ProductList>();
  const [stateAmounts, setStateAmounts] = useState({});

  // TAX LIST SELECT
  const [multipleListApi, setMultipleListApi] = useState<MultipleAttributes[]>(
    [],
  );
  //  const [cityOptions, setCityOptions] = useState<City[]>([]);
  const [inputProduct, setInputProduct] = useState("");
  const [itemCode, setItemCode] = useState();
  const [ItemQuantity, setItemQuantity] = useState("1");
  const [ItemAmount, setItemAmount] = useState("0");
  const [ItemDiscount, setItemDiscount] = useState("0");
  const [thirdSelected, setThirdSelected] = useState<ListArray[] | never[]>([]);

  const [table, setTable] = useState("0");

  const [valueProduct, setValueProduct] = useState("0");

  const exampleArrayItems = [
    {
      Type: "Devengo",
      code: "Basico", //GetAllPayrollConcepts
      Quantity: 15.0,
      Description: "",
      StartDate: "0001-01-01T00:00:00",
      EndDate: "0001-01-01T00:00:00",
      Amount: 900000.0,
      InhabilityCode: "0", //GetAllInhabilityTypes //Tipo de incapacidad
      IsSalary: false,
    },
    {
      Type: "Devengo",
      code: "Basico",
      Quantity: 15.0,
      Description: "",
      StartDate: "0001-01-01T00:00:00",
      EndDate: "0001-01-01T00:00:00",
      Amount: 900000.0,
      InhabilityCode: "0",
      IsSalary: false,
    },
    {
      Type: "Devengo",
      code: "Transporte",
      Quantity: 15.0,
      Description: "",
      StartDate: "0001-01-01T00:00:00",
      EndDate: "0001-01-01T00:00:00",
      Amount: 81000.0,
      InhabilityCode: "0",
      IsSalary: false,
    },
    {
      Type: "Devengo",
      code: "Transporte",
      Quantity: 15.0,
      Description: "",
      StartDate: "0001-01-01T00:00:00",
      EndDate: "0001-01-01T00:00:00",
      Amount: 81000.0,
      InhabilityCode: "0",
      IsSalary: false,
    },
    {
      Type: "Deduccion",
      code: "Salud",
      Quantity: 1.0,
      Description: "",
      StartDate: "0001-01-01T00:00:00",
      EndDate: "0001-01-01T00:00:00",
      Amount: 36000.0,
      InhabilityCode: "0",
      IsSalary: false,
    },
    {
      Type: "Deduccion",
      code: "Salud",
      Quantity: 1.0,
      Description: "",
      StartDate: "0001-01-01T00:00:00",
      EndDate: "0001-01-01T00:00:00",
      Amount: 36000.0,
      InhabilityCode: "0",
      IsSalary: false,
    },
    {
      Type: "Deduccion",
      code: "FondoPension",
      Quantity: 1.0,
      Description: "",
      StartDate: "0001-01-01T00:00:00",
      EndDate: "0001-01-01T00:00:00",
      Amount: 36000.0,
      InhabilityCode: "0",
      IsSalary: false,
    },
    {
      Type: "Deduccion",
      code: "FondoPension",
      Quantity: 1.0,
      Description: "",
      StartDate: "0001-01-01T00:00:00",
      EndDate: "0001-01-01T00:00:00",
      Amount: 36000.0,
      InhabilityCode: "0",
      IsSalary: false,
    },
  ];

  const exampleArrayItemsPayRoll = [
    {
      id: 22473,
      number: 23091,
      date: "2023-09-28",
      createDate: "2023-09-28 11:25",
      status: "0",
      reference: "",
      observations: "FDSAFDSADF",
      countContacts: 1,
      paymentMethod: {
        id: null,
        name: null,
      },
      document: {
        id: 1,
        code: "",
        name: "Nota",
      },
      contact: {
        id: 1185,
        identification: "1098100891",
        name: " ALEXANDRA  MERCHAN MOGOLLON",
      },
      debitAmount: 52997.73,
      creditAmount: 52997.73,
    },
    {
      id: 1943,
      number: 19021,
      date: "2019-02-28",
      createDate: "2019-07-04 23:30",
      status: "0",
      reference: "",
      observations: "",
      countContacts: 0,
      paymentMethod: {
        id: null,
        name: null,
      },
      document: {
        id: 1,
        code: "",
        name: "Nota",
      },
      contact: {
        id: 0,
        identification: "",
        name: "",
      },
      debitAmount: 1.0,
      creditAmount: 1.0,
    },
    {
      id: 1942,
      number: 19071,
      date: "2019-07-04",
      createDate: "2019-07-04 23:29",
      status: "2",
      reference: "",
      observations: "",
      countContacts: 0,
      paymentMethod: {
        id: null,
        name: null,
      },
      document: {
        id: 1,
        code: "",
        name: "Nota",
      },
      contact: {
        id: 0,
        identification: "",
        name: "",
      },
      debitAmount: 0.0,
      creditAmount: 0.0,
    },
  ];

  const inputsArray: inputsArrayAccouting[] = [
    {
      type: "searchProduct",
      state: productSelected,
      namePropsEvent: "onSelectionChange",
      setState: setProductSelected,
      input: (
        <AutoComplete
          axiosInstance={bilidoxInstance}
          urlRequest="repositories/types/?Name=PayrollConcepts"
          setValueSelected={setItemCode}
          valueSelected={itemCode}
          returnCompeteData={true}
          onSelectionChange={() => {}}
          name="code"
          propsInput={{
            name: "name",
            radius: "none",
            size: "md",
            label: "",
            // name: 'type'
          }}
          initValueInput={productSelected?.code ?? ""}
        />
      ),
    },
    {
      type: "select",
      state: thirdSelected,
      namePropsEvent: "onSelectionChange",
      setState: setThirdSelected,
      input: (
        <AutoComplete
          axiosInstance={axiosInstance}
          urlRequest={`pos-categories?companyId=${companyId}&apikey=${apikey}&type=Mesa`}
          isStaticData={true}
          // autoMatchSelection={{ value: code, keyName: "id" }}
          returnCompeteData={true}
          setValueSelected={setThirdSelected}
          name="mesa"
          valueSelected={thirdSelected}
          propsInput={{
            radius: "none",
            size: "md",
            label: "",
            name: "mesaName",
          }}
          initValueInput={thirdSelected.length > 0 ? thirdSelected[0].name : ""}
          autoSelectedFirstValue={false}
          isDivider="-"
        />
      ),
    },
    {
      type: "input",
      state: ItemQuantity,
      setState: setItemQuantity,
      namePropsEvent: "onValueChange",
      input: (
        <Input
          name="quantity"
          radius="none"
          required
          value={ItemQuantity}
          onValueChange={(e) => {
            if (e.match("^[0-9.]*$") !== null) {
              setItemQuantity(e);
            }
          }}
        />
      ),
    },
    {
      type: "input",
      state: ItemAmount,
      namePropsEvent: "onValueChange",
      setState: setItemAmount,
      input: (
        <Input
          name="accrual"
          radius="none"
          type="number"
          value={ItemAmount}
          onValueChange={(e) => {
            if (e.match("^[0-9.]*$") !== null) {
              setItemAmount(e);
            }
          }}
        />
      ),
    },
    {
      type: "input",
      state: ItemDiscount,
      namePropsEvent: "onValueChange",
      setState: setItemDiscount,
      input: (
        <Input
          name="deduction"
          radius="none"
          type="number"
          value={ItemDiscount}
          onValueChange={(e) => {
            if (e.match("^[0-9.]*$") !== null) {
              setItemDiscount(e);
            }
          }}
        />
      ),
    },
    {
      type: "button",
      namePropsEvent: "onValueChange",
      input: (
        <div className="flex space-around">
          <Button
            variant="light"
            isIconOnly
            color="primary"
            className="mr-5"
            radius="none"
            onPress={() => console.log("ProductSelected", productSelected)}
          >
            <IoIosArrowUp size={20} />
          </Button>
          <Button
            color="success"
            endContent={<IoIosAdd size={23} />}
            size="md"
            radius="none"
            type="submit"
            className="w-full text-white"
            onPress={() => {}}
          />
        </div>
      ),
    },
  ];
  const inputsArrayAccouting: inputsArrayAccouting[] = [
    {
      type: "select",
      state: productSelected,
      namePropsEvent: "onOptionSelect",
      setState: setProductSelected,
      input: (
        /* <AutoComplete
          axiosInstance={axiosAPI}
          urlRequest={`accounts/?companyId=${companyId}&page=0&apikey=${apikey}&name=`}
          isStaticData={false}
          setValueSelected={setItemCode}
          valueSelected={itemCode}
          returnCompeteData={true}
          onSelectionChange={() => {}}
          name="account"
          // placement="top"
          propsInput={{
            name: "name",
            radius: "none",
            size: "md",
            label: "",
            // name: 'type'
          }}
          // initValueInput={productSelected?.code ?? ""}
        /> */
        <Autocomplete
          onOptionSelect={(e) => {
            // setTable(e ?? "0");
            const object = [
              { id: 1, name: "name 1" },
              { id: 2, name: "name 2" },
              { id: 3979, name: "name 3" },
              { id: 4, name: "name 4" },
            ].find((ele) => ele.id.toString() === e);
            setItemCode(object as any);
          }}
          // name="completede"
          options={[
            { id: 1, name: "name 1" },
            { id: 2, name: "name 2" },
            { id: 3979, name: "name 3" },
            { id: 4, name: "name 4" },
          ]}
        />
      ),
    },
    {
      type: "input",
      state: ItemDiscount,
      namePropsEvent: "onValueChange",
      setState: setItemDiscount,
      input: (
        <Input
          name="debit"
          radius="none"
          type="number"
          value={ItemDiscount}
          onValueChange={(e) => {
            if (e.match("^[0-9.]*$") !== null) {
              setItemDiscount(e);
            }
          }}
        />
      ),
    },
    {
      type: "input",
      state: ItemAmount,
      namePropsEvent: "onValueChange",
      setState: setItemAmount,
      input: (
        <Input
          name="credit"
          radius="none"
          type="number"
          value={ItemAmount}
          onValueChange={(e) => {
            if (e.match("^[0-9.]*$") !== null) {
              setItemAmount(e);
            }
          }}
        />
      ),
    },
    {
      type: "select",
      namePropsEvent: "onOptionSelect",
      state: table,
      setState: setTable,
      input: (
        <Autocomplete
          onOptionSelect={(e) => {
            setTable(e ?? "0");
          }}
          // name="completede"
          options={[
            { id: 1, name: "name 1" },
            { id: 2, name: "name 2" },
            { id: 3979, name: "name 3" },
            { id: 4, name: "name 4" },
          ]}
        />
      ),
    },
    {
      type: "input",
      state: ItemQuantity,
      setState: setItemQuantity,
      namePropsEvent: "",
      input: (
        <div>
          <Input
            name="baseValue"
            radius="none"
            type="number"
            required
            value={ItemQuantity}
            onValueChange={(e) => {
              if (e.match("^[0-9.]*$") !== null) {
                setItemQuantity(e);
              }
            }}
          />
        </div>
      ),
    },
    {
      type: "button",
      namePropsEvent: "onValueChange",
      input: (
        <div className="flex space-around">
          <Button
            variant="light"
            isIconOnly
            color="primary"
            className="mr-5"
            radius="none"
            onPress={() => console.log("ProductSelected", productSelected)}
          >
            <IoIosArrowUp size={20} />
          </Button>
          <Button
            color="success"
            endContent={<IoIosAdd size={23} />}
            size="md"
            radius="none"
            type="submit"
            className="w-full text-white"
            onPress={() => {}}
          />
          <Input
            name="secondNameSandbox"
            className=""
            value={`${itemCode?.name ?? ""}`}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    console.log(`${ItemQuantity} ${itemCode?.name ?? ""}`);
    console.log(table);
  }, [ItemQuantity, itemCode, table]);

  const { theme } = useTheme();
  const [warning, setWarning] = useState(false);

  const arrayAmounts = [
    { title: "Devengo", key: "accrual" },
    { title: "Deducción", key: "deduction" },
    { title: "Total", key: "totalAmount" },
  ];
  const arrayAmountsAccouting = [
    { title: "Debito", key: "debit" },
    { title: "Credito", key: "credit" },
    { title: "Total", key: "totalAmount" },
  ];

  const classNames: ClassNamesTable = {
    wrapper: ["rounded-none", "shadow-none", "max-h-[382px]"],
    form: "px-0",
    table: "py-0",
    thead: "[&>tr]:first:rounded-none",
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

  const [itemsEnd, setItemsEnd] = useState<ProductListAccouting[]>([]);
  return (
    <>
      <Head>
        <title>Tabla en Compra</title>
      </Head>
      <div className="mb-36 "></div>
      <h1 className="text-4xl font-semibold w-full text-center">
        Tabla Para Nomina
      </h1>
      {/*       <TableAccounting
        type="paysheet"
        columnsTable={invoiceColumns}
        handleChangeItems={(items) => {
          setItemsEnd(items);
        }}
        showBtnEnd
        handleEndBuy={(items) => {
          console.log(items);
          console.log(stateAmounts);
          setItemsEnd(items);
        }}
        initItems={exampleArrayItems.map((product) =>
          formatAccoutingProduct(product, "paysheet"),
        )}
        arrayAmounts={arrayAmounts}
        propsTable={{
          // content: "bg-black py-4", <- aqui no me gustaria que quedara
          //BaseComponent: "",
          // isHeaderSticky: true,
          classNames: classNames,
        }}
        isResponsive
        inputsArray={inputsArray}
        theme={theme}
        setStateAmounts={setStateAmounts}
      /> */}

      <h1 className="text-4xl font-semibold w-full text-center mt-10">
        Tabla Para Contabilidad (Movimientos)
      </h1>
      <TableAccounting
        type="accounting"
        columnsTable={invoiceColumnsAccouting}
        inputsArray={inputsArrayAccouting}
        handleChangeItems={(items) => {
          console.log(items);
          setItemsEnd(items);
        }}
        showBtnEnd
        handleEndBuy={(items) => {
          console.log(items);
          console.log(stateAmounts);
          setItemsEnd(items);
        }}
        // initItems={exampleArrayItems}
        arrayAmounts={arrayAmountsAccouting}
        /*   initItems={exampleArrayItemsPayRoll.map((product) =>
          formatAccoutingProduct(product, "accounting"),
        )} */
        propsTable={{
          // content: "bg-black py-4", <- aqui no me gustaria que quedara
          //BaseComponent: "",
          classNames: {
            ...classNames,
            form: "w-full items-center justify-center",
          },
        }}
        isResponsive
        theme={theme}
        setStateAmounts={setStateAmounts}
      />

      {/*  <SwitchTheme color="primary" />
      <Link
        href="/tableSell"
        type="button"
        className="bg-zinc-300 rounded-md p-3 hover:bg-zinc-500 cursor-pointer"
      >
        ir a Venta
      </Link>
      <WarningInvoice
        styleAlert={{
          colorBg: "",
          darkColorBg: "",
          icon: <div></div>,
          message: "funciona?",
          textColor: "",
        }}
        autoHidden={true}
        isActiveAlert={warning}
        setIsActiveAlert={setWarning}
        buttonAction={<div>icono</div>}
      />
      <Button
        onPress={() => {
          setWarning(true);
        }}
      >
        presssss
      </Button> */}
    </>
  );
};

export default testPage;
