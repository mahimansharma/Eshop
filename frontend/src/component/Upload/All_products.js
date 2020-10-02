import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import './style.css';


class All_products extends Component {
    
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
    
    handleClick(productId)
    {
        if(window.confirm('Are you sure??'))
        {
            fetch("http://localhost:8000/mobiles/delete/" + productId,{
                method: 'DELETE',
                headers:{'accept':'application/json',
            'Content-type':'application/json'}
            })

        }
    }

    
    
    render() {
        return (
            <div className='container-fluid'>
                <Row>
                    {this.state.products.map(product => {
                        return(
                            <Col xl={2}>
                                <div className="card">
                                    <img className="img3" alt="product pic not availalble"
                                        src={product.pic}
                                        width="90px" ></img>
                                    <span className="name2">{product.name}</span>
                                    <div>
                                        <button className='btn-small waves-effect lighten-2 delete' onClick={() => this.handleClick(product._id) }><DeleteOutlined /></button>
                                        <button className='btn-small waves-effect lighten-2 edit'  ><EditOutlined /></button>
                                    </div>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
                
            </div>
        )
    }
}


export default connect(null)(All_products);
