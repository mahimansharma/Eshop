import React, { Component } from 'react';
import CartData from './CartData';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './style.css';

class Cart extends Component {
    render() {
        console.log('cart++', this);

        let total = 0;

        this.props.cart.cart.map(item => total += parseInt(item.product.price * item.quantity));

        const cart = this.props.cart.cart.length > 0
            ? (
                <div>
                    <div className="panel-body">
                        {
                            this.props.cart.cart.map(item => {
                                return (
                                    <div key={item.product.id}>
                                        <CartData item={item} />
                                        <hr />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="panel-footer">
                        <div className="row text-center">
                            <div className="col-xl-11">
                                <h4 className="text-right">Total: Rs <strong>{total}</strong></h4>
                            </div>

                            <Link to="/order" className='col-xl-1'>
                                <Button variant="outline-success" size="lg">
                                    ORDER
                                </Button>
                            </Link>

                        </div>
                    </div>
                </div>

            )

            : (
                <div >
                    <p>Cart is empty</p>
                </div>
            )

        return (
            <div className="container-fluid onee">
                <div >
                    <h5><strong> My Shopping Cart</strong> </h5>
                </div>
                <div className='container-fluid'>
                    {cart}
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {

    return {
        cart: state.cart
    }
};

export default connect(mapStateToProps)(Cart);