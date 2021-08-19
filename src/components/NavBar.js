import React, { Component } from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class NavBar extends Component {
    render() {
        
        return (
            <div>
                  <Navbar bg="dark" variant="dark" >
                    <Container>
                        <Navbar.Brand href="/">Misa</Navbar.Brand>
                        <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                    </Nav>
                    </Container>
                </Navbar>
            </div>
        )
    }
}
