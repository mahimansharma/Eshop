import React, { Component } from 'react';
import Cards from './../Home/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { Spinner } from 'reactstrap';
import { connect } from 'react-redux';


class ItemBox extends Component {
   
    constructor(props) {
        super(props);
        this.state = { products: [] };
    }

    componentDidMount() {
        axios.get("http://localhost:8000/mobiles/")
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


    renderProducts() {
        return (
            <div className="container-fluid">
                <Row className='bigrow'>
                    {this.state.products.map(product => {
                        return (
                            <Col xl={3} key={product.id}>
                                <Cards id='product-card'
                                    product={product} />
                            </Col>
                        )
                    })}
                </Row>

            </div>

        )
    }

    renderHome() {
        return (
            this.state.products === undefined ? this.renderSpinner() : this.renderProducts()
        )
    }
   
   
    render() {
        console.log("mobile", this);

        return this.renderHome();
    }
}

export default connect(null)(ItemBox);