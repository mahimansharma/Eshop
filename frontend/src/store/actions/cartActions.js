export const addToCart = (product) => {

    return {
        type: 'Add_to_cart',
        payload: {
            product,
            quantity: 1
        }
    }
};

export const removeFromCart = (productId) => {

    return {
        type: 'Remove_from_cart',
        payload: {
            productId: productId
        }
    }
};

export const updateCartQuantity = (productId, quantity) => {

    return {
        type: 'UPDATE_CART_QUANTITY',
        payload: {
            productId,
            quantity: quantity
        }
    }
};
