import React from "react";
import { JSX } from "react/jsx-runtime";

interface CloseProps extends React.SVGProps<SVGSVGElement> {
  size?: number; // Añadimos la propiedad 'size' como opcional
}

const IoClose = ({ size = 24, ...props }: CloseProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.8"
      className="icon"
      stroke="currentColor"
      width={size} // Aplicamos el tamaño al ancho
      height={size} // Aplicamos el tamaño a la altura
      {...props} // Pasamos las demás props, como className, style, etc.
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
};

const IoIosArrowDown = ({ size = 24, ...props }: CloseProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.8"
      className="icon"
      stroke="currentColor"
      width={size} // Aplicamos el tamaño al ancho
      height={size} // Aplicamos el tamaño a la altura
      {...props} // Pasamos las demás props, como className, style, etc.
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};

const TbChevronDown = ({ size = 24, ...props }: CloseProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.8"
      className="icon"
      stroke="currentColor"
      width={size} // Aplicamos el tamaño al ancho
      height={size} // Aplicamos el tamaño a la altura
      {...props} // Pasamos las demás props, como className, style, etc.
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};

// IoIosArrowUp
const IoIosArrowUp = ({ size = 24, ...props }: CloseProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.8"
    className="icon"
    stroke="currentColor"
    width={size} // Aplicamos el tamaño al ancho
    height={size} // Aplicamos el tamaño a la altura
    {...props} // Pasamos las demás props, como className, style, etc.
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 15.75 7.5-7.5 7.5 7.5"
    />
  </svg>
);

// IoCheckmarkOutline
const IoCheckmarkOutline = ({ size = 24, ...props }: CloseProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.8"
    className="icon"
    stroke="currentColor"
    width={size} // Aplicamos el tamaño al ancho
    height={size} // Aplicamos el tamaño a la altura
    {...props} // Pasamos las demás props, como className, style, etc.
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 12.75 6 6 9-13.5"
    />
  </svg>
);

// TbShoppingCart
const TbShoppingCart = ({ size = 24, ...props }: CloseProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.8"
    className="icon"
    stroke="currentColor"
    width={size} // Aplicamos el tamaño al ancho
    height={size} // Aplicamos el tamaño a la altura
    {...props} // Pasamos las demás props, como className, style, etc.
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    />
  </svg>
);
// TbSunHigh
export const TbSunHigh = ({ size = 24, ...props }: CloseProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.8"
    className="icon"
    stroke="currentColor"
    width={size} // Aplicamos el tamaño al ancho
    height={size} // Aplicamos el tamaño a la altura
    {...props} // Pasamos las demás props, como className, style, etc.
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
    />
  </svg>
);

// TbMoonFilled
export const TbMoonFilled = ({ size = 24, ...props }: CloseProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    strokeWidth="1.8"
    className="icon"
    width={size} // Aplicamos el tamaño al ancho
    height={size} // Aplicamos el tamaño a la altura
    {...props} // Pasamos las demás props, como className, style, etc.
  >
    <path
      fillRule="evenodd"
      d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
      clipRule="evenodd"
    />
  </svg>
);

// IoCheckmarkDoneOutline
const IoCheckmarkDoneOutline = ({ size = 24, ...props }: CloseProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.8"
    className="icon"
    stroke="currentColor"
    width={size} // Aplicamos el tamaño al ancho
    height={size} // Aplicamos el tamaño a la altura
    {...props} // Pasamos las demás props, como className, style, etc.
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 12.75 6 6 9-13.5"
    />
  </svg>
);

// RiShoppingBag3Line
const RiShoppingBag3Line = ({ size = 24, ...props }: CloseProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.8"
    className="icon"
    stroke="currentColor"
    width={size} // Aplicamos el tamaño al ancho
    height={size} // Aplicamos el tamaño a la altura
    {...props} // Pasamos las demás props, como className, style, etc.
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
    />
  </svg>
);

// MdDelete
const MdDelete = ({ size = 24, ...props }: CloseProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    strokeWidth="1.8"
    className="icon"
    width={size} // Aplicamos el tamaño al ancho
    height={size} // Aplicamos el tamaño a la altura
    {...props} // Pasamos las demás props, como className, style, etc.
  >
    <path
      fillRule="evenodd"
      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
      clipRule="evenodd"
    />
  </svg>
);

// TbEdit
const TbEdit = ({ size = 24, ...props }: CloseProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    strokeWidth="1.8"
    className="icon"
    width={size} // Aplicamos el tamaño al ancho
    height={size} // Aplicamos el tamaño a la altura
    {...props} // Pasamos las demás props, como className, style, etc.
  >
    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
  </svg>
);

// IoIosArrowBack
const IoIosArrowBack = ({ size = 24, ...props }: CloseProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    strokeWidth="1.8"
    className="icon"
    width={size} // Aplicamos el tamaño al ancho
    height={size} // Aplicamos el tamaño a la altura
    {...props} // Pasamos las demás props, como className, style, etc.
  >
    <path
      fillRule="evenodd"
      d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
      clipRule="evenodd"
    />
  </svg>
);

// RiAddFill
const RiAddFill = ({ size = 24, ...props }: CloseProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    strokeWidth="1.8"
    className="icon"
    width={size} // Aplicamos el tamaño al ancho
    height={size} // Aplicamos el tamaño a la altura
    {...props} // Pasamos las demás props, como className, style, etc.
  >
    <path
      fillRule="evenodd"
      d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
      clipRule="evenodd"
    />
  </svg>
);

// AiOutlineSearch
const AiOutlineSearch = ({ size = 24, ...props }: CloseProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="1.8"
    className="icon"
    stroke="currentColor"
    width={size} // Aplicamos el tamaño al ancho
    height={size} // Aplicamos el tamaño a la altura
    {...props} // Pasamos las demás props, como className, style, etc.
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 15.75a6.75 6.75 0 1 0-1.5 1.5h0m3 0 3.75 3.75M15 9.75h0m-4.5 0h0m-3.75 0h0m1.5-4.5h6m1.5 0h0M18.75 7.5h0m-1.5-3h0M7.5 15.75h0"
    />
  </svg>
);

// RiErrorWarningFill
const RiErrorWarningFill = ({ size = 24, ...props }: CloseProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8} // Puedes ajustar este valor si quieres una línea más gruesa
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon"
    width={size} // Aplicamos el tamaño al ancho
    height={size} // Aplicamos el tamaño a la altura
    {...props}
  >
    <path d="M12 2.25L1.5 20.25h21L12 2.25z" />
    <path d="M12 8.25v5.25M12 16.5h.007" />
  </svg>
);

// AiOutlineClose
const AiOutlineClose = ({ size = 24, ...props }: CloseProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="1.8"
    className="icon"
    stroke="currentColor"
    width={size} // Aplicamos el tamaño al ancho
    height={size} // Aplicamos el tamaño a la altura
    {...props} // Pasamos las demás props, como className, style, etc.
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// FiAlertTriangle
const FiAlertTriangle = ({ size = 24, ...props }: CloseProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    strokeWidth="1.8"
    className="icon"
    width={size} // Aplicamos el tamaño al ancho
    height={size} // Aplicamos el tamaño a la altura
    {...props} // Pasamos las demás props, como className, style, etc.
  >
    <path d="M12 2.25l9 16.5H3z" />
    <path d="M12 9v3m0 3h0" />
  </svg>
);

// BiCheckCircle
const BiCheckCircle = ({ size = 24, ...props }: CloseProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    strokeWidth="1.8"
    className="icon"
    width={size} // Aplicamos el tamaño al ancho
    height={size} // Aplicamos el tamaño a la altura
    {...props} // Pasamos las demás props, como className, style, etc.
  >
    <path
      fillRule="evenodd"
      d="M12 2.25a9.75 9.75 0 1 0 0 19.5 9.75 9.75 0 0 0 0-19.5zm-1.25 12.74L8.29 12.29a.75.75 0 0 1 1.06-1.06l2.47 2.47 5.47-5.47a.75.75 0 0 1 1.06 1.06l-6.75 6.75a.75.75 0 0 1-1.06 0z"
      clipRule="evenodd"
    />
  </svg>
);

// BiXCircle
const BiXCircle = ({ size = 24, ...props }: CloseProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    strokeWidth="1.8"
    className="icon"
    width={size} // Aplicamos el tamaño al ancho
    height={size} // Aplicamos el tamaño a la altura
    {...props} // Pasamos las demás props, como className, style, etc.
  >
    <path
      fillRule="evenodd"
      d="M12 2.25a9.75 9.75 0 1 0 0 19.5 9.75 9.75 0 0 0 0-19.5zm5.85 12.15a.75.75 0 0 1-1.06 1.06L12 13.06l-4.79 4.79a.75.75 0 0 1-1.06-1.06L10.94 12l-4.79-4.79a.75.75 0 1 1 1.06-1.06L12 10.94l4.79-4.79a.75.75 0 0 1 1.06 1.06L13.06 12l4.79 4.79z"
      clipRule="evenodd"
    />
  </svg>
);

// IoIosAdd
const IoIosAdd = ({ size = 24, ...props }: CloseProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.8"
    className="icon"
    stroke="currentColor"
    width={size} // Aplicamos el tamaño al ancho
    height={size} // Aplicamos el tamaño a la altura
    {...props} // Pasamos las demás props, como className, style, etc.
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);
const TbCurrencyDollar = ({
  size = 24,
  strokeWidth = "2.3",
  ...props
}: CloseProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth={strokeWidth}
    className="icon"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    width={size} // Aplicamos el tamaño al ancho
    height={size} // Aplicamos el tamaño a la altura
    {...props} // Pasamos las demás props, como className, style, etc.
  >
    <path d="M18 8.5V8.35417C18 6.50171 16.4983 5 14.6458 5H9.5C7.567 5 6 6.567 6 8.5C6 10.433 7.567 12 9.5 12H14.5C16.433 12 18 13.567 18 15.5C18 17.433 16.433 19 14.5 19H9.42708C7.53436 19 6 17.4656 6 15.5729V15.5M12 3V21" />
  </svg>
);

// TbPercentage
const TbPercentage = ({ size = 24, ...props }: CloseProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.8"
    className="icon"
    stroke="currentColor"
    width={size} // Aplicamos el tamaño al ancho
    height={size} // Aplicamos el tamaño a la altura
    {...props} // Pasamos las demás props, como className, style, etc.
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6m-3 3a3 3 0 11-4 4m-5-5a3 3 0 100-4 3 3 0 000 4m1 1v6"
    />
  </svg>
);

// TbTrash
const TbTrash = ({ size = 24, ...props }: CloseProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    strokeWidth="1.8"
    className="icon"
    width={size} // Aplicamos el tamaño al ancho
    height={size} // Aplicamos el tamaño a la altura
    {...props} // Pasamos las demás props, como className, style, etc.
  >
    <path
      fillRule="evenodd"
      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
      clipRule="evenodd"
    />
  </svg>
);

// FiPlus
const FiPlus = ({ size = 24, ...props }: CloseProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    strokeWidth="1.8"
    className="icon"
    width={size} // Aplicamos el tamaño al ancho
    height={size} // Aplicamos el tamaño a la altura
    {...props} // Pasamos las demás props, como className, style, etc.
  >
    <path
      fillRule="evenodd"
      d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
      clipRule="evenodd"
    />
  </svg>
);

export {
  TbCurrencyDollar,
  TbPercentage,
  IoIosAdd,
  IoClose,
  IoIosArrowDown,
  IoIosArrowUp,
  IoCheckmarkOutline,
  TbShoppingCart,
  IoCheckmarkDoneOutline,
  RiShoppingBag3Line,
  MdDelete,
  TbEdit,
  IoIosArrowBack,
  RiAddFill,
  AiOutlineSearch,
  RiErrorWarningFill,
  AiOutlineClose,
  FiAlertTriangle,
  BiCheckCircle,
  BiXCircle,
  TbTrash,
  FiPlus,
  TbChevronDown,
};
