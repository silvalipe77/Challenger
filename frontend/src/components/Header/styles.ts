import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0;
  
  h1 {
    color: white;
    font-size: 2.5rem;
    
  }

  a {
    text-decoration: none !important;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }
`;

