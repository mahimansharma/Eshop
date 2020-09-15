import axios from 'axios';

export function getCartProducts(cart) {

    return axios.post(`http://localhost:8000/api/users2/cart`, { cart })

        .then(response => response.data);

}