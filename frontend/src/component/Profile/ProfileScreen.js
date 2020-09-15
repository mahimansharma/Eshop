import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout, update } from '../../store/actions/userActions';
// import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';

function ProfileScreen(props) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const handleLogout = () => {
        dispatch(logout());
        props.history.push("/signin");
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(update({ userId: userInfo._id, email, name, password }))
    }
    const userUpdate = useSelector(state => state.userUpdate);
    const { loading, success, error } = userUpdate;

    // const myOrderList = useSelector(state => state.myOrderList);
    // const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
    // useEffect(() => {
    //     if (userInfo) {
    //         console.log(userInfo.name)
    //         setEmail(userInfo.email);
    //         setName(userInfo.name);
    //         setPassword(userInfo.password);
    //     }
    //     dispatch(listMyOrders());
    //     return () => {

    //     };
    // }, [userInfo])
console.log('profile--',props);
    return <div className="profile">
        <div className="profile-info">
            <div className="container login-box">
                    <h2>User Profile</h2>
                <form onSubmit={submitHandler} >
                    <div className="form-container">
                        
                        <div>
                            {loading && <div>Loading...</div>}
                            {error && <div>{error}</div>}
                            {success && <div>Profile Saved Successfdivly.</div>}
                        </div>
                        <div>
                            <label htmlFor="name">
                                Name
          </label>
                            <input value={name} name="name" id="name" onChange={(e) => setName(e.target.value)}>
                            </input>
                        </div>
                        <div>
                            <label htmlFor="email">
                                Email
          </label>
                            <input value={email} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
                            </input>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input value={password} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
                            </input>
                        </div>

                        <div>
                            <button type="submit" className='btn waves-effect red lighten-2'>Update</button>
                            &nbsp;
                            &nbsp;
                            <button type="button" onClick={handleLogout} className='btn waves-effect red lighten-2'>Logout</button>
                        </div>
                        
                    </div>
                </form>
            </div>
        </div>
        {/* <div className="profile-orders content-margined">
            {
                loadingOrders ? <div>Loading...</div> :
                    errorOrders ? <div>{errorOrders} </div> :
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid}</td>
                                    <td>
                                        <Link to={"/order/" + order._id}>DETAILS</Link>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
            }
        </div> */}
    </div>
}

export default ProfileScreen;