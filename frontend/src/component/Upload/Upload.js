import React from 'react';
import './style.css';
import {Button, Form , Input, } from 'antd';
import axios from 'axios';
import Axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';



class Upload extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            brand: '',
            pic:'',
            price:'',
            quality:'',
            des:'',
            inStock:'',
            high: [],
            erros: [],
            editing: false,
        };

    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = event => {
        event.preventDefault();
        

        if (!this.state.name || !this.state.brand || !this.state.pic || !this.state.price || !this.state.quality|| !this.state.des || !this.state.inStock){
            return alert('Please fill all feilds of the form')
        }


        const variables ={
            name:  this.state.name ,
            brand: this.state.brand,
            pic: this.state.pic,
            price: this.state.price,
            quality: this.state.quality ,
            des: this.state.des,
            inStock: this.state.inStock

        }

        Axios.post('http://localhost:8000/mobiles/', variables)
            .then(response => {
                    console.log(response) 
                    alert('Your product is uploaded succefully')
                    this.props.history.push('/') 
            })
            .catch(error => {
                alert("Sorry! product failed to upload")
                console.log(error) 
            })

    }

   

    // handleDelete = (name) => {
    //     axios
    //         .delete(`http://localhost:8000/mobiles/${name}`)
    //         .then(response => {
    //             // this.setState({
    //             //     product: response.data
    //             // })
    //             alert('item deleted')
    //             console.log(response.data)
    //         })
    //         .catch(error => {
    //             alert('sorry')
    //             console.log(error)
    //         })
    // };

    // handleUpdating = (event) => {
    //     this.setState({ editing: true })
    // }

    // handleEdit = (id) => {
    //     axios.put(`http://localhost:8000/mobiles/${id}`, {
    //         name: this.state.name,
    //         age: this.state.age,
    //         email: this.state.email
    //     })
    //         .then(response => {
    //             this.setState({ product: response.data });
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }

    render() {
        return (
            <div className='container upload'>
                <h2>Upload product</h2>
                <Form onSubmit={this.onSubmit}>
                    <div className='row'>
                        <div className='input-feild col s6'>
                            <label htmlFor="name"> Name</label>
                            <input
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                                id="name"
                                className='validate' 
                            />
                        </div>

                        <div className='input-feild col s6'>
                            <label htmlFor="brand"> Brand</label>
                            <input
                                name="brand"
                                value={this.state.brand}
                                onChange={this.handleChange}
                                id="brand"
                                className='validate'
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="pic"> Pic</label>
                        <input
                            
                            name="pic"
                            value={this.state.pic}
                            onChange={this.handleChange}
                            id="pic"
                            className='validate'
                        />
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <label htmlFor="price"> Price</label>
                            <input
                                type='number'
                                name="price"
                                value={this.state.price}
                                onChange={this.handleChange}
                                id="price"
                                className='validate'
                            />
                        </div>
                        <div className='col-6'>
                            <label htmlFor="inStock"> InStock</label>
                            <input
                                type='number'
                                name="inStock"
                                value={this.state.inStock}
                                onChange={this.handleChange}
                                id="inStock"
                                className='validate'
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="quality"> Quality</label>
                        <input
                            name="quality"
                            value={this.state.quality}
                            onChange={this.handleChange}
                            id="quality"
                            className='validate'
                        />
                    </div>
                    <div>
                        <label htmlFor="des"> Description</label>
                        <input
                            name="des"
                            value={this.state.des}
                            onChange={this.handleChange}
                            id="des"
                        />
                    </div>
                    <div>
                        {/* <ul className='high2'>
                            {product.high.map((high) =>
                                <li >
                                    {high}
                                </li>)}
                        </ul> */}
                    </div>
                    
                    <Button
                        className='btn waves-effect red lighten-2'
                        onClick={this.onSubmit}
                    >
                        Submit
                    </Button>
                    &nbsp;
                    &nbsp;
                    <Link to='/admin_products'>
                        <Button className='btn waves-effect red lighten-2'
                        >Edit Products</Button>
                    </Link>
                    &nbsp;
                    &nbsp;
                    {/* <div>
                        <label>
                            Name
                        <input

                            onChange={this.handleChange}
                            value={this.state.name}
                        />
                        </label>
                        
                        <Button
                        type='submit'
                            className='btn waves-effect red lighten-2'
                            onClick={this.handleDelete}
                        >
                            delete
                        </Button>
                    </div> */}

                </Form>
                
            </div>
        )
    }
}


export default connect(null) (Upload);