import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import './style.css';

class SubHeader extends Component {
    render() {
        return (
            <Navbar expand="lg" className="navbar02">
                <Nav className="mr-auto sub-nav">
                    <NavDropdown title="Electronics" className="drop">
                        <NavDropdown.Item > <Link className='text' to='/Mobile'>Mobile</Link></NavDropdown.Item> 
                        <NavDropdown.Item > <Link className='text' to="/Laptop">Laptops</Link> </NavDropdown.Item>
                        <NavDropdown.Item > <Link className='text' to="/Camera">Camera</Link></NavDropdown.Item>
                        <NavDropdown.Item > <Link className='text' to="/Tablets">Tablets</Link></NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Tv and appliances" className="drop">
                        <NavDropdown.Item ><Link className='text' to="/TV">TV</Link></NavDropdown.Item>
                        <NavDropdown.Item ><Link className='text' to="/Washing-machine">Washing machine</Link></NavDropdown.Item>
                        <NavDropdown.Item ><Link className='text' to="/Air-Conditioners">Air Conditioners</Link></NavDropdown.Item>
                        <NavDropdown.Item ><Link className='text' to="/Kitchen-appliances">Kitchen appliances</Link></NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Fashion" className="drop">

                    </NavDropdown>
                </Nav>
            </Navbar>
        )
    }
}

export default SubHeader;