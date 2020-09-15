import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel';

export default class Slide extends Component {
    render() {
        return (
            <Carousel className="slide">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://www.bigbasket.com/media/uploads/banner_images/2007013_cooking-essentials_460.jpg" 
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://www.bigbasket.com/media/uploads/banner_images/2007013_cooking-essentials_460.jpg"
                        alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://www.bigbasket.com/media/uploads/banner_images/2007003_figs-litchi_460.jpg"
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        )
    }
}
