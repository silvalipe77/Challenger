import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Product {
  code: string
  barcode: string
  status: string
  imported_t: string
  url: string
  product_name: string
  quantity: string
  categories: string
  packaging: string
  brands: string
  image_url: string
  store: string
  _id: string
}

interface ProductsProviderProps {
  children: ReactNode;
}

interface ProductsContextData {
  products: Product[], 
  fetchProducts: (page: Number) => void;
}

 



const ProductsContext = createContext<ProductsContextData>({} as ProductsContextData);


export function ProductsProvider({ children }: ProductsProviderProps) {
  const [products, setProducts] = useState<Product[]>([]);
  function fetchProducts(page:Number){
     api.get(`/products?page=${page}`)
      .then(response => setProducts(response.data))
  }

  // useEffect(() => {
 
  // }, [page])
  // function setPageNumber(pageNumber:Number) 
  // {    
  // setPage(pageNumber)
  // }
  

  return (
    <ProductsContext.Provider value={{ products , fetchProducts}}>
      {children}
    </ProductsContext.Provider>
  )
  }

export function useProducts() {
  const context = useContext(ProductsContext);

  return context;
}