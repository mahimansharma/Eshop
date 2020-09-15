import React, { Component } from 'react';
import { connect } from 'react-redux';


class Item2 extends Component {

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

        if (e.target.value > this.props.item.product.amount) {
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


    render() {

        const { item } = this.props;

        return (

            <div className="row cart-row">
                <div className="col-xl-4 image">
                    <img className="img-responsive" src={item.product.pic} alt="product" />
                </div>
                <div className="col-xl-4 ">
                    <h5 >
                        {item.product.brand}
                    </h5>
                    <h6>
                        <strong>
                            {item.product.name}
                        </strong>
                    </h6>
                </div>
                <div className="col-xl-4 ">
                    <div className="col-xs-3 text-right">
                        Rs: {item.product.price}
                    </div>
                </div>

            </div>
        )
    }
}



export default connect(null, null)(Item2);