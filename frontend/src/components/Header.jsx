import React from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useAuth } from '../hooks/index.js';

const Header = () => {
  const auth = useAuth();

  return (
    <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
        {auth.user ? <Button onClick={auth.logOut}>Выйти</Button> : null}
      </Container>
    </Navbar>
  );
};

export default Header;
