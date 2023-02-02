import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Styled from "./Header.module.scss";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand href="#home">NicommentArchives</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Main</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/list">
              <Nav.Link>List</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/progress">
              <Nav.Link>Progress</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/add">
              <Nav.Link>Add</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
