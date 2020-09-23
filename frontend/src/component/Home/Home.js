import React, { Component } from 'react';
import Slide from './Slide';
import Products from './Products'
import './style.css';

class Home extends Component {
    render() {
        return (
            <div >
                <img src='https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/retaillabs/2020/9/16/eb4724d2-6a35-4636-9bd7-1f136aab984c1600248109168-1920x504_1.jpg' alt='image' width= '100%' />
                {/* <Slide/> */}
                <Products />
            </div>
        )
    }
}

export default Home;