import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardBlock from './CardBlock';
import Axios from 'axios';
import user_actions from '../../store/actions/user_actions';
import { Result, Empty } from 'antd';


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            ShowTotal: (false),
            ShowSuccess: (false)

        };

    }


    calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.map(item => {
            total += parseInt(item.price, 10) * item.quantity
        });

        this.setState({ total: this.state.total })
        this.setState({ ShowTotal: true })
    }


componentDidMount() {
    {

        let cartItems = [];
        if (this.props.user.user && this.props.user.user.cart) {
            if (this.props.user.user.cart.length > 0) {
                this.props.user.user.cart.forEach(item => {
                    cartItems.push(item.id)
                });
                this.props.dispatch(user_actions.getCartItems(cartItems, this.props.user.user.cart))
                    .then((response) => {
                        if (response.payload.length > 0) {
                            this.calculateTotal(response.payload)
                        }
                    })
            }
        }
    }
}

     removeFromCart = (productId) => {

         this.props.dispatch(user_actions.removeCartItem(productId))
            .then((response) => {
                if (response.payload.cartDetail.length <= 0) {
                    this.setState({ ShowTotal: false })
                } else {
                    this.calculateTotal(response.payload.cartDetail)
                }
            })
    }


    render() {
        console.log("cart2nd page", this);
        return (
            <div>
                <h1>My Cart</h1>
                <div>

                <CardBlock
                    products={this.props.user.cartDetail}
                    removeItem={this.removeFromCart}
                />

                {this.state.ShowTotal ?
                    <div style={{ marginTop: '3rem' }}>
                        <h2>Total amount: ${this.state.Total} </h2>
                    </div>
                    :
                    this.state.ShowSuccess ?
                        <Result
                            status="success"
                            title="Successfully Purchased Items"
                        /> :
                        <div style={{
                            width: '100%', display: 'flex', flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            <br />
                            <Empty description={false} />
                            <p>No Items In the Cart</p>

                        </div>
                }
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

// const mapDispatchToProps = (dispatch) => {
//     // return {
//     //     getCartItems: (cartItems) => {
//     //         dispatch(getCartItems(cartItems))
//     //     }
//     // }
// }

export default connect(mapStateToProps, null)(Cart)
