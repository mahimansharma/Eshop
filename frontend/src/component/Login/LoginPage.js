import React, { Component, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import user_actions from "../../store/actions/user_actions";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { useDispatch } from "react-redux";
import Icon from '@ant-design/icons';


function LoginPage(props) {
    const dispatch = useDispatch();
    const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

    const [formErrorMessage, setFormErrorMessage] = useState('')
    const [rememberMe, setRememberMe] = useState(rememberMeChecked)

    const handleRememberMe = () => {
        setRememberMe(!rememberMe)
    };

    const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';

    console.log('login2',props);
    return (
        <Formik
            initialValues={{
                email: initialEmail,
                password: '',
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email('Email is invalid')
                    .required('Email is required'),
                password: Yup.string()
                    .min(4, 'Password must be at least 6 characters')
                    .required('Password is required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    let dataToSubmit = {
                        email: values.email,
                        password: values.password
                    };

                    dispatch(user_actions.loginUser(dataToSubmit))
                        .then(response => {
                            if (response.payload.loginSuccess) {
                                window.localStorage.setItem('userId', response.payload.userId);
                                if (rememberMe === true) {
                                    window.localStorage.setItem('rememberMe', values.id);
                                } else {
                                    localStorage.removeItem('rememberMe');
                                }
                                alert('login succefull')
                                props.history.push("/home");
                            } else {
                                setFormErrorMessage('Check out your Account or Password again')
                            }
                        })
                        .catch(err => {
                            setFormErrorMessage('Check out your Account or Password again')
                            setTimeout(() => {
                                setFormErrorMessage("")
                            }, 3000);
                        });
                    setSubmitting(false);
                }, 500);
            }}
        >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                } = props;
                return (
                    <div className="container login-box">

                        <h2>Log In</h2>
                        <form onSubmit={handleSubmit} >

                            <Form.Item required>
                                <Input
                                    id="email"
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Enter your email"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.email && touched.email ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.email && touched.email && (
                                    <div className="input-feedback">{errors.email}</div>
                                )}
                            </Form.Item>

                            <Form.Item required>
                                <Input
                                    id="password"
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}                                    placeholder="Enter your password"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.password && touched.password ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.password && touched.password && (
                                    <div className="input-feedback">{errors.password}</div>
                                )}
                            </Form.Item>

                            {formErrorMessage && (
                                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
                            )}

                            <Form.Item>
                                <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe} >Remember me</Checkbox>
                                <Link className="login-form-forgot" to="/reset_user" style={{ float: 'right' }}>
                                    forgot password
                                </Link>
                                <div>
                                    <button type="primary" htmlType="submit" className="btn waves-effect red lighten-2" disabled={isSubmitting} onSubmit={handleSubmit}>
                                        Log in
                                    </button>
                                Or <Link to="/register"><button className='btn waves-effect red lighten-2'
                                                    type='submit'
                                                    name='action'>
                                                        register now!</button></Link>
                                </div>
                            </Form.Item>
                        </form>
                    </div>
                );
            }}
        </Formik>
    );
};





export default withRouter(LoginPage);