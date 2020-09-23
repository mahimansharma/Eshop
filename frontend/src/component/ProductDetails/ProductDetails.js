import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import { addToCart } from '../../store/actions/userActions';
import './style.css';

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            quantity: 1,
            inCart: this.props.inCart
         }
    }
   
   
    renderSpinner() {
        return (
            <div  >
                <span className="load">Loading.....</span>
                <Spinner type="grow" color="success" className="spinner00" />
            </div>

        )
    }
    
    handleInputChange = event =>

        this.setState({ [event.target.name]: event.target.value })

    addToCart = (e) => {

        e.preventDefault();

        this.props.addCart(this.props.product)

        this.setState({
            inCart: true
        })
    }

    renderProductDetails(){
        const { product } = this.props;
        // const { addToCartHandler} = this.props;
        console.log("product details", this)
        return (
            <Row className="box1">


                <Col xl={4} className="box2">
                    <img className="img" src={product.pic}
                        alt="not avaliable"
                        height="500px"></img>
                    
                    <span className="card-text">

                        <small>Available Quantity: </small>{product.inStock}

                    </span>

                    {product.inStock > 0 
                    
                        ?
                        <div className='qty-box'> 

                            {/* <input type="number" value={this.state.quantity} name="quantity"

                                onChange={this.handleInputChange} className="Center"

                                style={{ width: "60px", marginLeft: "20px", borderRadius: "3px" }} 
                                
                                /> */}
                                
                            <div>Qty:</div>  
                            <select
                                name='qty'
                                className='qty'
                                value={this.state.quantity}
                                onChange={(e) => { this.setState({quantity: this.state.quantity  })}}
                            >
                                {[...Array(product.inStock).keys()].map((x) => (
                                    <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                    </option>
                                ))}
                            </select>

                            {
                                this.state.inCart
                                    ? <button className="btn btn-sm btn-warning red ">Added to cartt</button>
                                    : <button className="btn btn-sm btn-warning " onClick={this.addToCart}>Add to cart </button>
                            }     


                        </div> 
                        :
                        <p className="text-danger"> Product is out of stock </p>

                    }

                </Col>
                <Col xl={8}>
                    <div className="product-name">{product.name}</div>
                    <div className="price">₹ {product.price}</div>
                    <div className="des1"><strong>DESCRIPTION</strong></div>
                    <div className="description">
                        {product.des}
                    </div>
                    <div className=" highlight">
                        <div className="high1"><strong>HIGHLIGHT</strong></div>
                        <ul className='high2'>
                            {product.high.map((high) => 
                            <li key={high} >
                                {high}
                            </li>)}
                        </ul>
                    </div>

                </Col>
            </Row>
        )
    }
    renderHome() {
        return (
            this.props.product === undefined ? this.renderSpinner() : this.renderProductDetails()
        )
    }


    render() {
        return this.renderHome();
    }
}

const mapStateToProps = (state) => {
    console.log("state", state);
    return {
        user: state.user,
        userSignin: state.userSignin

    }
}



export default connect(mapStateToProps,null)(ProductDetails);