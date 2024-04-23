import React from "react";
import {
  Navbar,
  Nav,
  Form,
  Col,
  Button,
  Row,
  NavDropdown,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavigateMain.css";

const NavigateMain = () => {
  return (
    // <nav class="navbar navbar-expand-lg navbar-light bg-light ms-auto">
    // <Navbar bg="light" expand="lg" className="shadow-sm custom-navbar">
    //   <Navbar.Brand as={Link} to="/users/create" className=" custom-brand">Create User</Navbar.Brand>
    //   <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //   <Navbar.Collapse id="basic-navbar-nav">
    //     <Nav className="ml-auto">
    //       <Nav.Link as={Link} to="/users/view" className="text-dark custom-link">View All Users</Nav.Link>
    //     </Nav>
    //   </Navbar.Collapse>
    //   <Row>
    //       <Col xs="auto">
    //         <Form.Control
    //           type="text"
    //           placeholder="Search"
    //           className=" mr-sm-2"
    //         />
    //       </Col>
    //       <Col xs="auto">
    //         <Button type="submit">Submit</Button>
    //       </Col>
    //     </Row>
    // </Navbar>
    // </nav>

    
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mar">
            <Nav.Link  as={Link} to="/users/create" className="navi">Create</Nav.Link>
            <Nav.Link  as={Link} to="/users/view" className="navi">View</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigateMain;
