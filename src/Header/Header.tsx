import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Styled from "./Header.module.scss";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" collapseOnSelect expand="md" fixed="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className={Styled.brandName}>
            ニコ動コメントアーカイブス
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/list">
              <Nav.Link>動画一覧</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/reserve">
              <Nav.Link>予約一覧</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/stats">
              <Nav.Link>処理状況</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/add">
              <Nav.Link>追加</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
