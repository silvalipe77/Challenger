import React, { useEffect } from 'react';

import { Container, ProductList } from './styles';

import usePagination from '../../hooks/usePagination';
import { useProducts } from '../../hooks/useProducts';

interface HomeProps {
  onOpenProductsModal: (productSelected: string) => void;
}



const Home = ({ onOpenProductsModal }: HomeProps): JSX.Element => {
  const { actualPage, setActualpage } = usePagination()
  const { products, fetchProducts } = useProducts();
  useEffect(() => {
    fetchProducts(actualPage)
  }, [actualPage]);



  return (
    <Container>
      <ProductList>
        {products.map((produto) => (
          <li key={produto.barcode} onClick={() => { onOpenProductsModal(produto._id) }}>
            <img src={produto.image_url} alt={produto.product_name} />
            <div className="product-info">
              <strong>{produto.product_name}</strong>
              <span>Quantidade: {produto.quantity}</span>
            </div>
          </li>
        ))}
      </ProductList>
      <div className='page-buttons'>
        {Array(10).fill('').map((_, index) => {
          return <button key={index} onClick={() => setActualpage(index + 1)}
            disabled={index === actualPage - 1}>
            {index + 1}
          </button>
        })}
      </div>
    </Container>
  );
};

export default Home;
