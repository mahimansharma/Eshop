import React, { Component } from 'react';
import ItemBox from './ItemBox';
import Filter from './Filter';
import './style.css';

class Items extends Component {
   
    render() {
        return (
            <div className="bigitems">
                <Filter/>
                <ItemBox/>
            </div>
        )
    }
}

export default Items;