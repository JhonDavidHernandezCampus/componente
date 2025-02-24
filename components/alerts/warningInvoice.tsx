import { useTheme } from "next-themes";
import {
  type ReactElement,
  type FC,
  type Dispatch,
  type SetStateAction,
  CSSProperties,
  ReactNode,
} from "react";
import { IoClose } from "../icons/icons";

export interface StyleAlert {
  colorBg: string;
  textColor: string;
  darkColorBg: string;
  message: string;
  icon: ReactElement;
}
/**
 * ? Nota: Para qué funcione correctamente debes tener instalada la https://www.tailwindcss-animated.com/ librería
 * * npm install -D tailwindcss-animated
 *
 * @param styleAlert Objeto que contiene las propiedades para la alerta
 * @param setIsDisableBtn Función que cambia de estado la alerta
 * @param autoHidden Si desea que la alerta se oculte automáticamente después de 3 segundos
 * @param styles Estilos CSS aplicados al contenedor del padre
 * @param buttonAction Botón o elemento HTML que podrá utilizar para realizar cualquier acción
 */

interface Props {
  styleAlert: StyleAlert;
  setIsActiveAlert: Dispatch<SetStateAction<boolean>>;
  isActiveAlert: boolean;
  autoHidden?: boolean;
  styles?: CSSProperties;
  buttonAction?: ReactNode;
}

export const WarningInvoice: FC<Props> = ({
  styleAlert,
  setIsActiveAlert,
  isActiveAlert,
  autoHidden,
  styles,
}) => {
  // const isDark = localStorage.theme === "dark";
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const closeWarning = () => {
    setIsActiveAlert(false);
  };

  setTimeout(() => {
    if (autoHidden) {
      setIsActiveAlert(false);
    }
  }, 3000);

  return (
    <>
      {isActiveAlert && (
        <div
          className={`absolute w-full z-40 pr-12 pl-12 py-1 animate-fade-down`}
          role="alert"
          style={
            styles
              ? styles
              : {
                  paddingLeft: "48px",
                  paddingRight: "48px",
                  maxWidth: "100%",
                }
          }
        >
          <div className="animate-slidein w-full opacity-90">
            <div
              className="flex items-center justify-between w-full h-8 p-6 px-10 rounded-[4px]"
              style={{
                backgroundColor: isDark
                  ? styleAlert.darkColorBg
                  : styleAlert.colorBg,
                color: styleAlert.textColor,
              }}
            >
              <div className="flex items-center">
                {styleAlert.icon}
                <p className="text-sm w-full text-center">
                  {styleAlert.message}
                </p>
              </div>
              <div className="flex items-center">
                <button onClick={closeWarning}>
                  <IoClose size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
