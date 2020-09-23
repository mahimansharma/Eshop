import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Badge} from 'antd';
import { Link } from 'react-router-dom';
import './style.css';
import { connect } from 'react-redux';
import * as Icon from 'react-bootstrap-icons';
import Axios from 'axios';
import { logout } from '../../store/actions/userActions';
import { withRouter } from "react-router";
import logo from './logo.jpg' ;

 class Header extends Component {
     constructor(props) {
         super(props)
         this.state = {
             
         };
     }

    logoutHandler = () => {
        Axios.get(`http://localhost:8000/api/users/logout`)
        .then(response => {
             if (response.status === 200) {
                 this.props.history.push("/login");
             } else {
                 alert('Log Out Failed')
             }
         });
     };
    handleLogout = () => {
         this.props.dispatch(logout());
         this.props.history.push("/signin");
     };


    render() {
        console.log('navbar',this);
        return (
            <Navbar expand="lg" className="navbar01 " fixed="top">
                <Link to="/home" className="N01" id="Logo" ><img id='Logo-pic' src={logo} alt='Eshop' width='100%' /></Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="navbar-toggler01"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    
                        <div className="input-group">
                            <input className="form-control22" type="text" placeholder="Search for products,brands and more" aria-label="Search"></input>
                            <div className="input-group-prepend">
                                <span><i className="fa fa-search" aria-hidden="true"></i></span>
                            </div>  
                        </div>
                    {this.props.userSignin.userInfo ? (
                            <div className='box_opt'>
                                <Link to='/profile' className="login-btn">{this.props.userSignin.userInfo.name} </Link>
                                {/* <button type="button" onClick={this.handleLogout} className="login-btn">Logout</button>                                 */}
                                <Link to='/cart' className="login-btn" >
                                    <Badge
                                    // count={this.props.user.user && this.props.user.user.cart.length}
                                    >
                                        <Icon.Cart size={25} />
                                    </Badge>
                                </Link>
                            </div>
                            )   
                            : (
                            
                                <Link to='/signin' className="login-btn">LOGIN</Link>
                            )
                    }
                    {this.props.userSignin.userInfo && this.props.userSignin.userInfo.isAdmin && (

                        <Link to='/upload' className="login-btn"><Icon.Upload size={25} /></Link>
                    )}
                       
                        
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("state", state);
    return {
        userSignin: state.userSignin,
        user: state.user
    }
}

const ShowTheLocationWithRouter = withRouter(Header);

export default connect(mapStateToProps, null)(ShowTheLocationWithRouter);