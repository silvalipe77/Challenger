import { Link } from 'react-router-dom';
import { Container } from './styles';


const Header = (): JSX.Element => {


  return (
    <Container>
      <Link to="/">
        <h1>Challenger Fullstack</h1>
      </Link>
    </Container>
  );
};

export default Header;
