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

import { WarningInvoice } from "../components/alerts/warningInvoice";
import {
  AutoComplete,
  ListArray,
} from "../components/autocomplete/AutoComplete";
import { Button, Input } from "@nextui-org/react";
import { TaxView } from "../components/layout/TaxView";
import TableBuyComponent, {
  InputsArray,
} from "../components/TableBuys/TableBuyComponent";

import { SwitchTheme } from "../components/theme/SwichTheme";
import awsApi from "../types/awsApi";
interface City {
  id: number;
  code: string;
  name: string;
}

import axios from "axios";
import { useTheme } from "next-themes";
import Link from "next/link";
import { IoIosAdd, IoIosArrowUp } from "../components/icons/icons";
import {
  formatNumToStr,
  formatNumCompact,
} from "../components/utils/formatNumber";

const testPage: NextPage = () => {
  interface ColumnsTable {
    name: string;
    key: string;
    type: string;
    width?: number | undefined;
    aling?: "start" | "center" | "end";
  }

  const invoiceColumns: ColumnsTable[] = [
    {
      name: "PRODUCTO",
      key: "nameProduct",
      type: "default",
    },
    {
      name: "CATALOGO",
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
      key: "baseWithTax",
      type: "default",
    },
    {
      name: "SUBTOTAL",
      key: "subTotalAmount",
      type: "default",
    },
    {
      name: "ACCIONES",
      key: "actions",
      type: "actions",
    },
  ];

  const bilidoxInstance = awsApi(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MTUyMTc0NSIsImVtYWlsIjoiZ2VyZW5jaWFAZ3JhZm9zb2Z0LmNvbSIsInNjb3BlIjpbImJpbGlkb3giLCJkaWFuIl0sInB1cmNoYXNlb3JkZXJJZCI6IiIsImNvbXBhbnlJZCI6IjkwMTA4NDMyOCIsIm5iZiI6MTcyNDE2MTE0NywiZXhwIjozMzAwOTQzMTQ3LCJpYXQiOjE3MjQxNjExNDcsImlzcyI6IkJpbGlkb3gifQ.RfP-6D6BZpQdF9d8yPS0nca3mcv6exR63hcioRPJaaE",
  );
  const axiosInstance = testApi();

  const companyId = "6";
  const apikey = "4d6356d5-c17c-4539-a679-cc9c27537a27";

  const handlePay = () => {
    console.log("hacemos accion de generar venta");
  };

  const [acountProduct, setAcountProduct] = useState("1");
  const [subTotal, setSubTotal] = useState("0");
  const [valorIva, setValorIva] = useState("0");
  const [valueProduct, setValueProduct] = useState("0");
  const [productSelected, setProductSelected] = useState<ProductList>();
  const [stateAmounts, setStateAmounts] = useState({});

  const [Discount, setDiscount] = useState("0");

  // TAX LIST SELECT
  const [multipleListApi, setMultipleListApi] = useState<MultipleAttributes[]>(
    [],
  );
  const [cityOptions, setCityOptions] = useState<City[]>([]);
  const [patientActuality, setPatientActuality] = useState({ id: 0 });
  const [tableSelected, setTableSelected] = useState<never[] | ListArray[]>([]);

  useEffect(() => {
    const petiApi = async () => {
      const { data } = await bilidoxInstance.get(
        "repositories/types/?Name=TaxesTypes",
      );
      setMultipleListApi(data);
      console.log(data);
      setCityOptions(data);
    };
    petiApi();
  }, []);

  const axiosAPI = axios.create({
    baseURL: "https://lab.globho.com/api/v1",
  });

  const inputsArray: InputsArray[] = [
    {
      name: "another",
      namePropsEvent: "setProductSelected",
      type: "searchProduct",
      state: productSelected,
      setState: setProductSelected,
      input: (
        <SearchSelectedProduct
          styles={{
            maxHeight: "350px",
            minWidth: "350px",
            overflow: "auto",
          }}
          nameInput="nameProduct"
          functionApi={axiosInstance}
          urlItems={`items/?companyId=${companyId}&apikey=${apikey}&page=0&isStore=false&isFavorite=true&contactId=6&name=`}
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
        />
      ),
    },
    {
      name: "another",
      namePropsEvent: "onSelectionChange",
      type: "select",
      state: tableSelected,
      setState: setTableSelected,
      input: (
        <AutoComplete
          axiosInstance={axiosInstance}
          setValueSelected={setTableSelected}
          urlRequest={`pos-categories?companyId=${companyId}&apikey=${apikey}&type=Mesa`}
          isStaticData={true}
          /* autoSelectedFirstValue={!!tableSelected[0]}*/
          initValueInput={tableSelected[0] ? tableSelected[0].name : ""}
          propsInput={{
            label: "Mesa",
            placeholder: "Mesa",
            name: "nameTable",
          }}
          propsContainer={{ width: "400px" }}
          onSelectionChange={(element) => {}}
          name="table"
          placement="bottom"
        />
        /* <SearchSelectedProduct
          styles={{
            maxHeight: "350px",
            minWidth: "350px",
            overflow: "auto",
          }}
          nameInput="name"
          functionApi={axiosInstance}
          urlItems={`items/?companyId=${companyId}&apikey=${apikey}&page=0&isStore=false&isFavorite=true&contactId=6&name=`}
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
      ),
    },
    {
      name: "quantity",
      type: "input",
      namePropsEvent: "onValueChange",
      state: acountProduct,
      setState: setAcountProduct,
      input: (
        <Input
          size="sm"
          name="quantity"
          required
          type="number"
          value={acountProduct}
          onValueChange={(e) => {
            if (e.match("^[0-9.,]*$") !== null) {
              setAcountProduct(e.replace(",", "."));
            }
          }}
          label="Cantidad"
        />
      ),
    },
    {
      name: "price",
      type: "input",
      namePropsEvent: "onValueChange",
      state: valueProduct,
      setState: setValueProduct,
      input: (
        <Input
          size="sm"
          name="price"
          required
          value={valueProduct}
          onValueChange={(e) => {
            if (e.match("^[0-9]*$") !== null) {
              setValueProduct(e);
            }
          }}
          label="Valor"
        />
      ),
    },
    {
      name: "another",
      type: "input",
      namePropsEvent: "onValueChange",
      state: Discount,
      setState: setDiscount,
      input: (
        <Input
          size="sm"
          name="discount"
          required
          type="number"
          value={Discount}
          onValueChange={(e) => {
            if (e.match("^[0-9.,]*$") !== null) {
              console.log(Discount);
              setDiscount(e.replace(",", "."));
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
          titleProp="taxes"
          multipleListApi={multipleListApi}
          productTarget={productSelected}
          typeOrder="sell"
          styles={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
          }}
        />
      ),
    },
    {
      name: "another",
      type: "input",
      namePropsEvent: "onValueChange",
      state: subTotal,
      setState: setSubTotal,
      input: (
        <Input
          size="sm"
          name="baseWithTax"
          readOnly
          required
          value={subTotal}
          onValueChange={(e) => {
            if (e.match("^[0-9]*$") !== null) {
              setValueProduct(e);
            }
          }}
          label="Valor + Impto"
        />
      ),
    },
    {
      name: "another",
      type: "input",
      namePropsEvent: "onValueChange",
      state: valorIva,
      setState: setValorIva,
      input: (
        <Input
          size="sm"
          name="subTotalAmount"
          readOnly
          required
          value={valorIva}
          onValueChange={(e) => {
            if (e.match("^[0-9.]*$") !== null) {
              setValorIva(e);
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
        <div className="flex gap-1 justify-center">
          <Button
            color="danger"
            // endContent={<s size={23} />}
            size="md"
            isIconOnly
            className="text-white"
            onPress={() => {
              console.log(productSelected);
              console.log(tableSelected);
              // setProductSelected(
              //   (prev) => ({ ...prev, andres: "funciono" }) as any,
              // );
            }}
          />
          <Button
            color="success"
            endContent={<IoIosAdd size={23} />}
            size="md"
            className="text-white"
            type="submit"
            // onPress={}
          />
        </div>
      ),
    },
  ];
  const { theme } = useTheme();
  const [warning, setWarning] = useState(false);

  const arrayAmounts = [
    { title: "SubTotal", key: "valueAmount" },
    { title: "Descuentos", key: "discountAmount" },
    { title: "Impuestos", key: "taxAmount" },
    { title: "Impuestosagfsdf", key: "taxAmount", isVisible: false },
    { title: "Total", key: "subTotalAmount" },
  ];

  const classNames = {
    wrapper: ["rounded-none", "shadow-none", "max-h-[382px]"],
    base: ["gap-0"],
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

  const numero = 1200000.12;

  const [itemsEnd, setItemsEnd] = useState<ProductList[]>([]);
  return (
    <>
      <Head>
        <title>Tabla en Compra</title>
      </Head>
      <div className="mb-36 "></div>
      <TableBuyComponent
        columnsTable={invoiceColumns}
        handleChangeItems={(items) => {
          setItemsEnd(items);
        }}
        handleEndBuy={(items) => {
          console.log(items);
          console.log(multipleListApi);
          console.log(stateAmounts);
          setItemsEnd(items);
        }}
        initItems={[]}
        arrayAmounts={arrayAmounts}
        propsTable={{
          // content: "bg-black py-4", <- aqui no me gustaria que quedara

          classNames: {
            form: "",
            base: "px-10 pb-5  gap-0 mt-2",
            wrapper: "rounded-b-none shadow-none",
            th: `bg-[#D3D5E8] text-black opacity-70`,
            // tbody: 'h-[56px]'
          },
        }}
        isResponsive
        typeOrder="buy"
        titleBtn={
          <div className="flex">
            Finalizar <IoIosArrowUp className="text-danger" />
          </div>
        }
        inputsArray={inputsArray}
        theme={theme}
        typeShowAmounts="bills"
        // isResponsive={true}
        setStateAmounts={setStateAmounts}
      />
      <SwitchTheme color="primary" />
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
      </Button>
    </>
  );
};

export default testPage;
