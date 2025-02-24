import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import testApi from "./api/testApi";
import { useEffect, useState } from "react";
import {
  MultipleAttributes,
  ProductList,
} from "../components/interface/productList";
import SearchSelectedProduct from "../components/searchProducts/SearchSelectedProduct";
import { Button, Input } from "@nextui-org/react";
import { TaxView } from "../components/layout/TaxView";
import awsApi from "../types/awsApi";
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

import { Autocomplete } from "../components/JComponentes/Autocomplete";
import {
  AutoComplete,
  ListArray,
} from "../components/autocomplete/AutoComplete";
import { SelectCustom } from "../components/JComponentes/CustomSelect";
import axios from "axios";
import { useTheme } from "next-themes";
import Link from "next/link";
import { IoIosAdd } from "../components/icons/icons";

const testPage: NextPage = () => {
  const invoiceColumns: ColumnsTable[] = [
    {
      name: "ITEM",
      key: "nameTable",
      type: "default",
    },
    {
      name: "CANTIDAD",
      key: "quantity",
      type: "default",
    },
    {
      name: "VALOR",
      key: "unitValue",
      type: "default",
    },
    {
      name: "DESCUENTO",
      key: "discount",
      type: "default",
    },
    {
      name: "IMPUESTO",
      key: "taxes",
      type: "taxView",
    },
    {
      name: "VALOR VENTA",
      key: "price",
      type: "default",
    },
    {
      name: "TOTAL",
      key: "subTotalAmount",
      type: "default",
    },
    {
      name: "ACCIONES",
      key: "actions",
      type: "actions",
    },
  ];

  const axiosInstance = testApi();
  //const companyIdBilidox = "901084328"; // 6
  // const apikey = "4d6356d5-c17c-4539-a679-cc9c27537a27";

  const companyId = "6";
  const apikey = "4d6356d5-c17c-4539-a679-cc9c27537a27";

  const handlePay = () => {
    console.log("hacemos accion de generar venta");
  };

  const [productSelected, setProductSelected] = useState<ProductList>();
  const [stateAmounts, setStateAmounts] = useState({});

  const [ItemQuantity, setItemQuantity] = useState("1");
  const [ItemDiscount, setItemDiscount] = useState("0");
  const [ItemAmount, setItemAmount] = useState("0");
  const [ItemSubTotal, setItemSubTotal] = useState("");
  const [ItemUnitValue, setItemUnitValue] = useState("0");

  // TAX LIST SELECT
  const [multipleListApi, setMultipleListApi] = useState<MultipleAttributes[]>(
    [],
  );
  const [token, setToken] = useState("");

  setTimeout(() => {
    setToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MTUyMTc0NSIsImVtYWlsIjoiZ2VyZW5jaWFAZ3JhZm9zb2Z0LmNvbSIsInNjb3BlIjpbImJpbGlkb3giLCJkaWFuIl0sInB1cmNoYXNlb3JkZXJJZCI6IiIsImNvbXBhbnlJZCI6IjkwMTA4NDMyOCIsIm5iZiI6MTcyNDE2MTE0NywiZXhwIjozMzAwOTQzMTQ3LCJpYXQiOjE3MjQxNjExNDcsImlzcyI6IkJpbGlkb3gifQ.RfP-6D6BZpQdF9d8yPS0nca3mcv6exR63hcioRPJaaE",
    );
  }, 6000);

  const bilidoxInstance = awsApi(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MTUyMTc0NSIsImVtYWlsIjoiZ2VyZW5jaWFAZ3JhZm9zb2Z0LmNvbSIsInNjb3BlIjpbImJpbGlkb3giLCJkaWFuIl0sInB1cmNoYXNlb3JkZXJJZCI6IiIsImNvbXBhbnlJZCI6IjkwMTA4NDMyOCIsIm5iZiI6MTcyNDE2MTE0NywiZXhwIjozMzAwOTQzMTQ3LCJpYXQiOjE3MjQxNjExNDcsImlzcyI6IkJpbGlkb3gifQ.RfP-6D6BZpQdF9d8yPS0nca3mcv6exR63hcioRPJaaE",
  );

  useEffect(() => {
    const petiApi = async () => {
      const { data } = await bilidoxInstance.get(
        "/repositories/types/?Name=TaxesTypes",
      );
      setMultipleListApi(data);
    };
    petiApi();
  }, [testApi]);

  const axiosAPI = axios.create({
    baseURL: "https://lab.globho.com/api/v1",
  });

  const [thirdSelected, setThirdSelected] = useState<ListArray[] | never[]>([]);
  const inputsArray: InputsArray[] = [
    {
      name: "another",
      type: "searchProduct",
      state: productSelected,
      namePropsEvent: "onSelectionChange",
      setState: setProductSelected,
      input: (
        /*  <SearchSelectedProduct
          styles={{
            maxHeight: "350px",
            minWidth: "350px",
            overflow: "auto",
          }}
          nameInput="name"
          functionApi={axiosAPI}
          //urlItems={`items/?companyId=${companyId}&apikey=${apikey}&page=0&isStore=false&isFavorite=true&contactId=6&name=`}
          urlItems={`items/?apikey=794340c3-4956-4763-b8ab-145da3510100&companyId=1&page=0&name=`}
          productSelected={productSelected}
          setProductSelected={setProductSelected}
          namesPropetiesShow={{
            mainName: "name",
            priceName: "salePrice",
            secondaryName: "group.name",
          }}
          propsInput={{ size: "sm", label: "Producto" }}
          lengthText={{ mainName: 25, secondaryName: 27 }}
          selectedEmpyProduct={true}
        /> */
        /* <div>
          <Input
            value={thirdSelected[0]?.name}
            name="nameTable"
            className="hidden"
          />
          <Input
            value={thirdSelected[0]?.id.toString()}
            name="idTable"
            className="hidden"
          /> */
        <AutoComplete
          axiosInstance={axiosInstance}
          urlRequest={`pos-categories?companyId=${companyId}&apikey=${apikey}&type=Mesa`}
          isStaticData={true}
          returnCompeteData={false}
          setValueSelected={setThirdSelected}
          onSelectionChange={() => {}}
          name="dataTable"
          valueSelected={thirdSelected}
          propsInput={{
            label: "Mesa",
            placeholder: "Mesa",
            name: "nameTable",
          }}
          initValueInput={thirdSelected.length > 0 ? thirdSelected[0].name : ""}
          autoSelectedFirstValue={false}
          isDivider="-"
        />
        /*   </div> */
      ),
    },
    {
      name: "quantity",
      type: "input",
      state: ItemQuantity,
      namePropsEvent: "onValueChange",
      setState: setItemQuantity,
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
      name: "unitValue",
      type: "input",
      state: ItemUnitValue,
      namePropsEvent: "onValueChange",
      setState: setItemUnitValue,
      input: (
        <Input
          size="sm"
          name="unitValue"
          radius="none"
          readOnly
          required
          value={ItemUnitValue}
          onValueChange={(e) => {
            if (e.match("^[0-9]*$") !== null) {
              setItemUnitValue(e);
            }
          }}
          label="Valor"
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
          name="discount"
          radius="none"
          type="number"
          value={ItemDiscount}
          onValueChange={(e) => {
            if (e.match("^[0-9.]*$") !== null) {
              setItemDiscount(e);
            }
          }}
          label="Descuento"
        />
      ),
    },
    {
      name: "another",
      type: "taxView",
      namePropsEvent: "onValueChange",
      input: (
        <TaxView
          typeOrder={"sell"}
          titleProp="taxes"
          multipleListApi={multipleListApi}
        />
      ),
    },
    {
      name: "price",
      type: "input",
      namePropsEvent: "onValueChange",
      state: ItemAmount,
      setState: setItemAmount,
      input: (
        <Input
          size="sm"
          name="price"
          radius="none"
          required
          value={ItemAmount}
          onValueChange={(e) => {
            if (e.match("^[0-9]*$") !== null) {
              setItemAmount(e);
            }
          }}
          label="Valor Venta"
        />
      ),
    },
    {
      name: "subTotal",
      type: "input",
      namePropsEvent: "onValueChange",
      state: ItemSubTotal,
      setState: setItemSubTotal,
      input: (
        <Input
          size="sm"
          name="subTotalAmount"
          radius="none"
          readOnly
          required
          value={ItemSubTotal}
          onValueChange={(e) => {
            if (e.match("^[0-9]*$") !== null) {
              setItemSubTotal(e);
            }
          }}
          label="Total"
        />
      ),
    },
    {
      name: "another",
      type: "button",
      namePropsEvent: "onValueChange",
      input: (
        <Button
          color="success"
          endContent={<IoIosAdd size={23} />}
          size="md"
          radius="none"
          type="submit"
          className="w-full text-white"
          onPress={() => {
            // console.log(productSelected)
          }}
        />
      ),
    },
  ];
  const { theme } = useTheme();

  const arrayAmounts = [
    { title: "SubTotal", key: "valueAmount" },
    { title: "Descuentos", key: "discountAmount" },
    { title: "Impuestos", key: "taxAmount" },
    { title: "none", key: "SubTotalAmount", isVisible: false },
    { title: "Total", key: "subTotalAmount" },
  ];

  const [code, setCode] = useState("");
  useEffect(() => {
    console.log(thirdSelected);
    console.log(code);
  }, [thirdSelected]);

  return (
    <>
      <Head>
        <title>Tabla en Venta</title>
      </Head>
      <TableBuyComponent
        columnsTable={invoiceColumns}
        handleEndBuy={(items) => {
          console.log(items);
          console.log(stateAmounts);
        }}
        arrayAmounts={arrayAmounts}
        propsTable={{
          classNames: {
            base: "px-10 pb-5  gap-0 mt-2 dark:bg-black ",
            wrapper: "rounded-b-none shadow-none",
            th: "bg-[#D3D5E8] text-black opacity-70",
          },
        }}
        typeOrder="sell"
        inputsArray={inputsArray}
        theme={theme}
        typeShowAmounts="normal"
        isResponsive={true}
        setStateAmounts={setStateAmounts}
      />
      <SwitchTheme color="primary" />
      <Link
        href="/tableBuy"
        type="button"
        className="bg-zinc-300 rounded-md p-3 hover:bg-zinc-500 cursor-pointer"
      >
        ir a compra
      </Link>
      <AutoComplete
        axiosInstance={axiosInstance}
        urlRequest={`pos-categories?companyId=${companyId}&apikey=${apikey}&type=Mesa`}
        isStaticData={true}
        autoMatchSelection={{ value: code, keyName: "id" }}
        returnCompeteData={true}
        setValueSelected={setThirdSelected}
        valueSelected={thirdSelected}
        propsInput={{
          label: "Mesa",
          placeholder: "Mesa",
          name: "nameTable",
        }}
        initValueInput={thirdSelected.length > 0 ? thirdSelected[0].name : ""}
        autoSelectedFirstValue={false}
        isDivider="-"
      />
      <Button
        onPress={() => {
          setCode((prev) => "4" + prev);
        }}
      >
        Cambiar Valor
      </Button>
      <Button
        onPress={() => {
          setCode((prev) => "4");
        }}
      >
        clear Value
      </Button>
      <Button
        onPress={() => {
          setThirdSelected([{ id: 14677, name: "Camilo Ostia" }]);
        }}
      >
        Cambiar Mesa Valor Global
      </Button>
    </>
  );
};

export default testPage;
