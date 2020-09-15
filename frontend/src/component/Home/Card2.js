import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { connect } from 'react-redux';


class Cards2 extends Component {


    render() {
        // console.log("product--", this);
        const { product } = this.props;
        return (
            <div className="card two">
                <Link to={'/mobile/' + product._id}> <img className="img2" alt="product pic not availalble"
                    src={product.pic}
                    width="90px" ></img> 
                </Link>
                    <span className="name2">{product.name}</span>
            </div>




        )
    }
}

export default connect(null)(Cards2);