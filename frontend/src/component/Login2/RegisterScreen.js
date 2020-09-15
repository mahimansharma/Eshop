import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../../store/actions/userActions';

function RegisterScreen(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;
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
        dispatch(register(name, email, password));
    }

    console.log("registe",props);
    return <div className="container login-box">
            <h2>Create Account</h2>
        <form onSubmit={submitHandler} >
            <div className="form-container">
                <div>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </div>
                <div className='input-feild '>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input  name="name" id="name" onChange={(e) => setName(e.target.value)}>
                    </input>
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
                <div className='input-feild '>
                    <label htmlFor="rePassword">Re-Enter Password</label>
                    <input type="password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)}>
                    </input>
                </div>
                <div className='button-box'>
                    <button type="submit" className='btn waves-effect red lighten-2'>Register</button>
                    <div className='reg-box'>
                        Already have an account?
                    <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className='btn waves-effect red lighten-2' >Log In</Link>

                    </div>
                </div>

            </div>
        </form>
    </div>
}
export default RegisterScreen;