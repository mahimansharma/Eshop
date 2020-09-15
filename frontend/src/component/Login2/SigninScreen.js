import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../../store/actions/userActions';
import '../Login/style.css';

function SigninScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;
    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
        return () => {
            //
        };
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));

    }

    console.log('sigin--',props);
    return <div className="container login-box">
        <form onSubmit={submitHandler} >
                <h2>Sign-In</h2>
            <div className="form-container">
                <div>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </div>
                <div className='input-feild '>
                    <label htmlFor="email">
                        Email
                        </label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
                    </input>
                </div>
                <div className='input-feild '>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
                    </input>
                </div>
                <div className='button-box'>
                    <button type="submit" className='btn waves-effect red lighten-2'>Log In</button>
                    <div className='reg-box'>
                        New to E-Shop?
                        <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} >
                            <button className='btn waves-effect red lighten-2'
                                type='submit'
                                name='action'
                            >
                                Sign Up
                                    </button>
                        </Link>
                    </div>
                </div>
                
            </div>
        </form>
    </div>
}
export default SigninScreen;