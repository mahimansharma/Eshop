import React, { Component } from 'react';
import Cards2 from './Card2';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Axios from 'axios';
import { Spinner } from 'reactstrap';


class Products extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            products: [],
            Skip: (0),
            Limit: (4)
            
        };
        
    }

    componentDidMount() {

        const variables = {
            skip: this.Skip,
            limit: this.Limit
        } 

        axios.get(`http://localhost:8000/mobiles/`, variables)
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

    onLoadMore = () =>{
        let skip = this.Skip  + this.Limit;

        const variables = {
            skip: this.Skip,
            limit: this.Limit
        } 

        // Axios.get(`http://localhost:8000/mobiles/`, variables)
        //     .then(result => {
        //         console.log("got data", result)
        //         this.setState({
        //             products: ([...this.state.products, result.data])
        //         })
        //     })
        //     .catch(error => {
        //         console.log("error", error)

        //     })

    }   


        renderProducts(){
            return (
                <div className="container-fluid">
                    <Row className='bigrow'>
                        {this.state.products.map(product => {
                            return (
                                <Col className='collumns' xl={2} key={product.id}>
                                    <Cards2 
                                    product={product}/>
                                    
                                </Col>
                            )
                        })}
                    </Row>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button className='btn-small red waves-effect lighten-2' onClick={this.onLoadMore}>Load more </button>
                    </div>

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

// const mapStateToProps = (state) => {
//     console.log("state", state);
//     return {
//         products: state.allData.products,
        
//     }
// }

export default connect(null)(Products);