import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import user_actions from '../../store/actions/user_actions';
import CardBlock from './CardBlock';
import { Result, Empty } from 'antd';
import Axios from 'axios';

function Cart2 (props) {
    console.log("cart2",props);
    const dispatch = useDispatch();
    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)
    const [ShowSuccess, setShowSuccess] = useState(false)

    useEffect(() => {

        let cartItems = [];
        if (props.user.user && props.user.user.cart) {
            if (props.user.user.cart.length > 0) {
                props.user.user.cart.forEach(item => {
                    cartItems.push(item.id)
                });
                dispatch(user_actions.getCartItems(cartItems, props.user.user.cart))
                    .then((response) => {
                        if (response.payload.length > 0) {
                            calculateTotal(response.payload)
                        }
                    })
            }
        }
    }, [props.user.user] )

    const calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.map(item => {
            total += parseInt(item.price, 10) * item.quantity
        });

        setTotal(total)
        setShowTotal(true)
    }


    const removeFromCart = (productId) => {

        dispatch(user_actions.removeCartItem(productId))
            .then((response) => {
                if (response.payload.cartDetail.length <= 0) {
                    setShowTotal(false)
                } else {
                    calculateTotal(response.payload.cartDetail)
                }
            })
    }

    // const transactionSuccess = (data) => {
    //     dispatch(onSuccessBuy({
    //         cartDetail: props.user.cartDetail,
    //         paymentData: data
    //     }))
    //         .then(response => {
    //             if (response.payload.success) {
    //                 setShowSuccess(true)
    //                 setShowTotal(false)
    //             }
    //         })
    // }

    // const transactionError = () => {
    //     console.log('Paypal error')
    // }

    // const transactionCanceled = () => {
    //     console.log('Transaction canceled')
    // }


    return (
        <div >
            <h1>My Cart</h1>
            {/* <div>

                <CardBlock
                    products={props.user.cartDetail}
                    removeItem={removeFromCart}
                />

                {ShowTotal ?
                    <div style={{ marginTop: '3rem' }}>
                        <h2>Total amount: ${Total} </h2>
                    </div>
                    :
                    ShowSuccess ?
                        <Result
                            status="success"
                            title="Successfully Purchased Items"
                        /> :
                        <div style={{
                            width: '100%', display: 'flex', flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            <br />
                            <Empty description={false} />
                            <p>No Items In the Cart</p>

                        </div>
                }
            </div> */}



            {/* Paypal Button */}

            {/* {ShowTotal &&

                <Paypal
                    toPay={Total}
                    onSuccess={transactionSuccess}
                    transactionError={transactionError}
                    transactionCanceled={transactionCanceled}
                />

            } */}



        </div>
    )
}

export default connect (null) (Cart2);
