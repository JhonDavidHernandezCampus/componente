"use client";
import React from "react";
import { useEffect, useState } from "react";
import TableAccounting from "../components/TableAccounting/TableBuyComponent";
import { Button, Input } from "@nextui-org/react";

export default function AccountingMovementCreate() {
  const [other, setOther] = useState({});
  const [debit, setDebit] = useState("");
  const [account, setAccount] = useState<any>();
  const [contact, setContact] = useState<any>();
  const [items, setItems] = useState<any>();

  useEffect(() => {
    console.log(contact);
  }, [contact]);

  return (
    <div>
      <TableAccounting
        type="accounting"
        columnsTable={movAccountingColumns}
        handleChangeItems={(items) => {
          console.log(items);
          setItems(items);
        }}
        handleEndBuy={() => {}}
        inputsArray={[
          {
            namePropsEvent: "input",
            type: "select",
            input: <Input size="sm" name="debit" label="Debito" />,
            /* <CompleterAccount
                name="account"
                label="Cuenta"
                defaultValue={account}
                onSelect={(account) => {
                  if (account) setAccount(account);
                }}
              /> */
          },
          {
            namePropsEvent: "",
            type: "input",
            state: contact,
            setState: setContact,
            input: <Input size="sm" name="debit" label="Debito" />,
            /* <CompleterContact
                name="contact"
                label="Tercero"
                onSelect={(contact) => {
                  if (contact) setContact(contact);
                }}
              /> */
          },
          {
            namePropsEvent: "onValueChange",
            type: "input",
            setState: setDebit,
            state: debit,
            input: <Input size="sm" name="debit" label="Debito" />,
          },
          {
            namePropsEvent: "onValueChange",
            type: "input",
            setState: setDebit,
            state: debit,
            input: <Input size="sm" name="credit" label="Credito" />,
          },
          {
            namePropsEvent: "",
            type: "input",
            setState: setDebit,
            state: debit,
            input: (
              <div>
                <Input size="sm" name="description" label="Descripción" />
                <Input
                  className=""
                  name="accountName"
                  value={`${account?.name}`}
                />
                <Input
                  className=""
                  name="contactName"
                  value={`${contact?.identification ?? ""} ${contact?.commercialName ?? ""} ${contact?.firstName ?? ""} ${contact?.middleName ?? ""} ${contact?.firstSurname ?? ""} ${contact?.secondSurname ?? ""}`}
                />
                <Input
                  className=""
                  name="costCenterName"
                  value={`${account?.name}`}
                />
              </div>
            ),
          },
          {
            namePropsEvent: "onSelect",
            type: "select",
            input: <Input size="sm" name="debit" label="Debito" />,
            /*  <CompleterContact
                name="costCenter"
                label="Centro de Costo"
                onSelect={() => {}}
              /> */
          },
          {
            namePropsEvent: "",
            type: "button",
            input: <Button>Accion</Button>,
          },
        ]}
      ></TableAccounting>
    </div>
  );
}

const movAccountingColumns = [
  {
    name: "Cuenta",
    key: "accountName",
    type: "default",
  },
  {
    name: "Tercero",
    key: "contactName",
    type: "default",
  },
  {
    name: "Debito",
    key: "debit",
    type: "default",
  },
  {
    name: "Credito",
    key: "credit",
    type: "default",
  },
  {
    name: "Valor Base",
    key: "base",
    type: "default",
  },
  {
    name: "Descripcion",
    key: "description",
    type: "default",
  },
  {
    name: "Centro Costo",
    key: "costCenter.type",
    type: "default",
  },
  {
    name: "Acciones",
    key: "actions",
    type: "actions",
  },
];
