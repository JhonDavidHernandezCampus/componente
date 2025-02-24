"use client";
import { Children, ReactNode, cloneElement, isValidElement } from "react";

interface InputWrapperProps {
  children: ReactNode;
  type?: "input" | "other";
  nameEvent?: string;
  name: string;
  onChange?: (value: { [key: string]: unknown }) => void;
}

/**
 * @children -> Elemento hijo que envuelve
 * @onChange -> Funcion que notifica la ejecucion del evento del hijo
 * @type -> Tipo de hijo
 * @nameEvent -> Nombre del evento que observa del elemento hijo
 * @name -> nombre de la propiedad en la que se retorna el valor del evento del hijo
 */
export const InputWrapper: React.FC<InputWrapperProps> = ({
  children,
  onChange,
  type = "input",
  nameEvent = "onChange",
  name,
}) => {
  const handleChange = (value: unknown) => {
    if (onChange) {
      onChange({ [name]: value });
    }
  };

  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child) && nameEvent !== "") {
      const { onChange: childOnChange, ...rest } = child.props;
      const newProps: any = { ...rest };
      const childFunction = newProps[nameEvent];

      if (type === "input") {
        newProps.onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const value = event.target?.value || "";
          if (childOnChange) {
            childOnChange(event);
          }
          handleChange(isNaN(parseFloat(value)) ? value : parseFloat(value));
          // handleChange(value);
        };
      }
      if (type === "other") {
        newProps[nameEvent] = (value: unknown) => {
          if (childFunction) {
            childFunction(value);
          }
          const valueReplace = value as string;
          handleChange(isNaN(parseFloat(valueReplace)) ? value : valueReplace);
          // handleChange(value);
        };
      }
      return cloneElement(child, newProps);
    }
    return child;
  });

  return <>{childrenWithProps}</>;
};
