import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { connect } from 'react-redux';


class Cards extends Component {
    
    
    render() {
        console.log("product--",this);
        const { product } = this.props;
        return (
                    <div className="card">
                <Link to={'/mobile/' +  product._id}> <img className="img" id='pic64' alt="product pic not availalble" 
                src={product.pic}
                    width="90px" ></img> </Link>
                        <div className="a1">
                    <span className="brand">{product.brand}</span>
                    <span className="name">{product.name}</span>
                    <span className="quality">{product.quality}</span>
                    <div className="price">₹{product.price} </div>
                        </div>
                    </div>
                    
                
                
            
        )
    }
}

export default connect(null)(Cards);