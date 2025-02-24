import {
  MultipleAttributes,
  ProductList,
} from "../components/interface/productList";
import { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import testApi from "./api/testApi";
import { Divider, Input } from "@nextui-org/react";
import { TaxView } from "../components/layout/TaxView";

const testPage: NextPage = () => {
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
  /* 
  const [productList, setProductList] = useState<ProductList[]>([
    {
      id: 0,
      name: "BOLSA CLIENTE",
      code: "",
      barcode: "",
      wooCode: 0,
      salePrice: 66.0,
      costPrice: 0.0,
      image: null,
      observations: "",
      isInventory: false,
      isAiu: false,
      isFavorite: false,
      isStore: false,
      isActive: true,
      status: "pending",
      Discounts: [
        {
          id: 59,
          name: "Descuento Caja",
          value: 0,
          percentage: 0.0,
          isUnitAmount: true,
          category: "Discount",
        },
      ],
      group: {
        id: 6319,
        name: "IMPUESTO BOLSA",
      },
      Retentions: [
        {
          id: 501,
          name: "Rete IVA",
          value: 0,
          percentage: 0.0,
          isUnitAmount: true,
          category: "Retencion",
        },
      ],
      Taxes: [],
    },
    {
      id: 1,
      name: "LLANTA PRUEBA",
      code: "",
      barcode: "",
      wooCode: 0,
      salePrice: 0.0,
      costPrice: 800000.0,
      image: null,
      observations: "",
      isInventory: true,
      isAiu: false,
      isFavorite: false,
      isStore: false,
      isActive: true,
      status: "pending",
      group: {
        id: 14,
        name: "MERCADO",
      },
      Discounts: [
        {
          id: 59,
          name: "Descuento Caja",
          value: 1000,
          percentage: 0.0,
          isUnitAmount: true,
          category: "Discount",
        },
      ],
      Retentions: [
        {
          id: 501,
          name: "Rete IVA",
          value: 0,
          percentage: 0.0,
          isUnitAmount: true,
          category: "Retencion",
        },
      ],
      Taxes: [
        {
          id: 101,
          name: "IVA 0",
          value: 0,
          percentage: 0.0,
          isUnitAmount: true,
          category: "Impuesto",
        },
        {
          id: 102,
          name: "IVA 5",
          value: 0,
          percentage: 5.0,
          isUnitAmount: false,
          category: "Impuesto",
        },
      ],
    },
  ]); */

  /*   const [productTarget, setProductTarget] = useState<ProductList>({
    id: 1,
    name: "LLANTA PRUEBA",
    code: "",
    barcode: "",
    wooCode: 0,
    salePrice: 160000,
    costPrice: 800000.0,
    image: null,
    observations: "",
    isInventory: true,
    isAiu: false,
    isFavorite: false,
    isStore: false,
    quantity: 5,
    isActive: true,
    status: "pending",
    group: {
      id: 14,
      name: "MERCADO",
    },
    Retentions: [
      {
        id: 501,
        name: "Rete IVA",
        value: 0,
        percentage: 0.0,
        isUnitAmount: true,
        category: "Retencion",
      },
    ],
    discounts: [
      {
        id: 59,
        name: "Descuento Caja",
        value: 0,
        percentage: 0.0,
        isUnitAmount: true,
        category: "Discount",
      },
    ],
    Taxes: [
      {
        id: 101,
        name: "IVA 0",
        value: 0,
        percentage: 0.0,
        isUnitAmount: false,
        category: "Impuesto",
      },
      {
        id: 102,
        name: "IVA 5",
        value: 0,
        percentage: 5.0,
        isUnitAmount: false,
        category: "Impuesto",
      },
    ],
  }); */

  const multipleRetentions: MultipleAttributes[] = [
    {
      id: 501,
      name: "Rete IVA",
      value: 0,
      percentage: 0.0,
      isUnitAmount: true,
      category: "Retencion",
    },
    {
      id: 502,
      name: "Rete ICA",
      value: 0,
      percentage: 0.0,
      isUnitAmount: true,
      category: "Retencion",
    },
    {
      id: 103,
      name: "Rete Fuente",
      value: 0,
      percentage: 0.0,
      isUnitAmount: true,
      category: "Retencion",
    },
  ];

  /*   useEffect(() => {
    const newProductList = productList.map((element) => {
      if (element.id === productTarget.id) {
        return productTarget;
      } else {
        return element;
      }
    });

    setProductList(newProductList);
  }, [productTarget]);
 */
  const [taxesS, setTaxes] = useState<MultipleAttributes[]>([
    {
      id: "104",
      code: "01",
      name: "IVA 19",
      amount: 23.0,
      percentage: 19.0,
      taxableAmount: "121.05",
      perUnitAmount: "0.00",
      concept: "percentage",
    },
    {
      id: "220",
      code: "22",
      name: "BOLSA",
      amount: 10.0,
      percentage: 0.0,
      taxableAmount: "121.05",
      perUnitAmount: "0.00",
      concept: "amount",
    },
  ]);
  const [value, setValue] = useState("");

  return (
    <>
      <Head>
        <title>Componente TAX</title>
      </Head>
      <div className="max-w-full p-5">
        <div className="flex gap-9">
          <Input className="w-50" value={value} onValueChange={setValue} />
          <TaxView
            titleProp="Taxes"
            typeOrder="sell"
            multipleListApi={multipleListApi}
            infoBaseForCalcules={{
              price: 150, //parseFloat(value),
              discount: 5,
              quantity: 1,
              taxes: taxesS,
            }}
            onChangeTaxes={(taxes) => {
              console.log(taxes);
              setTaxes(taxes as never[]);
            }}
          />
        </div>
        <Divider />
        {/* <TaxView
          titleProp="Retentions"
          multipleListApi={multipleRetentions}
          productTarget={productTarget}
          setProductTarget={setProductTarget}
        /> */}
      </div>
    </>
  );
};

export default testPage;
