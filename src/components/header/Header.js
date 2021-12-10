import React, { Component } from 'react'
import { Navbar,Container,Nav } from "react-bootstrap";
import './header.css'

export default class Header extends Component {
    render() {
        return (
            
  <Navbar id="capture-header">
    <Container>
      <Navbar.Brand href="#home"> 
      
      <i className="bi bi-camera2">
        <h5 id="title">Capture-it</h5>
        </i>
      </Navbar.Brand>
      
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav id="links" className="ms-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#link">Link</Nav.Link>
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>      
      )
    }
}
