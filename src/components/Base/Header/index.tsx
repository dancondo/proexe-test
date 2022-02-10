import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';

const Header: React.FC = () => (
  <Navbar
    bg="dark"
    variant="dark"
  >
    <Container>
      <Navbar.Brand>
        <Link
          to="/users"
        >
          Proexe Test
        </Link>
      </Navbar.Brand>
    </Container>
  </Navbar>
)

export default Header
