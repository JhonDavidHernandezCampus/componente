"use client";
import { Input, InputProps } from "@nextui-org/react";
import { useState, useEffect, useRef } from "react";
import { TbChevronDown } from "../icons/icons";

/* SelectCustom Component */

/**
 * Interfaz para representar un elemento del select personalizado.
 */
export interface CustomSelectOption {
  id: number | string;
  name: string;
}

/**
 * Propiedades del componente SelectCustom.
 */
interface CustomSelectProps<T extends CustomSelectOption> {
  /**
   * Array de elementos a mostrar en el select.
   */
  items?: T[];

  /**
   * Valor seleccionado por defecto.
   */
  defaultSelectedValue?: number | string;

  /**
   * Estado del CustomSelect
   */
  disabled?: boolean;

  /**
   * Establecer estilos de error para el select
   */
  isInvalid?: boolean;

  /**
   * Mensaje de error para el Label
   */
  errorMessage?: string;

  /**
   * Función a ejecutar cuando se selecciona un elemento.
   */
  onSelect?: (element: T) => void;

  /**
   * Etiqueta para el input del select.
   */
  label?: string;

  /**
   * Clases adicionales para estilizar el componente.
   */
  styleProps?: {
    mainWrapper?: string;
    popover?: string;
    items?: string;
    input?: Partial<Pick<InputProps, "size" | "radius">>;
  };
}

/**
 * Componente SelectCustom para mostrar un select personalizado.
 *
 * @param disabled - Estado de CustomSelect
 * @param items - Array de elementos a mostrar en el select.
 * @param defaultSelectedValue - Valor seleccionado por defecto.
 * @param isInvalid - Estilos de error para el input.
 * @param errorMessage - Mensaje de error para el label.
 * @param onSelect - Función a ejecutar cuando se selecciona un elemento.
 * @param label - Etiqueta para el input del select.
 * @param styleProps - Clases adicionales para estilizar el componente.
 */

export const SelectCustom = <T extends CustomSelectOption>({
  disabled = false,
  items,
  isInvalid,
  errorMessage,
  onSelect,
  defaultSelectedValue,
  label,
  styleProps,
}: CustomSelectProps<T>) => {
  /* Inicializacion de variables */
  const [open, setOpen] = useState(false);
  const [valueSelected, setValueSelected] = useState<T>();
  const containerRef = useRef<HTMLDivElement>(null);

  /* Cambiar estado del Select */
  const onToggle = () => setOpen(!open);

  /* Manejador de seleccion del valor */
  const handleSelectValue = (element: T) => {
    setValueSelected(element);
    onToggle();
    if (onSelect) onSelect(element);
  };

  /* Manejador de clicks fuera del select */
  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    )
      setOpen(false);
  };

  /* Agregar efectos al montar componente */
  useEffect(() => {
    const selectedItem = items?.find(
      (item) => item.id === defaultSelectedValue,
    );
    if (selectedItem && selectedItem !== valueSelected) {
      setValueSelected(selectedItem);
      if (onSelect) {
        onSelect(selectedItem);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [defaultSelectedValue, items, onSelect, valueSelected]);

  return (
    /* Main wrapper */
    <div
      ref={containerRef}
      className={`relative cursor-pointer ${styleProps?.mainWrapper ?? "w-full"}`}
      onClick={!disabled ? onToggle : () => {}}
    >
      {/* Input para visualizar valor seleccionado */}
      <Input
        readOnly
        {...styleProps?.input}
        value={valueSelected?.name || ""}
        label={label}
        labelPlacement="inside"
        description={label}
        name="paciente"
        errorMessage={errorMessage}
        isInvalid={isInvalid}
        classNames={{
          label: "truncate",
          input: "cursor-pointer mr-5",
          inputWrapper: "!cursor-pointer",
          innerWrapper: "items-center",
        }}
        endContent={
          <span
            className={`absolute inset-y-0 right-3 flex items-center transition-transform duration-300 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          >
            <TbChevronDown />
          </span>
        }
      />
      {/* Popover */}
      {open && items && (
        <div
          className={`absolute top-[65%] z-20 w-full rounded-lg p-2 max-h-[8.5rem] overflow-y-scroll scrollbar-hide shadow-md mt-2 border-[1px] bg-white dark:bg-zinc-800 border-[#f6f6f6] dark:border-zinc-700 dark:font-light ${styleProps?.popover ?? ""}`}
        >
          <div className="flex flex-col w-full h-full gap-1 divide-y-1">
            {/* Opciones Select */}
            {items.map((option: T) => (
              <button
                key={option.id + option.name}
                onClick={() => handleSelectValue(option)}
                className={`py-1 px-2 z-20 bg-transparent hover:bg-[#D4D4D8] dark:hover:bg-zinc-500 text-start truncate text-sm ${styleProps?.items ?? ""}`}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
