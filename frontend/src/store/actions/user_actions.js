import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART_USER,
    GET_CART_ITEMS_USER,
    REMOVE_CART_ITEM_USER,
    ON_SUCCESS_BUY_USER
} from '../constants/user_constants';
import { USER_SERVER } from './Config';

const registerUser = (dataToSubmit) => {
    console.log("register");
    const request = axios.post(`http://localhost:8000/api/users/register`, dataToSubmit)
        .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}

const loginUser = (dataToSubmit) => {
    console.log("login");
    const request = axios.post(`http://localhost:8000/api/users/login`, dataToSubmit)
        .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

const auth = () => {
    console.log("Authenticationfront");
    const request = axios.get('http://localhost:8000/api/users/auth')
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

const logoutUser = () => {
    const request = axios.get(`http://localhost:8000/api/users/logout`)
        .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

const addToCart = (_id) => {
    const request = axios.post(`http://localhost:8000/api/users/addToCart?productId=${_id}`)
        .then(response => response.data);

    return {
        type: ADD_TO_CART_USER,
        payload: request
    }
}


const getCartItems = (cartItems, userCart) => {
    const request = axios.get(`http://localhost:8000/products_by_id?id=${cartItems}&type=array`)
        .then(response => {


            //Make CartDetail inside Redux Store 
            // We need to add quantity data to Product Information that come from Product Collection. 

            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, i) => {
                    if (cartItem.id === productDetail._id) {
                        response.data[i].quantity = cartItem.quantity;
                    }
                })
            })

            return response.data;
        });

    return {
        type: GET_CART_ITEMS_USER,
        payload: request
    }
}




const removeCartItem = (id) => {
    const request = axios.get(`/api/users/removeFromCart?_id=${id}`)
        .then(response => {

            response.data.cart.forEach(item => {
                response.data.cartDetail.forEach((k, i) => {
                    if (item.id === k._id) {
                        response.data.cartDetail[i].quantity = item.quantity
                    }
                })
            })
            return response.data;
        });

    return {
        type: REMOVE_CART_ITEM_USER,
        payload: request
    }
}


const onSuccessBuy = (data) => {

    const request = axios.post(`${USER_SERVER}/successBuy`, data)
        .then(response => response.data);

    return {
        type: ON_SUCCESS_BUY_USER,
        payload: request
    }
}

export default { loginUser, registerUser, addToCart, auth, getCartItems, removeCartItem, onSuccessBuy, logoutUser};