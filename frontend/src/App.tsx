import React, {useState}from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import GlobalStyles from './styles/global';
import Header from './components/Header';
import Home from './pages/Home';
import { ProductsModal } from './components/ProductsModal';
import { ProductsProvider } from './hooks/useProducts';



const App = (): JSX.Element => {
  const [isProductsModalOpen, setIsProductsModal] = useState(false);
  const [productId,setProductId] = useState<String>('')
  function handleOpenProductsModal(productSelected:String) {
    setProductId(productSelected)
    setIsProductsModal(true);
    
  }

  function handleCloseProductsModal() {
    setIsProductsModal(false);
  }
  return (
    <BrowserRouter>
      <ProductsProvider>
        <GlobalStyles />
        <Header />
        <Home onOpenProductsModal={handleOpenProductsModal} /> 
        <ToastContainer autoClose={3000} />
        <ProductsModal isOpen={isProductsModalOpen} productClicked={productId}
        onRequestClose={handleCloseProductsModal}  />
      </ProductsProvider>
    </BrowserRouter>

  );
};

export default App;