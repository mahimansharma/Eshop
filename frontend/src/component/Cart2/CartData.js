import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCartQuantity, removeFromCart } from '../../store/actions/cartActions';
import { DeleteFilled } from '@ant-design/icons';

class CartData extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quantity: this.props.item.quantity,
            btnVisible: false
        };
    }

    handleChange = (e) => {

        if (e.target.value <= 0) {
            alert("Quantity must be greater than or equal to 1");

            return;
        }

        if (e.target.value > this.props.item.product.inStock) {
            alert("You have exceeded the available items of this product!");

            return;
        }

        if (this.state.quantity !== e.target.value) {
            this.setState({
                quantity: e.target.value,
                btnVisible: true
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.updateCartQuantity(this.props.item.product.id, this.state.quantity);

        this.setState({
            btnVisible: false
        });
    }

    handleRemove = (e) => {
        this.props.removeFromCart(this.props.item.product.id);
    }

    render() {

        const { item } = this.props;

        console.log('item',this);
        return (

            <div className="row cart-row">
                <div className="col-xl-3 image">
                    <img className="img-responsive" src={item.product.pic} alt="product" />
                </div>
                <div className="col-xl-2 ">
                    <h5>
                        <strong>
                            {item.product.name}
                        </strong>
                    </h5>
                </div>
                <div className="col-xl-2 ">
                    <form onSubmit={this.handleSubmit}>
                        <div className="col-xs-4">
                            <input type="number" className="form-control input-sm" onChange={this.handleChange} value={this.state.quantity} />
                        </div>

                        {
                            this.state.btnVisible ? (
                                <div className="col-xs-2">
                                    <button type="submit" className="btn btn-info">Update</button>
                                </div>
                            ) : null
                        }
                    </form>
                </div>
                
                <div className="col-xl-2 ">
                    <div className="col-xs-3 text-right">
                        Rs: {item.product.price}
                    </div>
                </div>

                <div className="col-xl-2">
                   
                    
                        <div >
                            <button type="button" onClick={this.handleRemove} className="btn btn-link btn-xs">
                                <DeleteFilled />
                            </button>
                        </div>
                    
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        updateCartQuantity: (productId, quantity) => dispatch(updateCartQuantity(productId, quantity)),
        removeFromCart: (productId) => dispatch(removeFromCart(productId))
    }
};

export default connect(null, mapDispatchToProps)(CartData);