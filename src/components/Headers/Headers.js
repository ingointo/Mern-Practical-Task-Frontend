import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Headers = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container className="d-flex justify-content-center">
          <Navbar.Brand href="/">
            MERN Stack Developer Practical Task
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
};

export default Headers;
