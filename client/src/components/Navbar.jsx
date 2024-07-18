import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Auth from '../utils/auth';

const AppNavbar = () => {
  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            Google Books Search
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to='/'>
                Search For Books
              </Nav.Link>
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/saved'>
                    See Your Books
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to='/login'>
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to='/signup'>
                    Signup
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;
