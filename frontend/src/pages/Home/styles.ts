import styled from 'styled-components';

export const Container = styled.div`
  .page-buttons {
    display:flex;
    justify-content: flex-end;
    margin-top: 1.5rem;
    button {
    background-color: transparent;
    border: none;
    font-weight: bold;
    color: #ffffff;
    font-size: 1.5rem;
    padding: 0.2rem;
    }
    button:disabled,
    button[disabled]{
      color: red;
      cursor: pointer;
      font-size: 2rem;
      font-weight: bold;
    }
  }
`
export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  list-style: none;

  li {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    padding: 20px;
    justify-content: space-between;
    img {
      align-self: center;
      max-width: 250px;
      max-height: 250px;
    }
    .product-info {
      display: flex;
      flex-direction: column;
      margin: 0.5rem 0;
      align-items: center;

      strong{
        font-size: 1rem;
        text-align: center;
      }
      span{
        margin-top: 0.2rem;
        font-size: 0.8rem;
      }
    }
  }
`
