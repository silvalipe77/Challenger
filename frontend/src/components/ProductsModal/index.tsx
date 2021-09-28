import Modal from 'react-modal';

import { Container } from './styles';
import closeImg from '../../assets/close.svg'
import { useProducts } from '../../hooks/useProducts';

interface ProductsModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  productClicked: String;
}

export function ProductsModal({ isOpen,productClicked, onRequestClose }: ProductsModalProps) {
  const { products } = useProducts();
  const product = products.find(p =>p._id === productClicked)
  console.log(product)

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      ariaHideApp={false}
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

       {product && <Container >
        
        <h1>{product.product_name}</h1>
        <img src={product.image_url} alt="" />

        <div className='product-info'>
          
          
          <p>Barcode: {product.barcode}</p>
          <p>Status: {product.status}</p>
          <p>Brands: {product.brands}</p>
          <p>Store: {product.store}</p>
        </div>
        
        {/* <img src={product.image_url} alt="Fechar modal" /> */}
             
      {/* Barcode
Status
Packaging
Brands
Store */}
      </Container>}


    </Modal>
  )
}