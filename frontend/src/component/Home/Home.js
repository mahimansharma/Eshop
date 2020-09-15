import React, { Component } from 'react';
import Slide from './Slide';
import Products from './Products'
import './style.css';

class Home extends Component {
    render() {
        return (
            <div >
                <Slide/>
                <Products />
            </div>
        )
    }
}

export default Home;