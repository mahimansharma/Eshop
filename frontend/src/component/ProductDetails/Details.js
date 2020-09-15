import React, { Component } from 'react';
import ProductDetails from './ProductDetails';
import Reviews from './Reviews';
import './style.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { addToCart } from '../../store/actions/cartActions';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            products: [],
            quantity: 1,
            productId : this.props.match.params.id
        };    
    }

    
    componentDidMount() {
        axios.get(`http://localhost:8000/mobiles/`)
            .then(result => {
                console.log("got data", result)
                this.setState({
                    products: result.data
                })
            })
            .catch(error => {
                console.log("error", error)

            })
    }

    renderSpinner() {
        return (
            <div  >
                <span className="load">Loading.....</span>
                <Spinner type="grow" color="success" className="spinner00" />
            </div>

        )
    }
 
    // addToCartHandler = (productId) => {
    //     this.props.dispatch(addToCart(productId))   
    // }
    
    addToCart = (product) => {
        this.props.addToCart(product);
        console.log('add--', this.props)

    }
    removeFromCart = (product) => {
        this.props.removeFromCart(product.id);
        console.log('rem--', this.props)
    }

    // addToCart = (product) => {
    //     let products = this.state.products.filter((item) => item.id !== product.id);
    //     let cart = localStorage.getItem('cart')

    //         ? JSON.parse(localStorage.getItem('cart')) : {};

    //     let id = product.id.toString();

    //     cart[id] = (cart[id] ? cart[id] : 0);

    //     let qty = cart[id] + parseInt(this.state.quantity);

    //     if (product.inStock < qty) {

    //         cart[id] = product.inStock;

    //     } else {

    //         cart[id] = qty

    //     }

    //     localStorage.setItem('cart', JSON.stringify(cart));

    // }


    renderProducts() {
        const product = this.state.products.find(x => x._id === this.props.match.params.id);
        const productId = this.props.match.params.id;
        // const handeleAddToCart = () => {
        //     this.props.history.push("/cart/" + this.props.match.params.id)
        // }
        console.log("details", this)
        return (
            <div>
                <Link to="/mobile">Back to results</Link>
                <ProductDetails
                    product={product}
                    productId={productId}
                    cart={this.props.cart}
                    addCart={this.addToCart}
                    handleRemove={this.removeFromCart}
                    inCart={this.props.cart.length > 0 && this.props.cart.filter(e => e.product.id === product.id).length > 0}
                />
                <Reviews />
            </div>
        )
    }


    renderHome() {
        return (
            this.state.products === undefined ? this.renderSpinner() : this.renderProducts()
        )
    }


    render() {
        console.log("Homedata", this);

        return this.renderHome();

    }
}

const mapStateToProps = (state) => {
    console.log("state", state);
    return {
        user: state.user,
        userSignin: state.userSignin,
        cart: state.cart

    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (product) => {
            dispatch(addToCart(product));
        },
        // removeFromCart: (product) => {
        //     dispatch(removeFromCart(product));
        // }
    }
}

    
export default connect(mapStateToProps, mapDispatchToProps)(Details);
