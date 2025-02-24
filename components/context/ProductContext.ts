import { type Dispatch, type SetStateAction, createContext } from "react";
import { ProductListAccouting } from "../interface/productListAccouting";
import { ProductList } from "../interface/productList";

interface ProductContextType {
  productList: ProductList[];
  setProductList: Dispatch<SetStateAction<ProductList[]>>;
  addProductList: (productAdd: ProductList) => void;
  deleteProductList: (guid: string) => void;
  theme?: string;
}

export const ProductContext = createContext<ProductContextType>({
  productList: [],
  setProductList: () => [],
  addProductList: () => {},
  deleteProductList: () => {},
  theme: "linght",
});

interface ProductContextTypeAccouting {
  productList: ProductListAccouting[];
  setProductList: Dispatch<SetStateAction<ProductListAccouting[]>>;
  addProductList: (productAdd: ProductListAccouting) => void;
  deleteProductList: (guid: string) => void;
  theme?: string;
}
export const ProductContextAccounting =
  createContext<ProductContextTypeAccouting>({
    productList: [],
    setProductList: () => [],
    addProductList: () => {},
    deleteProductList: () => {},
    theme: "linght",
  });
