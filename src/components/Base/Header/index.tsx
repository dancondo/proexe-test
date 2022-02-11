import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';

const Header: React.FC = () => (
  <Navbar
    bg="dark"
    variant="dark"
    data-testid="nav"
  >
    <Container>
      <Navbar.Brand>
        Proexe Test
      </Navbar.Brand>
    </Container>
  </Navbar>
)

export default Header
